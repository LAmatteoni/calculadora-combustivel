export function Panel({ hidden, children }: { hidden?: boolean; children: React.ReactNode }) {
  return (
    <section className="panel" role="tabpanel" hidden={hidden}>
      {children}
    </section>
  );
}

export function SubPanel({ hidden, children }: { hidden?: boolean; children: React.ReactNode }) {
  return <div hidden={hidden}>{children}</div>;
}

export function PanelHead({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="panel-head">
      <div>
        <p className="panel-title">{title}</p>
        <p className="panel-desc">{description}</p>
      </div>
      {actions && <div className="head-actions">{actions}</div>}
    </div>
  );
}
