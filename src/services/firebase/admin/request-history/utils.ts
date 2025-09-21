import { hasOwnKeys, isInteger } from '@/common/utils/type-guards.ts';
import type { QueryHistoryEntriesResult, RequestHistoryEntry } from './actions.ts';

export const isLikeRequestHistoryEntry = (obj: unknown): obj is RequestHistoryEntry => {
  return (
    hasOwnKeys<RequestHistoryEntry>(
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
      'id',
    ) && isInteger(obj.timestamp)
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
