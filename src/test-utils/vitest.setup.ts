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

vi.mock('firebase-admin', () => ({
  initializeApp: vi.fn(),
  credential: {
    cert: vi.fn(),
  },
  app: vi.fn(() => ({
    auth: vi.fn(() => ({
      verifyIdToken: vi.fn(),
      createUser: vi.fn(),
      deleteUser: vi.fn(),
    })),
    firestore: vi.fn(() => ({
      collection: vi.fn(() => ({
        doc: vi.fn(() => ({
          set: vi.fn(),
          get: vi.fn(),
          delete: vi.fn(),
          collection: vi.fn(() => ({
            orderBy: vi.fn(() => ({
              limit: vi.fn(() => ({
                get: vi.fn(),
                startAfter: vi.fn(() => ({
                  limit: vi.fn(() => ({
                    get: vi.fn(),
                  })),
                })),
              })),
            })),
          })),
        })),
      })),
    })),
  })),
  apps: [],
  firestore: vi.fn(() => ({
    collection: vi.fn(() => ({
      doc: vi.fn(() => ({
        set: vi.fn(),
        get: vi.fn(),
        delete: vi.fn(),
        collection: vi.fn(() => ({
          orderBy: vi.fn(() => ({
            limit: vi.fn(() => ({
              get: vi.fn(),
              startAfter: vi.fn(() => ({
                limit: vi.fn(() => ({
                  get: vi.fn(),
                })),
              })),
            })),
          })),
        })),
      })),
    })),
  })),
}));

// Mock Firebase config
vi.mock('@/services/firebase/admin/config', () => ({
  getFirebaseAdmin: vi.fn(() =>
    Promise.resolve({
      app: {
        auth: vi.fn(),
        firestore: vi.fn(),
      },
      auth: vi.fn(),
      firestore: vi.fn(),
    }),
  ),
}));
import '@testing-library/jest-dom';

beforeAll(() => {
  vi.stubGlobal('console', {
    error: vi.fn(),
    warn: vi.fn(),
    log: console.log.bind(console),
  });

  vi.stubGlobal('process', {
    ...process,
    env: {
      ...process.env,
      FIREBASE_PROJECT_ID: 'test-project',
      FIREBASE_CLIENT_EMAIL: 'test@test.com',
      FIREBASE_PRIVATE_KEY: 'test-private-key',
    },
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
