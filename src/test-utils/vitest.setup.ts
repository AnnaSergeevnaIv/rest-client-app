import '@testing-library/dom';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest';

beforeAll(() => {
  vi.stubGlobal('console', {
    error: vi.fn(),
    warn: vi.fn(),
    log: console.log.bind(console),
  });
});

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
  vi.clearAllMocks();
});

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterAll(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});
