'use client';

import { useMemo, useState } from 'react';
import { ClearButton } from '@/components/ui/ClearButton';
import { Explain } from '@/components/ui/Explain';
import { FieldRow, NumberField } from '@/components/ui/NumberField';
import { Panel, PanelHead } from '@/components/ui/Panel';
import { ResultItem, ResultsGrid } from '@/components/ui/Results';
import { fmt, fmtBRL, parseNum } from '@/lib/format';

export function GnvPanel({ hidden }: { hidden?: boolean }) {
  const [kit, setKit] = useState('');
  const [precoLiquido, setPrecoLiquido] = useState('');
  const [consumoLiquido, setConsumoLiquido] = useState('');
  const [precoGnv, setPrecoGnv] = useState('');
  const [consumoGnv, setConsumoGnv] = useState('');
  const [kmMes, setKmMes] = useState('');

  const { custoL, custoG, economia, kmPagar, mesesPagar } = useMemo(() => {
    const k = parseNum(kit);
    const pL = parseNum(precoLiquido);
    const cL = parseNum(consumoLiquido);
    const pG = parseNum(precoGnv);
    const cG = parseNum(consumoGnv);
    const km = parseNum(kmMes);

    const custoL = cL > 0 && isFinite(pL) ? pL / cL : NaN;
    const custoG = cG > 0 && isFinite(pG) ? pG / cG : NaN;
    const economia = isFinite(custoL) && isFinite(custoG) ? custoL - custoG : NaN;
    const kmPagar = isFinite(economia) && economia > 0 && isFinite(k) ? k / economia : NaN;
    const mesesPagar = isFinite(kmPagar) && km > 0 ? kmPagar / km : NaN;

    return { custoL, custoG, economia, kmPagar, mesesPagar };
  }, [kit, precoLiquido, consumoLiquido, precoGnv, consumoGnv, kmMes]);

  function handleClear() {
    setKit('');
    setPrecoLiquido('');
    setConsumoLiquido('');
    setPrecoGnv('');
    setConsumoGnv('');
    setKmMes('');
  }

  const showNote = isFinite(economia) && economia <= 0;

  return (
    <Panel hidden={hidden}>
      <PanelHead
        title="Ponto de equilíbrio — conversão para GNV"
        description="Em quantos km rodados o kit de GNV se paga."
        actions={<ClearButton onClick={handleClear} />}
      />

      <NumberField id="gnv-kit" label="Custo do kit / instalação (R$)" value={kit} onChange={setKit} placeholder="Ex.: 5000" />

      <FieldRow>
        <NumberField
          id="gnv-precoliquido"
          label="Preço do combustível atual (R$/L)"
          value={precoLiquido}
          onChange={setPrecoLiquido}
          placeholder="Ex.: 5,89"
        />
        <NumberField
          id="gnv-consumoliquido"
          label="Consumo com esse combustível (km/L)"
          value={consumoLiquido}
          onChange={setConsumoLiquido}
          placeholder="Ex.: 10"
        />
      </FieldRow>
      <FieldRow>
        <NumberField
          id="gnv-precognv"
          label="Preço do GNV (R$/m³)"
          value={precoGnv}
          onChange={setPrecoGnv}
          placeholder="Ex.: 4,20"
        />
        <NumberField
          id="gnv-consumognv"
          label="Consumo com GNV (km/m³)"
          value={consumoGnv}
          onChange={setConsumoGnv}
          placeholder="Ex.: 12"
        />
      </FieldRow>
      <NumberField
        id="gnv-kmmes"
        label="Km rodados por mês — opcional"
        value={kmMes}
        onChange={setKmMes}
        placeholder="Ex.: 1500"
      />

      <ResultsGrid>
        <ResultItem label="Custo/km no combustível atual" value={isFinite(custoL) ? fmtBRL(custoL) : '—'} />
        <ResultItem label="Custo/km no GNV" value={isFinite(custoG) ? fmtBRL(custoG) : '—'} />
        <ResultItem label="Economia por km" value={isFinite(economia) ? fmtBRL(economia) : '—'} />
        <ResultItem label="Km para pagar o kit" value={isFinite(kmPagar) ? `${fmt(kmPagar, 0)} km` : '—'} />
        <ResultItem
          label="Tempo estimado para pagar o kit"
          value={isFinite(mesesPagar) ? `${fmt(mesesPagar, 1)} meses` : '—'}
          wide
          hidden={!isFinite(mesesPagar)}
        />
      </ResultsGrid>
      {showNote && (
        <p className="callout">Nas condições informadas, o GNV custaria o mesmo ou mais por km que o combustível atual.</p>
      )}

      <Explain
        formulas={[
          'Custo/km = Preço do combustível ÷ Consumo correspondente',
          'Economia por km = Custo/km atual − Custo/km no GNV',
          'Km para pagar o kit = Custo do kit ÷ Economia por km',
        ]}
      />
    </Panel>
  );
}
