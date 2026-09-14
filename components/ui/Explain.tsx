export function Explain({ formulas, note }: { formulas: string[]; note?: string }) {
  return (
    <div className="explain">
      <p className="explain-title">Como calculamos</p>
      {formulas.map((f, i) => (
        <p className="formula" key={i}>
          {f}
        </p>
      ))}
      {note && <p className="explain-note">{note}</p>}
    </div>
  );
}

export function Callout({ children, highlight }: { children: React.ReactNode; highlight?: boolean }) {
  return <div className={`callout${highlight ? ' highlight' : ''}`}>{children}</div>;
}
