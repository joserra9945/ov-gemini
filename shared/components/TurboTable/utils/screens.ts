export const detectDevice = (
  width: number
): 'mobile' | 'tablet' | 'desktop' => {
  if (width < 768) {
    return 'mobile';
  }

  if (width >= 768 && width < 1024) {
    return 'tablet';
  }

  return 'desktop';
};
