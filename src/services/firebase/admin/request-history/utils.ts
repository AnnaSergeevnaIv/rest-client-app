import { hasOwnKeys } from '@/common/utils/type-guards.ts';
import type { QueryHistoryEntriesResult, RequestHistoryEntry } from './actions.ts';

export const historyEntryMock: RequestHistoryEntry = {
  durationMs: 100,
  httpStatus: 200,
  timestamp: Date.now(),
  method: 'GET',
  requestSize: 1,
  responseSize: 1,
  error: 'Some error',
  url: 'https://test-url.com',
  link: btoa('https://test-url.com'),
};

const isLikeRequestHistoryEntry = (obj: unknown): obj is RequestHistoryEntry => {
  return hasOwnKeys<RequestHistoryEntry>(
    obj,
    'durationMs',
    'httpStatus',
    'link',
    'method',
    'requestSize',
    'responseSize',
    'timestamp',
    'url',
    'createdAt',
  );
};

export const isLikeRequestHistoryEntries = (obj: unknown): obj is RequestHistoryEntry[] => {
  return Array.isArray(obj) && obj.every(isLikeRequestHistoryEntry);
};

export const isLikeQueryHistoryEntries = (obj: unknown): obj is QueryHistoryEntriesResult => {
  return (
    hasOwnKeys<QueryHistoryEntriesResult>(obj, 'data', 'done') &&
    isLikeRequestHistoryEntries(obj.data)
  );
};
