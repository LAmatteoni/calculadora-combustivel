'use client';

import { useMemo, useState } from 'react';
import { ClearButton } from '@/components/ui/ClearButton';
import { Explain } from '@/components/ui/Explain';
import { FieldRow } from '@/components/ui/NumberField';
import { PanelHead } from '@/components/ui/Panel';
import { ResultItem, ResultsGrid } from '@/components/ui/Results';
import { fmt, parseNum } from '@/lib/format';

const MPG_FACTOR = 2.3521;
type Unidade = 'kml' | 'l100' | 'mpg';

export function ConversorUnidades() {
  const [valor, setValor] = useState('');
  const [unidade, setUnidade] = useState<Unidade>('kml');

  const { kml, l100, mpg } = useMemo(() => {
    const v = parseNum(valor);
    let kml: number;
    if (unidade === 'kml') kml = v;
    else if (unidade === 'l100') kml = v > 0 ? 100 / v : NaN;
    else kml = isFinite(v) ? v / MPG_FACTOR : NaN;

    const l100 = isFinite(kml) && kml > 0 ? 100 / kml : NaN;
    const mpg = isFinite(kml) ? kml * MPG_FACTOR : NaN;
    return { kml, l100, mpg };
  }, [valor, unidade]);

  function handleClear() {
    setValor('');
    setUnidade('kml');
  }

  return (
    <div>
      <PanelHead
        title="Conversor de unidades"
        description="Converta entre km/L, L/100km e mpg (milhas por galão)."
        actions={<ClearButton onClick={handleClear} />}
      />

      <FieldRow>
        <div className="field">
          <label htmlFor="conv-valor">Valor</label>
          <input
            type="text"
            inputMode="decimal"
            id="conv-valor"
            placeholder="Ex.: 12"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="conv-unidade">Unidade de origem</label>
          <select id="conv-unidade" value={unidade} onChange={(e) => setUnidade(e.target.value as Unidade)}>
            <option value="kml">km/L</option>
            <option value="l100">L/100km</option>
            <option value="mpg">mpg (galão americano)</option>
          </select>
        </div>
      </FieldRow>

      <ResultsGrid>
        <ResultItem label="km/L" value={isFinite(kml) ? fmt(kml, 2) : '—'} />
        <ResultItem label="L/100km" value={isFinite(l100) ? fmt(l100, 2) : '—'} />
        <ResultItem label="mpg (galão americano)" value={isFinite(mpg) ? fmt(mpg, 2) : '—'} wide />
      </ResultsGrid>

      <Explain formulas={['L/100km = 100 ÷ km/L', 'mpg = km/L × 2,3521 (considerando galão americano de 3,785 L)']} />
    </div>
  );
}
