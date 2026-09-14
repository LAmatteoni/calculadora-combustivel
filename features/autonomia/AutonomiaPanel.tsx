'use client';

import { useMemo, useState } from 'react';
import { ClearButton } from '@/components/ui/ClearButton';
import { Explain } from '@/components/ui/Explain';
import { FieldRow, NumberField } from '@/components/ui/NumberField';
import { Panel, PanelHead } from '@/components/ui/Panel';
import { ResultItem, ResultsGrid } from '@/components/ui/Results';
import { VehicleSelect } from '@/components/ui/VehicleSelect';
import { useVehicles } from '@/features/vehicles/VehiclesContext';
import { fmt, fmtBRL, parseNum } from '@/lib/format';

export function AutonomiaPanel({ hidden }: { hidden?: boolean }) {
  const { vehicles } = useVehicles();
  const [vehicleId, setVehicleId] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [consumo, setConsumo] = useState('');
  const [preco, setPreco] = useState('');

  function handleVehicleChange(id: string) {
    setVehicleId(id);
    const v = vehicles.find((x) => String(x.id) === id);
    if (v) {
      if (v.consumo !== '') setConsumo(v.consumo);
      if (v.capacidade !== '') setCapacidade(v.capacidade);
    }
  }

  const { autonomia, custoCheio } = useMemo(() => {
    const cap = parseNum(capacidade);
    const c = parseNum(consumo);
    const p = parseNum(preco);
    const autonomia = cap > 0 && c > 0 ? cap * c : NaN;
    const custoCheio = cap > 0 && isFinite(p) ? cap * p : NaN;
    return { autonomia, custoCheio };
  }, [capacidade, consumo, preco]);

  function handleClear() {
    setCapacidade('');
    setConsumo('');
    setPreco('');
    setVehicleId('');
  }

  return (
    <Panel hidden={hidden}>
      <PanelHead
        title="Autonomia do tanque"
        description="Capacidade do tanque e consumo estimam até onde você vai com o tanque cheio."
        actions={<ClearButton onClick={handleClear} />}
      />

      <VehicleSelect id="aut-vehicle" value={vehicleId} onChange={handleVehicleChange} />

      <FieldRow>
        <NumberField
          id="aut-capacidade"
          label="Capacidade do tanque (L)"
          value={capacidade}
          onChange={setCapacidade}
          placeholder="Ex.: 50"
        />
        <NumberField
          id="aut-consumo"
          label="Consumo do veículo (km/L)"
          value={consumo}
          onChange={setConsumo}
          placeholder="Ex.: 12"
        />
      </FieldRow>
      <NumberField
        id="aut-preco"
        label="Preço por litro (R$) — opcional"
        value={preco}
        onChange={setPreco}
        placeholder="Ex.: 5,89"
      />

      <ResultsGrid>
        <ResultItem label="Autonomia estimada" value={isFinite(autonomia) ? `${fmt(autonomia, 0)} km` : '—'} wide />
        <ResultItem label="Custo para encher o tanque" value={isFinite(custoCheio) ? fmtBRL(custoCheio) : '—'} wide />
      </ResultsGrid>

      <Explain
        formulas={['Autonomia = Capacidade do tanque × Consumo (km/L)', 'Custo para encher = Capacidade do tanque × Preço por litro']}
      />
    </Panel>
  );
}
