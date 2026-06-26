import { useState, useCallback } from 'react';

const STORAGE_KEY = 'alex-profile-mode';

export function usePlainMode() {
  const [plain, setPlain] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'plain'; } catch { return false; }
  });

  const toggle = useCallback(() => {
    setPlain((cur) => {
      const next = !cur;
      try { localStorage.setItem(STORAGE_KEY, next ? 'plain' : 'full'); } catch { /* storage unavailable */ }
      return next;
    });
  }, []);

  return { plain, toggle };
}
