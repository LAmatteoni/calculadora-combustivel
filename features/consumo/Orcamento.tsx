'use client';

import { useMemo, useState } from 'react';
import { ClearButton } from '@/components/ui/ClearButton';
import { Explain } from '@/components/ui/Explain';
import { FieldRow, NumberField } from '@/components/ui/NumberField';
import { PanelHead } from '@/components/ui/Panel';
import { ResultItem, ResultsGrid } from '@/components/ui/Results';
import { VehicleSelect } from '@/components/ui/VehicleSelect';
import { useVehicles } from '@/features/vehicles/VehiclesContext';
import { fmt, parseNum } from '@/lib/format';

export function Orcamento() {
  const { vehicles } = useVehicles();
  const [vehicleId, setVehicleId] = useState('');
  const [valor, setValor] = useState('');
  const [preco, setPreco] = useState('');
  const [consumo, setConsumo] = useState('');

  function handleVehicleChange(id: string) {
    setVehicleId(id);
    const v = vehicles.find((x) => String(x.id) === id);
    if (v && v.consumo !== '') setConsumo(v.consumo);
  }

  const { litros, km } = useMemo(() => {
    const v = parseNum(valor);
    const p = parseNum(preco);
    const c = parseNum(consumo);
    const litros = isFinite(v) && p > 0 ? v / p : NaN;
    const km = isFinite(litros) && c > 0 ? litros * c : NaN;
    return { litros, km };
  }, [valor, preco, consumo]);

  function handleClear() {
    setValor('');
    setPreco('');
    setConsumo('');
    setVehicleId('');
  }

  return (
    <div>
      <PanelHead
        title="Orçamento de combustível"
        description="Descubra quantos km dá pra rodar com um valor fixo em reais."
        actions={<ClearButton onClick={handleClear} />}
      />

      <VehicleSelect id="orc-vehicle" value={vehicleId} onChange={handleVehicleChange} />

      <FieldRow>
        <NumberField id="orc-valor" label="Valor disponível (R$)" value={valor} onChange={setValor} placeholder="Ex.: 150" />
        <NumberField
          id="orc-preco"
          label="Preço por litro (R$)"
          value={preco}
          onChange={setPreco}
          placeholder="Ex.: 5,89"
        />
      </FieldRow>
      <NumberField
        id="orc-consumo"
        label="Consumo do veículo (km/L)"
        value={consumo}
        onChange={setConsumo}
        placeholder="Ex.: 12"
      />

      <ResultsGrid>
        <ResultItem label="Litros que dá pra comprar" value={isFinite(litros) ? `${fmt(litros, 2)} L` : '—'} />
        <ResultItem label="Km que dá pra rodar" value={isFinite(km) ? `${fmt(km, 0)} km` : '—'} />
      </ResultsGrid>

      <Explain formulas={['Litros = Valor disponível ÷ Preço por litro', 'Km possíveis = Litros × Consumo (km/L)']} />
    </div>
  );
}
