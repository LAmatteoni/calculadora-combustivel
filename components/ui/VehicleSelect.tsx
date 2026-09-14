'use client';

import { useVehicles } from '@/features/vehicles/VehiclesContext';

type Props = {
  id: string;
  value: string;
  onChange: (id: string) => void;
  label?: string;
};

/** Select de "veículo salvo" reutilizado em Consumo, Autonomia, Orçamento e Comparar. */
export function VehicleSelect({ id, value, onChange, label = 'Veículo salvo — opcional' }: Props) {
  const { vehicles } = useVehicles();

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select className="vehicle-select" id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Veículo: manual</option>
        {vehicles.map((v) => (
          <option key={v.id} value={String(v.id)}>
            {v.nome.trim() ? v.nome : `Veículo ${v.id}`}
          </option>
        ))}
      </select>
    </div>
  );
}
