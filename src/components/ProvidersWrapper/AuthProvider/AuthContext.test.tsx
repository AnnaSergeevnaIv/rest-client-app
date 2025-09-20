import { renderHook } from '@testing-library/react';
import { useAuth, AuthContext } from './AuthContext';
import { vi } from 'vitest';

describe('useAuth', () => {
  it('throws error when used outside provider', () => {
    expect(() => renderHook(() => useAuth())).toThrow(
      'useAuth() can only be used within an AuthContext',
    );
  });

  it('provides auth methods when inside provider', () => {
    const mockSignin = vi.fn();
    const mockSignup = vi.fn();
    const mockSignout = vi.fn();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthContext.Provider
        value={{
          signin: mockSignin,
          signup: mockSignup,
          signout: mockSignout,
          currentUser: null,
          loading: false,
          setLoading: vi.fn(),
        }}
      >
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.signin).toBe(mockSignin);
    expect(result.current.signup).toBe(mockSignup);
    expect(result.current.signout).toBe(mockSignout);
  });
});
