type AccessTokenListener = (accessToken: string | null) => void;

interface AuthSessionHandlers {
  refreshAccessToken: () => Promise<string>;
  onRefreshFailure: () => void;
}

let currentAccessToken: string | null = null;
let refreshPromise: Promise<string> | null = null;
let authSessionHandlers: AuthSessionHandlers | null = null;

const listeners = new Set<AccessTokenListener>();

export function getStoredAccessToken(): string | null {
  return currentAccessToken;
}

export function setStoredAccessToken(accessToken: string | null): void {
  currentAccessToken = accessToken;

  for (const listener of listeners) {
    listener(accessToken);
  }
}

export function subscribeToAccessToken(
  listener: AccessTokenListener,
): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function configureAuthSession(
  handlers: AuthSessionHandlers,
): () => void {
  authSessionHandlers = handlers;

  return () => {
    if (authSessionHandlers === handlers) {
      authSessionHandlers = null;
    }
  };
}

export function refreshAccessTokenOnce(): Promise<string> {
  if (refreshPromise) {
    return refreshPromise;
  }

  if (!authSessionHandlers) {
    return Promise.reject(
      new Error('Auth session handlers are not configured.'),
    );
  }

  const handlers = authSessionHandlers;

  refreshPromise = handlers
    .refreshAccessToken()
    .then((accessToken) => {
      setStoredAccessToken(accessToken);
      return accessToken;
    })
    .catch((error: unknown) => {
      setStoredAccessToken(null);
      handlers.onRefreshFailure();

      throw error;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}
