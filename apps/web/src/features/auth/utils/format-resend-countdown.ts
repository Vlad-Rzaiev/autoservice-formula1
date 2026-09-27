export function getResendCountdownParts(seconds: number) {
  return {
    minutes: Math.floor(seconds / 60),
    seconds: seconds % 60,
  };
}
