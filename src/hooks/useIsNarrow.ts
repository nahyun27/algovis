import { useState, useEffect } from 'react';

/**
 * Returns true when window.innerWidth <= breakpoint.
 * Defaults to 1200px (the "nw" breakpoint).
 */
export function useIsNarrow(breakpoint = 1200): boolean {
  const [isNarrow, setIsNarrow] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false,
  );

  useEffect(() => {
    const handler = () => setIsNarrow(window.innerWidth <= breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);

  return isNarrow;
}
