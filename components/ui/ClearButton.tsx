export function ClearButton({ onClick, children = 'Limpar' }: { onClick: () => void; children?: React.ReactNode }) {
  return (
    <button className="clear-btn" type="button" onClick={onClick}>
      {children}
    </button>
  );
}
