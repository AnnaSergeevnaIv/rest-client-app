'use server';

import { RoutePath } from '@/common/constants/index.ts';
import { getTimestamp } from '@/common/utils/index.ts';
import { firestore } from 'firebase-admin';
import { revalidatePath } from 'next/cache';
import { getIdTokenCookie } from '../../utils/token-helper-server.ts';
import '../config.ts';
import { verifyIdToken } from '../utils.ts';
import { isLikeRequestHistoryEntry } from './utils.ts';

type Timestamp<T = number> = T;

export type HttpMethodName = 'get' | 'put' | 'post' | 'delete' | 'patch';

export type ErrorResponse = {
  error: string;
};
export type RequestHistoryEntry = {
  id?: string;
  durationMs: number;
  httpStatus: number;
  timestamp: Timestamp;
  method: HttpMethodName | Uppercase<HttpMethodName>;
  requestSize: number;
  responseSize: number;
  error?: string;
  url: string;
  link: string;
  createdAt?: number;
};
export type QueryHistoryEntriesResult = {
  data: RequestHistoryEntry[];
  done: boolean;
};

const historyRef = (userEmail: string): firestore.CollectionReference => {
  return firestore().collection('users').doc(userEmail).collection('requestHistory');
};

const getId = (): string => {
  return `${getTimestamp().toString()}-${crypto.randomUUID().replaceAll('-', '').slice(0, 10)}`;
};

const getCurrentUserEmail = async (): Promise<string> => {
  const token = await getIdTokenCookie();
  const decoded = await verifyIdToken(token);
  if (!decoded?.email) {
    throw Error('Access denied');
  }
  return decoded.email;
};

export const addHistoryEntry = async (entry: RequestHistoryEntry): Promise<string | null> => {
  try {
    const userEmail = await getCurrentUserEmail();
    const id = getId();
    entry = { ...entry, createdAt: Date.now(), id };
    await historyRef(userEmail).doc(id).set(entry);
    return id;
  } catch {
    return null;
  }
};

export const deleteHistoryEntry = async (id: string): Promise<string | null> => {
  try {
    const email = await getCurrentUserEmail();
    await historyRef(email).doc(id).delete();
    revalidatePath(RoutePath.History);
    return id;
  } catch {
    return null;
  }
};

export const deleteAllHistoryEntries = async (): Promise<void> => {
  try {
    const email = await getCurrentUserEmail();
    await firestore().recursiveDelete(historyRef(email));
    revalidatePath(RoutePath.History);
  } catch {
    return;
  }
};

export const getHistoryEntry = async (id: string): Promise<RequestHistoryEntry | null> => {
  try {
    const email = await getCurrentUserEmail();
    const docRef = await historyRef(email).doc(id).get();
    const entry = docRef.data();
    return isLikeRequestHistoryEntry(entry) ? entry : null;
  } catch {
    return null;
  }
};

export const getAllHistoryEntries = async (): Promise<RequestHistoryEntry[] | null> => {
  try {
    const email = await getCurrentUserEmail();
    const snapshot = await historyRef(email).orderBy('createdAt', 'asc').get();
    const data = snapshot.docs.map(doc => doc.data()).filter(isLikeRequestHistoryEntry);
    return data.length ? data : null;
  } catch {
    return null;
  }
};
