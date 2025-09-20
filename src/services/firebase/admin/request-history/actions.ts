'use server';

import { getErrorMessage, getTimestamp } from '@/common/utils/index.ts';
import { firestore } from 'firebase-admin';
import { getIdTokenCookie } from '../../utils/token-helper-server.ts';
import '../config.ts';
import { verifyIdToken } from '../utils.ts';
import { isLikeRequestHistoryEntries } from './utils.ts';

type Timestamp<T = number> = T;

export type HttpMethodName = 'get' | 'put' | 'post' | 'delete';

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

const getCurrentUserEmail = async (): Promise<string | null> => {
  const token = await getIdTokenCookie();
  const decoded = await verifyIdToken(token);
  return decoded?.email ?? null;
};

export const addHistoryEntry = async (entry: RequestHistoryEntry): Promise<string | null> => {
  try {
    const userEmail = await getCurrentUserEmail();
    if (!userEmail) {
      return null;
    }
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
    const userEmail = await getCurrentUserEmail();
    if (!userEmail) {
      return null;
    }
    await historyRef(userEmail).doc(id).delete();
    return id;
  } catch {
    return null;
  }
};

export const getHistoryEntry = async (userEmail: string, id: string): Promise<string | null> => {
  try {
    const docRef = await historyRef(userEmail).doc(id).get();
    const entry = docRef.data();
    if (!entry) {
      throw Error(`Entry with id='${id}' not found`);
    }
    return JSON.stringify(entry);
  } catch (error) {
    return JSON.stringify({ error: getErrorMessage(error) });
  }
};

export const getAllHistoryEntries = async (): Promise<RequestHistoryEntry[] | null> => {
  try {
    const token = await getIdTokenCookie();
    const decoded = await verifyIdToken(token);
    if (!decoded?.email) {
      return null;
    }
    const snapshot = await historyRef(decoded.email).orderBy('createdAt', 'asc').get();
    const data = snapshot.docs.map(doc => doc.data());
    return isLikeRequestHistoryEntries(data) && data.length ? data : null;
  } catch {
    return null;
  }
};
