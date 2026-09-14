'use client';

import { ClearButton } from '@/components/ui/ClearButton';
import { Panel, PanelHead } from '@/components/ui/Panel';
import { useVehicles } from './VehiclesContext';

export function VeiculosPanel({ hidden }: { hidden?: boolean }) {
  const { vehicles, addVehicle, removeVehicle, updateVehicle, clearVehicles } = useVehicles();

  return (
    <Panel hidden={hidden}>
      <PanelHead
        title="Meus veículos"
        description="Salve o consumo e a capacidade do tanque pra reaproveitar nas outras calculadoras."
        actions={<ClearButton onClick={clearVehicles} />}
      />

      <div className="row-list">
        {vehicles.length === 0 && (
          <p className="panel-desc">Nenhum veículo salvo. Adicione um pra reaproveitar o consumo dele nas outras calculadoras.</p>
        )}
        {vehicles.map((v) => (
          <div className="edit-row cols-4-name" key={v.id}>
            <div className="field">
              <label>Apelido do veículo</label>
              <input
                type="text"
                placeholder="Ex.: Meu Onix"
                value={v.nome}
                onChange={(e) => updateVehicle(v.id, { nome: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Consumo (km/L)</label>
              <input
                type="text"
                inputMode="decimal"
                placeholder="Ex.: 12"
                value={v.consumo}
                onChange={(e) => updateVehicle(v.id, { consumo: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Tanque (L) — opcional</label>
              <input
                type="text"
                inputMode="decimal"
                placeholder="Ex.: 50"
                value={v.capacidade}
                onChange={(e) => updateVehicle(v.id, { capacidade: e.target.value })}
              />
            </div>
            <button className="remove-row" type="button" aria-label="Remover veículo" onClick={() => removeVehicle(v.id)}>
              ×
            </button>
          </div>
        ))}
      </div>

      <button className="add-row" type="button" onClick={addVehicle}>
        + Adicionar veículo
      </button>

      <p className="explain-note">
        Os veículos salvos aparecem como opção nas abas Consumo, Autonomia, Orçamento e Comparar. Assim como o resto do
        site, eles não são salvos depois que a página é fechada.
      </p>
    </Panel>
  );
}
