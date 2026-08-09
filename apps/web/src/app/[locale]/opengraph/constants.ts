export const openGraphImageSize = {
  width: 1200,
  height: 630,
} as const;

export function getOpenGraphTitleFontSize(title: string): number {
  if (title.length > 48) {
    return 52;
  }

  if (title.length > 40) {
    return 56;
  }

  return 60;
}
