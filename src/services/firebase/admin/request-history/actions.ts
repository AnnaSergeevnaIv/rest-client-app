'use server';

import { getErrorMessage, getTimestamp } from '@/common/utils/index.ts';
import { firestore } from 'firebase-admin';
import '../config.ts';

const DEFAULT_QUERY_LIMIT = 10;

type Timestamp<T = number> = T;

export type HttpMethodName = 'get' | 'put' | 'post' | 'delete';

export type ErrorResponse = {
  error: string;
};
export type RequestHistoryEntry = {
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
type QueryEntriesOptions = {
  orderBy: keyof RequestHistoryEntry;
  sortOrder: 'asc' | 'desc';
  limit: number;
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

export const addHistoryEntry = async (
  userEmail: string,
  entry: RequestHistoryEntry,
): Promise<string> => {
  try {
    entry = { ...entry, createdAt: Date.now() };
    const id = getId();
    await historyRef(userEmail).doc(id).set(entry);
    return JSON.stringify({ id });
  } catch (error) {
    return JSON.stringify({ error: getErrorMessage(error) });
  }
};

export const deleteHistoryEntry = async (userEmail: string, id: string): Promise<string> => {
  try {
    await historyRef(userEmail).doc(id).delete();
    return JSON.stringify({ id });
  } catch (error) {
    return JSON.stringify({ error: getErrorMessage(error) });
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

let nextSnapshot: firestore.QuerySnapshot | null = null;

export const resetQueryCursor = async (): Promise<void> => {
  nextSnapshot = null;
  return Promise.resolve();
};

export const queryHistoryEntries = async (
  userEmail: string,
  opts?: QueryEntriesOptions,
): Promise<string> => {
  try {
    const { orderBy = 'createdAt', sortOrder = 'asc' } = opts ?? {};
    const limit = Math.max(opts?.limit ?? DEFAULT_QUERY_LIMIT, 0);
    const snapshot =
      nextSnapshot ?? (await historyRef(userEmail).orderBy(orderBy, sortOrder).limit(limit).get());

    if (!snapshot.size) {
      return JSON.stringify({ data: [], done: true });
    }
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    nextSnapshot = await historyRef(userEmail)
      .orderBy(orderBy, sortOrder)
      .startAfter(lastDoc)
      .limit(limit)
      .get();

    return JSON.stringify({
      data: snapshot.docs.map(doc => doc.data()),
      done: nextSnapshot.size === 0,
    });
  } catch (error) {
    return JSON.stringify({ error: getErrorMessage(error) });
  }
};
