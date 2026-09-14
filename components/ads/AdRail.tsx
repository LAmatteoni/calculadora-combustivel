'use client';

import { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT, AD_SLOT_LEFT, AD_SLOT_RIGHT } from '@/lib/ads';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

function AdUnit({ slot }: { slot: string }) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // ignora falha de carregamento do AdSense (bloqueador de anúncios, etc.)
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', width: 160, height: 600 }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format="vertical"
      data-full-width-responsive="false"
    />
  );
}

export function AdRailLeft() {
  return (
    <aside className="ad-rail ad-rail-left" aria-hidden="true">
      <AdUnit slot={AD_SLOT_LEFT} />
    </aside>
  );
}

export function AdRailRight() {
  return (
    <aside className="ad-rail ad-rail-right" aria-hidden="true">
      <AdUnit slot={AD_SLOT_RIGHT} />
    </aside>
  );
}
