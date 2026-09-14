'use client';

import { useMemo, useRef, useState } from 'react';
import { ClearButton } from '@/components/ui/ClearButton';
import { Callout, Explain } from '@/components/ui/Explain';
import { PanelHead } from '@/components/ui/Panel';
import { FUEL_KEYS, FUEL_TYPES, FuelKey, unitLabels } from '@/lib/fuelTypes';
import { fmt, fmtBRL, parseNum } from '@/lib/format';

type Fuel = { id: number; tipo: FuelKey; preco: string; consumo: string };

const DEFAULT_FUELS: Omit<Fuel, 'id'>[] = [
  { tipo: 'gasolina', preco: '', consumo: '' },
  { tipo: 'etanol', preco: '', consumo: '' },
];

export function PrecosCombustivel() {
  const nextId = useRef(1);
  const [fuels, setFuels] = useState<Fuel[]>(() => DEFAULT_FUELS.map((f) => ({ ...f, id: nextId.current++ })));

  function updateFuel(id: number, patch: Partial<Omit<Fuel, 'id'>>) {
    setFuels((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  }

  function addFuel() {
    if (fuels.length >= 6) return;
    const used = fuels.map((f) => f.tipo);
    const nextType = FUEL_KEYS.find((k) => !used.includes(k)) ?? 'outro';
    setFuels((prev) => [...prev, { id: nextId.current++, tipo: nextType, preco: '', consumo: '' }]);
  }

  function removeFuel(id: number) {
    setFuels((prev) => (prev.length <= 1 ? prev : prev.filter((f) => f.id !== id)));
  }

  function handleClear() {
    setFuels(DEFAULT_FUELS.map((f) => ({ ...f, id: nextId.current++ })));
  }

  const ranking = useMemo(() => {
    const computed = fuels
      .map((f) => {
        const preco = parseNum(f.preco);
        const consumo = parseNum(f.consumo);
        const custoKm = isFinite(preco) && isFinite(consumo) && consumo > 0 ? preco / consumo : NaN;
        return { tipo: f.tipo, custoKm };
      })
      .filter((c) => isFinite(c.custoKm));
    computed.sort((a, b) => a.custoKm - b.custoKm);
    return computed;
  }, [fuels]);

  const rule70 = useMemo(() => {
    const gas = fuels.find((f) => f.tipo === 'gasolina');
    const eta = fuels.find((f) => f.tipo === 'etanol');
    if (!gas || !eta) return null;
    const pg = parseNum(gas.preco);
    const pe = parseNum(eta.preco);
    if (!isFinite(pg) || !isFinite(pe) || pg <= 0) {
      return { ready: false as const };
    }
    const ratio = pe / pg;
    return { ready: true as const, ratio, compensa: ratio <= 0.7 };
  }, [fuels]);

  const max = ranking.length ? ranking[ranking.length - 1].custoKm : 0;

  return (
    <div>
      <PanelHead
        title="Comparativo de preços de combustíveis"
        description="Compare o custo real por km. Comece com gasolina x etanol e adicione outros se precisar."
        actions={<ClearButton onClick={handleClear} />}
      />

      <div className="row-list">
        {fuels.map((f) => {
          const labels = unitLabels(f.tipo);
          return (
            <div className="edit-row" key={f.id}>
              <div className="field">
                <label>Combustível</label>
                <select value={f.tipo} onChange={(e) => updateFuel(f.id, { tipo: e.target.value as FuelKey })}>
                  {FUEL_KEYS.map((key) => (
                    <option key={key} value={key}>
                      {FUEL_TYPES[key].label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>{labels.price}</label>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="0,00"
                  value={f.preco}
                  onChange={(e) => updateFuel(f.id, { preco: e.target.value })}
                />
              </div>
              <div className="field">
                <label>{labels.consumo}</label>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="0,0"
                  value={f.consumo}
                  onChange={(e) => updateFuel(f.id, { consumo: e.target.value })}
                />
              </div>
              <button
                className="remove-fuel"
                type="button"
                aria-label="Remover combustível"
                disabled={fuels.length <= 1}
                onClick={() => removeFuel(f.id)}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>

      <button className="add-fuel" type="button" onClick={addFuel}>
        + Adicionar combustível
      </button>

      <div>
        {ranking.length === 0 ? (
          <p className="panel-desc" style={{ marginTop: 14 }}>
            Preencha preço e consumo de ao menos um combustível para ver a comparação.
          </p>
        ) : (
          <div className="rank-list">
            {ranking.map((c, idx) => {
              const info = FUEL_TYPES[c.tipo];
              return (
                <div className="rank-row" key={c.tipo}>
                  <span className="fuel-swatch" style={{ background: info.color }} />
                  <span className="name">{info.label}</span>
                  <span className="cost">{fmtBRL(c.custoKm)} /km</span>
                  {idx === 0 && <span className="rank-best">Mais econômico</span>}
                  <div className="rank-bar-track">
                    <div
                      className="rank-bar-fill"
                      style={{ width: `${max > 0 ? (c.custoKm / max) * 100 : 0}%`, background: info.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {rule70 &&
        (rule70.ready ? (
          <Callout highlight={rule70.compensa}>
            Etanol está em <strong>{fmt(rule70.ratio * 100, 0)}%</strong> do preço da gasolina.{' '}
            {rule70.compensa ? (
              <>
                Abaixo de 70%, <strong>o etanol compensa</strong> mesmo rendendo menos por litro.
              </>
            ) : (
              <>
                Acima de 70%, <strong>a gasolina tende a sair mais em conta</strong> por km rodado.
              </>
            )}
          </Callout>
        ) : (
          <Callout>Informe o preço da gasolina e do etanol para ver a regra prática dos 70%.</Callout>
        ))}

      <Explain
        formulas={[
          'Custo por km = Preço do combustível ÷ Consumo (km/L ou km/kWh)',
          'Regra dos 70% = etanol compensa quando (Preço do etanol ÷ Preço da gasolina) ≤ 0,70',
        ]}
        note="O ranking usa sempre o custo por km, por isso dá pra comparar combustíveis com unidades diferentes, como litro e kWh."
      />
    </div>
  );
}
