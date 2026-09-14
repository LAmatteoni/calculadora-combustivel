'use client';

import { useMemo, useState } from 'react';
import { ClearButton } from '@/components/ui/ClearButton';
import { Explain } from '@/components/ui/Explain';
import { FieldRow, NumberField } from '@/components/ui/NumberField';
import { PanelHead } from '@/components/ui/Panel';
import { ResultItem, ResultsGrid } from '@/components/ui/Results';
import { VehicleSelect } from '@/components/ui/VehicleSelect';
import { useVehicles } from '@/features/vehicles/VehiclesContext';
import { useShare } from '@/hooks/useShare';
import { fmt, fmtBRL, parseNum } from '@/lib/format';

export function ConsumoPrincipal() {
  const { vehicles } = useVehicles();
  const { share } = useShare();

  const [vehicleId, setVehicleId] = useState('');
  const [dist, setDist] = useState('');
  const [consumo, setConsumo] = useState('');
  const [preco, setPreco] = useState('');
  const [pessoas, setPessoas] = useState('');

  function handleVehicleChange(id: string) {
    setVehicleId(id);
    const v = vehicles.find((x) => String(x.id) === id);
    if (v && v.consumo !== '') setConsumo(v.consumo);
  }

  const { litros, l100, custoKm, total, custoPessoa, showPessoa } = useMemo(() => {
    const d = parseNum(dist);
    const c = parseNum(consumo);
    const p = parseNum(preco);
    const pes = parseNum(pessoas);

    const litros = d > 0 && c > 0 ? d / c : NaN;
    const l100 = c > 0 ? 100 / c : NaN;
    const custoKm = c > 0 && isFinite(p) ? p / c : NaN;
    const total = isFinite(p) && isFinite(litros) ? p * litros : NaN;
    const custoPessoa = isFinite(total) && pes >= 1 ? total / pes : NaN;

    return { litros, l100, custoKm, total, custoPessoa, showPessoa: isFinite(custoPessoa) && pes > 1 };
  }, [dist, consumo, preco, pessoas]);

  function handleClear() {
    setDist('');
    setConsumo('');
    setPreco('');
    setPessoas('');
    setVehicleId('');
  }

  function handleShare() {
    const linhas = [
      'Cálculo de consumo',
      `Distância: ${dist || '—'} km`,
      `Consumo: ${consumo || '—'} km/L`,
      `Litros necessários: ${isFinite(litros) ? fmt(litros, 2) + ' L' : '—'}`,
      `Custo por km: ${isFinite(custoKm) ? fmtBRL(custoKm) : '—'}`,
      `Gasto estimado: ${isFinite(total) ? fmtBRL(total) : '—'}`,
    ];
    if (showPessoa) linhas.push(`Custo por pessoa: ${fmtBRL(custoPessoa)}`);
    share('Cálculo de consumo', linhas.join('\n'));
  }

  return (
    <div>
      <PanelHead
        title="Cálculo do consumo"
        description="Distância e consumo do veículo estimam litros e custo da viagem."
        actions={
          <>
            <ClearButton onClick={handleShare}>Compartilhar</ClearButton>
            <ClearButton onClick={handleClear} />
          </>
        }
      />

      <VehicleSelect id="cons-vehicle" value={vehicleId} onChange={handleVehicleChange} />

      <FieldRow>
        <NumberField id="cons-dist" label="Distância percorrida (km)" value={dist} onChange={setDist} placeholder="Ex.: 420" />
        <NumberField
          id="cons-consumo"
          label="Consumo do veículo (km/L)"
          value={consumo}
          onChange={setConsumo}
          placeholder="Ex.: 12"
        />
      </FieldRow>
      <FieldRow>
        <NumberField
          id="cons-preco"
          label="Preço por litro (R$) — opcional"
          value={preco}
          onChange={setPreco}
          placeholder="Ex.: 5,89"
        />
        <NumberField
          id="cons-pessoas"
          label="Dividir entre quantas pessoas? — opcional"
          value={pessoas}
          onChange={setPessoas}
          placeholder="Ex.: 3"
        />
      </FieldRow>

      <ResultsGrid>
        <ResultItem label="Litros necessários" value={isFinite(litros) ? `${fmt(litros, 2)} L` : '—'} />
        <ResultItem label="Consumo (L/100km)" value={isFinite(l100) ? `${fmt(l100, 2)} L` : '—'} />
        <ResultItem label="Custo por km" value={isFinite(custoKm) ? fmtBRL(custoKm) : '—'} />
        <ResultItem label="Gasto estimado" value={isFinite(total) ? fmtBRL(total) : '—'} />
        <ResultItem label="Custo por pessoa" value={isFinite(custoPessoa) ? fmtBRL(custoPessoa) : '—'} wide hidden={!showPessoa} />
      </ResultsGrid>

      <Explain
        formulas={[
          'Litros necessários = Distância ÷ Consumo (km/L)',
          'Custo por km = Preço por litro ÷ Consumo (km/L)',
          'Gasto estimado = Litros necessários × Preço por litro',
          'Custo por pessoa = Gasto estimado ÷ Nº de pessoas',
        ]}
        note='Não sabe o consumo do seu carro? Descubra na aba "km/L rápido" a partir de um abastecimento recente.'
      />
    </div>
  );
}
