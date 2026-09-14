type IconProps = { className?: string };

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function BrandIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 21V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v15" />
      <path d="M4 21h10" />
      <path d="M14 10h2.2a1.8 1.8 0 0 1 1.8 1.8V17a1.6 1.6 0 0 0 3.2 0v-6l-2.4-2.6" />
      <path d="M7 8h5" />
    </svg>
  );
}

export function ConsumoIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2 2M16.4 16.4l2 2M5.6 18.4l2-2M16.4 7.6l2-2" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  );
}

export function AutonomiaIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 12h3M9 12h3M15 12h2" />
      <path d="M19 9l3 3-3 3" />
    </svg>
  );
}

export function CompararIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16M4 12l4-4M4 12l4 4M20 12l-4-4M20 12l-4 4" />
    </svg>
  );
}

export function GnvIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="7" y="6" width="10" height="14" rx="3" />
      <path d="M10 6V4h4v2" />
    </svg>
  );
}

export function HistoricoIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 19h16" />
      <path d="M4 15l4-4 3 3 6-7" />
    </svg>
  );
}

export function VeiculosIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 16l1.5-5A2 2 0 0 1 7.4 9.5h9.2A2 2 0 0 1 18.5 11L20 16" />
      <rect x="3" y="16" width="18" height="3" rx="1.5" />
      <circle cx="7.5" cy="19.4" r="1.3" />
      <circle cx="16.5" cy="19.4" r="1.3" />
    </svg>
  );
}

export function GuiaIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5" />
      <circle cx="12" cy="8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
