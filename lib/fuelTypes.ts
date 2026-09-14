export const FUEL_TYPES = {
  gasolina: { label: 'Gasolina', color: 'var(--amber)', unit: 'L' },
  etanol: { label: 'Etanol', color: 'var(--green)', unit: 'L' },
  diesel: { label: 'Diesel', color: 'var(--blue)', unit: 'L' },
  eletrico: { label: 'Elétrico', color: 'var(--cyan)', unit: 'kWh' },
  outro: { label: 'Outro', color: 'var(--neutral-fuel)', unit: 'L' },
} as const;

export type FuelKey = keyof typeof FUEL_TYPES;

export const FUEL_KEYS = Object.keys(FUEL_TYPES) as FuelKey[];

export function unitLabels(tipo: FuelKey): { price: string; consumo: string } {
  const unit = FUEL_TYPES[tipo].unit;
  return unit === 'kWh'
    ? { price: 'R$ por kWh', consumo: 'km por kWh' }
    : { price: 'R$ por litro', consumo: 'km por litro' };
}
