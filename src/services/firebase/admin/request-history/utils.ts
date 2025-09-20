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

export const isLikeQueryHistoryEntries = (obj: unknown): obj is QueryHistoryEntriesResult => {
  return (
    hasOwnKeys<QueryHistoryEntriesResult>(obj, 'data', 'done') &&
    Array.isArray(obj.data) &&
    obj.data.every(isLikeRequestHistoryEntry)
  );
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
