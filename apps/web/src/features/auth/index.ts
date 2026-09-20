export { default as AuthFooter } from './components/auth-footer';
export { default as AuthHeader } from './components/auth-header';
export {
  default as AuthShell,
  type AuthShellProps,
} from './components/auth-shell';

export {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  requestPasswordReset,
  resetPassword,
  getCurrentUser,
  verifyEmail,
} from './api/auth-api';

export { AuthGuard } from './components/auth-guard';

export { default as LogoutButton } from './components/logout-button';
