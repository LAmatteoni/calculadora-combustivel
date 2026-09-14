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

export function DoisVeiculos() {
  const { vehicles } = useVehicles();
  const { share } = useShare();

  const [dist, setDist] = useState('');
  const [aVehicleId, setAVehicleId] = useState('');
  const [aConsumo, setAConsumo] = useState('');
  const [aPreco, setAPreco] = useState('');
  const [bVehicleId, setBVehicleId] = useState('');
  const [bConsumo, setBConsumo] = useState('');
  const [bPreco, setBPreco] = useState('');

  function handleVehicleChange(which: 'a' | 'b') {
    return (id: string) => {
      if (which === 'a') setAVehicleId(id);
      else setBVehicleId(id);
      const v = vehicles.find((x) => String(x.id) === id);
      if (v && v.consumo !== '') (which === 'a' ? setAConsumo : setBConsumo)(v.consumo);
    };
  }

  const { litrosA, custoA, litrosB, custoB, comparacao } = useMemo(() => {
    const d = parseNum(dist);
    const cA = parseNum(aConsumo);
    const pA = parseNum(aPreco);
    const cB = parseNum(bConsumo);
    const pB = parseNum(bPreco);

    const litrosA = d > 0 && cA > 0 ? d / cA : NaN;
    const custoA = isFinite(litrosA) && isFinite(pA) ? litrosA * pA : NaN;
    const litrosB = d > 0 && cB > 0 ? d / cB : NaN;
    const custoB = isFinite(litrosB) && isFinite(pB) ? litrosB * pB : NaN;

    let comparacao: React.ReactNode = 'Preencha os dados dos dois veículos para comparar.';
    if (isFinite(custoA) && isFinite(custoB)) {
      const diff = Math.abs(custoA - custoB);
      if (diff < 0.01) {
        comparacao = 'Os dois veículos custam praticamente o mesmo nesta viagem.';
      } else if (custoA < custoB) {
        comparacao = (
          <>
            <strong>Veículo A</strong> sai {fmtBRL(diff)} mais barato nesta viagem.
          </>
        );
      } else {
        comparacao = (
          <>
            <strong>Veículo B</strong> sai {fmtBRL(diff)} mais barato nesta viagem.
          </>
        );
      }
    }

    return { litrosA, custoA, litrosB, custoB, comparacao };
  }, [dist, aConsumo, aPreco, bConsumo, bPreco]);

  function handleClear() {
    setDist('');
    setAConsumo('');
    setAPreco('');
    setBConsumo('');
    setBPreco('');
    setAVehicleId('');
    setBVehicleId('');
  }

  function handleShare() {
    const comparacaoTexto =
      isFinite(custoA) && isFinite(custoB)
        ? Math.abs(custoA - custoB) < 0.01
          ? 'Os dois veículos custam praticamente o mesmo nesta viagem.'
          : custoA < custoB
            ? `Veículo A sai ${fmtBRL(Math.abs(custoA - custoB))} mais barato nesta viagem.`
            : `Veículo B sai ${fmtBRL(Math.abs(custoA - custoB))} mais barato nesta viagem.`
        : 'Preencha os dados dos dois veículos para comparar.';

    const linhas = [
      'Comparação entre dois veículos',
      `Distância: ${dist || '—'} km`,
      `Veículo A — litros: ${isFinite(litrosA) ? fmt(litrosA, 2) + ' L' : '—'} / custo: ${isFinite(custoA) ? fmtBRL(custoA) : '—'}`,
      `Veículo B — litros: ${isFinite(litrosB) ? fmt(litrosB, 2) + ' L' : '—'} / custo: ${isFinite(custoB) ? fmtBRL(custoB) : '—'}`,
      comparacaoTexto,
    ];
    share('Comparação entre dois veículos', linhas.join('\n'));
  }

  return (
    <div>
      <PanelHead
        title="Comparar dois veículos"
        description="Mesmo trajeto, dois veículos — qual sai mais barato."
        actions={
          <>
            <ClearButton onClick={handleShare}>Compartilhar</ClearButton>
            <ClearButton onClick={handleClear} />
          </>
        }
      />

      <NumberField id="cv-dist" label="Distância da viagem (km)" value={dist} onChange={setDist} placeholder="Ex.: 300" />

      <p className="explain-title" style={{ marginTop: 6 }}>
        Veículo A
      </p>
      <VehicleSelect id="cv-a-vehicle" value={aVehicleId} onChange={handleVehicleChange('a')} />
      <FieldRow>
        <NumberField id="cv-a-consumo" label="Consumo (km/L)" value={aConsumo} onChange={setAConsumo} placeholder="Ex.: 10" />
        <NumberField
          id="cv-a-preco"
          label="Preço por litro (R$)"
          value={aPreco}
          onChange={setAPreco}
          placeholder="Ex.: 5,89"
        />
      </FieldRow>

      <p className="explain-title">Veículo B</p>
      <VehicleSelect id="cv-b-vehicle" value={bVehicleId} onChange={handleVehicleChange('b')} />
      <FieldRow>
        <NumberField id="cv-b-consumo" label="Consumo (km/L)" value={bConsumo} onChange={setBConsumo} placeholder="Ex.: 14" />
        <NumberField
          id="cv-b-preco"
          label="Preço por litro (R$)"
          value={bPreco}
          onChange={setBPreco}
          placeholder="Ex.: 4,29"
        />
      </FieldRow>

      <ResultsGrid>
        <ResultItem label="Litros — Veículo A" value={isFinite(litrosA) ? `${fmt(litrosA, 2)} L` : '—'} />
        <ResultItem label="Custo total — Veículo A" value={isFinite(custoA) ? fmtBRL(custoA) : '—'} />
        <ResultItem label="Litros — Veículo B" value={isFinite(litrosB) ? `${fmt(litrosB, 2)} L` : '—'} />
        <ResultItem label="Custo total — Veículo B" value={isFinite(custoB) ? fmtBRL(custoB) : '—'} />
      </ResultsGrid>
      <p className="callout">{comparacao}</p>

      <Explain formulas={['Litros = Distância ÷ Consumo (km/L)', 'Custo total = Litros × Preço por litro']} />
    </div>
  );
}
