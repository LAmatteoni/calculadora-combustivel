'use client';

import { useEffect, useState } from 'react';

// ponytail: sem debounce, cada mudança grava direto. Se ficar pesado, adicionar debounce.
export function usePersistedState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setState(JSON.parse(raw));
    } catch {
      // ignora storage indisponível ou JSON inválido
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // ignora storage indisponível (modo privado, quota cheia)
    }
  }, [key, state, hydrated]);

  return [state, setState] as const;
}
