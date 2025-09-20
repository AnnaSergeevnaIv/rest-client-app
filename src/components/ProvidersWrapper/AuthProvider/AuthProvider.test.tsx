import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';
import AuthProvider from './AuthProvider';
import { AuthContext } from './AuthContext';

vi.mock('@/services/firebase/utils/token-helper-server.ts', () => ({
  removeIdTokenCookie: vi.fn(),
  setIdTokenCookie: vi.fn(),
}));

vi.mock('@/services/firebase/client/auth-client.ts', () => ({
  AuthClient: {
    currentUser: null,
    signin: vi.fn(async creds => ({ user: { uid: 'uid123', email: 'test@test.com' } })),
    signup: vi.fn(async creds => ({ user: { uid: 'uid456', email: 'new@test.com' } })),
    signout: vi.fn(async () => {}),
    subscribe: vi.fn(),
    unsubscribe: vi.fn(),
  },
}));

globalThis.cookieStore = {
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
} as any;

describe('AuthProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children and provides context safely', () => {
    render(
      <AuthProvider>
        <div data-testid='child'>Child</div>
      </AuthProvider>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(AuthContext).toBeDefined();
  });
});
