import { useCallback, useEffect, useState } from 'react';

const SCROLL_THRESHOLD = 150;

export const useStickyHeader = (
  scrollTheshold: number = SCROLL_THRESHOLD,
): {
  sticky: boolean;
} => {
  const [sticky, setSticky] = useState(false);

  const handleScroll = useCallback(() => {
    const shouldBeSticky = window.scrollY > scrollTheshold;
    if (shouldBeSticky !== sticky) {
      setSticky(shouldBeSticky);
    }
  }, [sticky, scrollTheshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { sticky };
};
