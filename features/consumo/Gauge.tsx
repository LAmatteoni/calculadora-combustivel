import { fmt } from '@/lib/format';

const GAUGE_MAX = 25;
const GAUGE_LEN = 267;

/** Mostrador semicircular (0–25 km/L) usado no cálculo rápido de km/L. */
export function Gauge({ kml }: { kml: number }) {
  const clamped = isFinite(kml) ? Math.max(0, Math.min(kml, GAUGE_MAX)) : 0;
  const frac = clamped / GAUGE_MAX;
  const angle = frac * 180 - 90;
  const offset = GAUGE_LEN - GAUGE_LEN * frac;

  return (
    <div className="gauge-wrap">
      <svg viewBox="0 0 200 115" width="220" height="127">
        <path
          d="M15 100 A85 85 0 0 1 185 100"
          fill="none"
          stroke="var(--border-soft)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          className="gauge-arc"
          d="M15 100 A85 85 0 0 1 185 100"
          fill="none"
          stroke="var(--amber)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={GAUGE_LEN}
          strokeDashoffset={offset}
        />
        <g className="gauge-needle" style={{ transform: `rotate(${angle}deg)` }}>
          <line x1="100" y1="100" x2="100" y2="30" stroke="var(--text)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="100" cy="100" r="5" fill="var(--text)" />
        </g>
        <text x="15" y="112" fill="var(--text-faint)" fontSize="9" fontFamily="IBM Plex Mono, monospace">
          0
        </text>
        <text x="177" y="112" fill="var(--text-faint)" fontSize="9" fontFamily="IBM Plex Mono, monospace">
          25
        </text>
      </svg>
      <span className="gauge-value">{isFinite(kml) ? fmt(kml, 2) : '—'}</span>
      <span className="gauge-unit">km por litro</span>
    </div>
  );
}
