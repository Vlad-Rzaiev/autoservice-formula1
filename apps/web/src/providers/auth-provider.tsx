'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type {
  AuthDto,
  LoginDto,
  RegisterDto,
  UserDto,
} from '@autoservice/contracts';

import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from '@/features/auth';

interface AuthContextValue {
  user: UserDto | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginDto) => Promise<void>;
  register: (payload: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function applyAuthResult(
  auth: AuthDto,
  setUser: (user: UserDto) => void,
  setAccessToken: (accessToken: string) => void,
) {
  setUser(auth.user);
  setAccessToken(auth.accessToken);
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserDto | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback(async (payload: LoginDto) => {
    const auth = await loginUser(payload);

    applyAuthResult(auth, setUser, setAccessToken);
  }, []);

  const register = useCallback(async (payload: RegisterDto) => {
    const auth = await registerUser(payload);

    applyAuthResult(auth, setUser, setAccessToken);
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  }, []);

  useEffect(() => {
    void (async () => {
      setIsLoading(true);

      try {
        const nextAccessToken = await refreshAccessToken();

        setAccessToken(nextAccessToken);

        // User data will be populated when add the authenticated
        // user endpoint.
      } catch {
        setUser(null);
        setAccessToken(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(accessToken),
      isLoading,
      login,
      register,
      logout,
    }),
    [user, accessToken, isLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}
