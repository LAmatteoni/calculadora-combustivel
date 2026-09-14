'use client';

import { useMemo, useRef } from 'react';
import { ClearButton } from '@/components/ui/ClearButton';
import { Explain } from '@/components/ui/Explain';
import { Panel, PanelHead } from '@/components/ui/Panel';
import { ResultItem, ResultsGrid } from '@/components/ui/Results';
import { usePersistedState } from '@/hooks/usePersistedState';
import { useShare } from '@/hooks/useShare';
import { fmt, fmtBRL, parseNum } from '@/lib/format';
import { Sparkline } from './Sparkline';

type Abastecimento = { id: number; km: string; litros: string; preco: string };

export function HistoricoPanel({ hidden }: { hidden?: boolean }) {
  const nextId = useRef(1);
  const [history, setHistory] = usePersistedState<Abastecimento[]>('cc:historico', []);
  const { share } = useShare();

  function updateEntry(id: number, patch: Partial<Omit<Abastecimento, 'id'>>) {
    setHistory((prev) => prev.map((h) => (h.id === id ? { ...h, ...patch } : h)));
  }

  function addEntry() {
    setHistory((prev) => [...prev, { id: nextId.current++, km: '', litros: '', preco: '' }]);
  }

  function removeEntry(id: number) {
    setHistory((prev) => prev.filter((h) => h.id !== id));
  }

  function handleClear() {
    setHistory([]);
  }

  const { media, totalKm, totalLitros, totalGasto, temGasto, consumos } = useMemo(() => {
    let totalKm = 0;
    let totalLitros = 0;
    let totalGasto = 0;
    let temGasto = false;
    const consumos: number[] = [];

    history.forEach((h) => {
      const km = parseNum(h.km);
      const litros = parseNum(h.litros);
      const preco = parseNum(h.preco);
      if (km > 0 && litros > 0) {
        totalKm += km;
        totalLitros += litros;
        consumos.push(km / litros);
        if (isFinite(preco)) {
          totalGasto += preco * litros;
          temGasto = true;
        }
      }
    });

    const media = totalLitros > 0 ? totalKm / totalLitros : NaN;
    return { media, totalKm, totalLitros, totalGasto, temGasto, consumos };
  }, [history]);

  function handleShare() {
    const linhas = [
      'Histórico de abastecimentos',
      `Consumo médio geral: ${isFinite(media) ? fmt(media, 2) + ' km/L' : '—'}`,
      `Total percorrido: ${totalKm > 0 ? fmt(totalKm, 0) + ' km' : '—'}`,
      `Total abastecido: ${totalLitros > 0 ? fmt(totalLitros, 2) + ' L' : '—'}`,
      `Gasto total: ${temGasto ? fmtBRL(totalGasto) : '—'}`,
    ];
    share('Histórico de abastecimentos', linhas.join('\n'));
  }

  return (
    <Panel hidden={hidden}>
      <PanelHead
        title="Histórico de abastecimentos"
        description="Registre seus abastecimentos e veja a tendência de consumo."
        actions={
          <>
            <ClearButton onClick={handleShare}>Compartilhar</ClearButton>
            <ClearButton onClick={handleClear} />
          </>
        }
      />

      <div className="row-list">
        {history.length === 0 && (
          <p className="panel-desc">Nenhum abastecimento registrado ainda. Toque em &quot;+ Adicionar abastecimento&quot; para começar.</p>
        )}
        {history.map((h) => {
          const km = parseNum(h.km);
          const litros = parseNum(h.litros);
          const consumo = km > 0 && litros > 0 ? km / litros : NaN;
          return (
            <div className="edit-row" key={h.id}>
              <div className="field">
                <label>Km desde o último</label>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Ex.: 480"
                  value={h.km}
                  onChange={(e) => updateEntry(h.id, { km: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Litros abastecidos</label>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Ex.: 40"
                  value={h.litros}
                  onChange={(e) => updateEntry(h.id, { litros: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Preço/L — opcional</label>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Ex.: 5,89"
                  value={h.preco}
                  onChange={(e) => updateEntry(h.id, { preco: e.target.value })}
                />
              </div>
              <button className="remove-row" type="button" aria-label="Remover abastecimento" onClick={() => removeEntry(h.id)}>
                ×
              </button>
              <div className="row-caption">Consumo: {isFinite(consumo) ? `${fmt(consumo, 2)} km/L` : '—'}</div>
            </div>
          );
        })}
      </div>

      <button className="add-row" type="button" onClick={addEntry}>
        + Adicionar abastecimento
      </button>

      <div className="sparkline-wrap">
        <Sparkline values={consumos} />
      </div>

      <ResultsGrid>
        <ResultItem label="Consumo médio geral" value={isFinite(media) ? `${fmt(media, 2)} km/L` : '—'} />
        <ResultItem label="Total percorrido" value={totalKm > 0 ? `${fmt(totalKm, 0)} km` : '—'} />
        <ResultItem label="Total abastecido" value={totalLitros > 0 ? `${fmt(totalLitros, 2)} L` : '—'} />
        <ResultItem label="Gasto total" value={temGasto ? fmtBRL(totalGasto) : '—'} />
      </ResultsGrid>

      <Explain
        formulas={[
          'Consumo por abastecimento = Km desde o último abastecimento ÷ Litros abastecidos',
          'Consumo médio geral = Total percorrido ÷ Total abastecido',
        ]}
        note="Os dados ficam salvos neste navegador (localStorage) — continuam após recarregar a página."
      />
    </Panel>
  );
}
