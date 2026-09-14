'use client';

import { useMemo, useState } from 'react';
import { ClearButton } from '@/components/ui/ClearButton';
import { Explain } from '@/components/ui/Explain';
import { FieldRow, NumberField } from '@/components/ui/NumberField';
import { PanelHead } from '@/components/ui/Panel';
import { ResultItem, ResultsGrid } from '@/components/ui/Results';
import { fmt, parseNum } from '@/lib/format';

export function CidadeEstrada() {
  const [kmCidade, setKmCidade] = useState('');
  const [consCidade, setConsCidade] = useState('');
  const [kmEstrada, setKmEstrada] = useState('');
  const [consEstrada, setConsEstrada] = useState('');

  const { media, totalKm, totalLitros } = useMemo(() => {
    const kmC = parseNum(kmCidade);
    const cC = parseNum(consCidade);
    const kmE = parseNum(kmEstrada);
    const cE = parseNum(consEstrada);

    const litrosC = kmC > 0 && cC > 0 ? kmC / cC : NaN;
    const litrosE = kmE > 0 && cE > 0 ? kmE / cE : NaN;
    const totalKm = (isFinite(kmC) ? kmC : 0) + (isFinite(kmE) ? kmE : 0);
    const totalLitros = (isFinite(litrosC) ? litrosC : 0) + (isFinite(litrosE) ? litrosE : 0);
    const media = totalLitros > 0 ? totalKm / totalLitros : NaN;

    return { media, totalKm, totalLitros };
  }, [kmCidade, consCidade, kmEstrada, consEstrada]);

  function handleClear() {
    setKmCidade('');
    setConsCidade('');
    setKmEstrada('');
    setConsEstrada('');
  }

  return (
    <div>
      <PanelHead
        title="Consumo cidade x estrada"
        description="Informe os dois trechos para ver o consumo médio ponderado."
        actions={<ClearButton onClick={handleClear} />}
      />

      <FieldRow>
        <NumberField id="ce-kmcidade" label="Km rodados na cidade" value={kmCidade} onChange={setKmCidade} placeholder="Ex.: 300" />
        <NumberField
          id="ce-consumocidade"
          label="Consumo na cidade (km/L)"
          value={consCidade}
          onChange={setConsCidade}
          placeholder="Ex.: 9"
        />
      </FieldRow>
      <FieldRow>
        <NumberField
          id="ce-kmestrada"
          label="Km rodados na estrada"
          value={kmEstrada}
          onChange={setKmEstrada}
          placeholder="Ex.: 500"
        />
        <NumberField
          id="ce-consumoestrada"
          label="Consumo na estrada (km/L)"
          value={consEstrada}
          onChange={setConsEstrada}
          placeholder="Ex.: 14"
        />
      </FieldRow>

      <ResultsGrid>
        <ResultItem label="Consumo médio ponderado" value={isFinite(media) ? `${fmt(media, 2)} km/L` : '—'} wide />
        <ResultItem label="Total percorrido" value={totalKm > 0 ? `${fmt(totalKm, 0)} km` : '—'} />
        <ResultItem label="Total consumido" value={totalLitros > 0 ? `${fmt(totalLitros, 2)} L` : '—'} />
      </ResultsGrid>

      <Explain
        formulas={[
          'Litros por trecho = Km do trecho ÷ Consumo do trecho',
          'Consumo médio = (Km cidade + Km estrada) ÷ (Litros cidade + Litros estrada)',
        ]}
        note="A média pondera pela distância de cada trecho, não é uma simples média dos dois consumos."
      />
    </div>
  );
}
