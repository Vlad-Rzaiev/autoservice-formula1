export function getUserInitials(
  firstName: string | null,
  lastName: string | null,
  email: string,
): string {
  const initials = `${firstName?.charAt(0) ?? ''}${lastName?.charAt(0) ?? ''}`
    .trim()
    .toUpperCase();

  return initials || email.charAt(0).toUpperCase();
}
