import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook that tracks elapsed time in seconds.
 * Provides start, stop, reset functions and the current elapsed value.
 */
export const useTimer = () => {
  const [elapsed, setElapsed] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  const start = useCallback(() => {
    if (timerRef.current !== null) return; // already running
    timerRef.current = window.setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
  }, []);

  const stop = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    stop();
    setElapsed(0);
  }, [stop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return { elapsed, start, stop, reset };
};
