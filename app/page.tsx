'use client';

import { useState } from 'react';
import { AdRailLeft, AdRailRight } from '@/components/ads/AdRail';
import { Header } from '@/components/layout/Header';
import { PrimaryTabs } from '@/components/nav/PrimaryTabs';
import { AutonomiaPanel } from '@/features/autonomia/AutonomiaPanel';
import { CompararPanel } from '@/features/comparar/CompararPanel';
import { ConsumoPanel } from '@/features/consumo/ConsumoPanel';
import { GnvPanel } from '@/features/gnv/GnvPanel';
import { GuiaPanel } from '@/features/guia/GuiaPanel';
import { HistoricoPanel } from '@/features/historico/HistoricoPanel';
import { VehiclesProvider } from '@/features/vehicles/VehiclesContext';
import { VeiculosPanel } from '@/features/vehicles/VeiculosPanel';
import type { TabKey } from '@/lib/types';

export default function Home() {
  const [tab, setTab] = useState<TabKey>('consumo');

  return (
    <VehiclesProvider>
      <div className="page-shell">
        <AdRailLeft />
        <div className="wrap">
          <Header />
          <PrimaryTabs active={tab} onChange={setTab} />

          <ConsumoPanel hidden={tab !== 'consumo'} />
          <AutonomiaPanel hidden={tab !== 'autonomia'} />
          <CompararPanel hidden={tab !== 'comparar'} />
          <GnvPanel hidden={tab !== 'gnv'} />
          <HistoricoPanel hidden={tab !== 'historico'} />
          <VeiculosPanel hidden={tab !== 'veiculos'} />
          <GuiaPanel hidden={tab !== 'guia'} />

        </div>
        <AdRailRight />
      </div>
    </VehiclesProvider>
  );
}
