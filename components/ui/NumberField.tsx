type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

/** Campo de texto numérico (aceita vírgula decimal) controlado, no padrão visual do app. */
export function NumberField({ id, label, value, onChange, placeholder }: Props) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        inputMode="decimal"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function FieldRow({ children }: { children: React.ReactNode }) {
  return <div className="field-row">{children}</div>;
}
