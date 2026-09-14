'use client';

import type { TabKey } from '@/lib/types';
import {
  AutonomiaIcon,
  CompararIcon,
  ConsumoIcon,
  GnvIcon,
  GuiaIcon,
  HistoricoIcon,
  VeiculosIcon,
} from './icons';

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'consumo', label: 'Consumo', icon: <ConsumoIcon /> },
  { key: 'autonomia', label: 'Autonomia', icon: <AutonomiaIcon /> },
  { key: 'comparar', label: 'Comparar', icon: <CompararIcon /> },
  { key: 'gnv', label: 'GNV', icon: <GnvIcon /> },
  { key: 'historico', label: 'Histórico', icon: <HistoricoIcon /> },
  { key: 'veiculos', label: 'Veículos', icon: <VeiculosIcon /> },
  { key: 'guia', label: 'Guia', icon: <GuiaIcon /> },
];

export function PrimaryTabs({ active, onChange }: { active: TabKey; onChange: (key: TabKey) => void }) {
  return (
    <div className="tabs-outer">
      <div className="tabs" role="tablist" aria-label="Calculadoras">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`tab${active === tab.key ? ' active' : ''}`}
            role="tab"
            aria-selected={active === tab.key}
            onClick={() => onChange(tab.key)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
