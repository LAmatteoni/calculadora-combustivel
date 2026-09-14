export function ResultsGrid({ children }: { children: React.ReactNode }) {
  return <div className="results">{children}</div>;
}

export function ResultItem({
  label,
  value,
  wide,
  hidden,
  dim,
}: {
  label: string;
  value: string;
  wide?: boolean;
  hidden?: boolean;
  dim?: boolean;
}) {
  return (
    <div className={`result-item${wide ? ' wide' : ''}`} hidden={hidden}>
      <span className="label">{label}</span>
      <span className={`value${dim ? ' dim' : ''}`}>{value}</span>
    </div>
  );
}
