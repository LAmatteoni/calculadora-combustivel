'use client';

import { useToast } from '@/components/layout/ToastProvider';

/** Compartilha (Web Share API) ou copia texto para a área de transferência, com toast de feedback. */
export function useShare() {
  const { showToast } = useToast();

  function legacyCopy(text: string) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('Resultado copiado!');
    } catch {
      showToast('Não foi possível copiar automaticamente.');
    }
  }

  function fallbackCopy(text: string) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => showToast('Resultado copiado!'))
        .catch(() => legacyCopy(text));
    } else {
      legacyCopy(text);
    }
  }

  function share(title: string, text: string) {
    if (navigator.share) {
      navigator.share({ title, text }).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  return { share };
}
