import { useState, useEffect } from 'react';

export default function useNightMode() {
  const [night, setNight] = useState(() => {
    try { return localStorage.getItem('night') === '1'; }
    catch { return false; }
  });

  useEffect(() => {
    document.body.classList.toggle('night', night);
    try { localStorage.setItem('night', night ? '1' : '0'); } catch {}
  }, [night]);

  return [night, () => setNight((n) => !n)];
}