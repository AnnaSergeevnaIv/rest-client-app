import { useCallback, useEffect, useState } from 'react';

const DEFAULT_SCROLL_THRESHOLD = 150;

export const useStickyHeader = ({
  scrollThreshold = DEFAULT_SCROLL_THRESHOLD,
}: {
  scrollThreshold: number;
}): {
  isSticky: boolean;
} => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = useCallback(() => {
    const shouldBeSticky = window.scrollY > scrollThreshold;
    if (shouldBeSticky !== isSticky) {
      setIsSticky(shouldBeSticky);
    }
  }, [isSticky, scrollThreshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { isSticky };
};
