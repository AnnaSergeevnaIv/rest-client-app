import '@testing-library/jest-dom';
import '@testing-library/dom';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest';
import type { ReactNode } from 'react';
import React from 'react';
import type { NextRouter } from 'next/router';

vi.mock('next/navigation', () => ({
  useRouter: (): NextRouter => ({
    push: vi.fn(),
    prefetch: vi.fn(),
    replace: vi.fn(),
    route: '',
    pathname: '',
    query: {},
    asPath: '',
    basePath: '',
    events: { on: vi.fn(), off: vi.fn(), emit: vi.fn() },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    isPreview: false,
    beforePopState: vi.fn(),
    reload: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
}));

vi.mock('@i18n/navigation', () => ({
  Link: ({
    children,
    href,
    className,
  }: {
    children: ReactNode;
    href: string;
    className?: string;
  }): React.ReactElement => React.createElement('a', { href, className }, children),
}));

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
