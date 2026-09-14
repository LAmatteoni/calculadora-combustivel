'use client';

import { useMemo, useState } from 'react';
import { ClearButton } from '@/components/ui/ClearButton';
import { Explain } from '@/components/ui/Explain';
import { FieldRow, NumberField } from '@/components/ui/NumberField';
import { PanelHead } from '@/components/ui/Panel';
import { parseNum } from '@/lib/format';
import { Gauge } from './Gauge';

export function KmlRapido() {
  const [dist, setDist] = useState('');
  const [litros, setLitros] = useState('');

  const kml = useMemo(() => {
    const d = parseNum(dist);
    const l = parseNum(litros);
    return d > 0 && l > 0 ? d / l : NaN;
  }, [dist, litros]);

  function handleClear() {
    setDist('');
    setLitros('');
  }

  return (
    <div>
      <PanelHead
        title="Cálculo km/L"
        description="Um cálculo rápido de rendimento — só distância e litros."
        actions={<ClearButton onClick={handleClear} />}
      />

      <FieldRow>
        <NumberField id="c3-dist" label="Distância (km)" value={dist} onChange={setDist} placeholder="Ex.: 180" />
        <NumberField id="c3-litros" label="Litros usados (L)" value={litros} onChange={setLitros} placeholder="Ex.: 14" />
      </FieldRow>

      <Gauge kml={kml} />

      <Explain
        formulas={['Consumo (km/L) = Distância percorrida ÷ Litros abastecidos']}
        note="É o rendimento clássico: quantos quilômetros o carro roda com 1 litro de combustível."
      />
    </div>
  );
}
