export function SubTabs<T extends string>({
  items,
  active,
  onChange,
}: {
  items: { key: T; label: string }[];
  active: T;
  onChange: (key: T) => void;
}) {
  return (
    <div className="subtabs">
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          className={`pill${active === item.key ? ' active' : ''}`}
          onClick={() => onChange(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
