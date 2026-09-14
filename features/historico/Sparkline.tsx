export function Sparkline({ values }: { values: number[] }) {
  if (values.length < 2) {
    return <p className="sparkline-empty">Adicione ao menos 2 abastecimentos válidos para ver a tendência de consumo.</p>;
  }

  const w = 300;
  const h = 90;
  const padX = 12;
  const padY = 14;
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (min === max) {
    min -= 1;
    max += 1;
  }
  const stepX = (w - 2 * padX) / (values.length - 1);
  const points = values.map((v, i) => ({
    x: padX + i * stepX,
    y: h - padY - ((v - min) / (max - min)) * (h - 2 * padY),
  }));

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="90" preserveAspectRatio="none">
      <polyline
        points={points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')}
        fill="none"
        stroke="var(--amber)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map((p, i) => (
        <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r="2.6" fill="var(--amber)" />
      ))}
    </svg>
  );
}
