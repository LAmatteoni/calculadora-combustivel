'use client';

import { useState } from 'react';
import { SubTabs } from '@/components/nav/SubTabs';
import { Panel, SubPanel } from '@/components/ui/Panel';
import { CidadeEstrada } from './CidadeEstrada';
import { ConsumoPrincipal } from './ConsumoPrincipal';
import { KmlRapido } from './KmlRapido';
import { Orcamento } from './Orcamento';

type SubTab = 'principal' | 'kml' | 'cidade-estrada' | 'orcamento';

const SUBTABS: { key: SubTab; label: string }[] = [
  { key: 'principal', label: 'Cálculo do consumo' },
  { key: 'kml', label: 'km/L rápido' },
  { key: 'cidade-estrada', label: 'Cidade x Estrada' },
  { key: 'orcamento', label: 'Orçamento' },
];

export function ConsumoPanel({ hidden }: { hidden?: boolean }) {
  const [subtab, setSubtab] = useState<SubTab>('principal');

  return (
    <Panel hidden={hidden}>
      <SubTabs items={SUBTABS} active={subtab} onChange={setSubtab} />

      <SubPanel hidden={subtab !== 'principal'}>
        <ConsumoPrincipal />
      </SubPanel>
      <SubPanel hidden={subtab !== 'kml'}>
        <KmlRapido />
      </SubPanel>
      <SubPanel hidden={subtab !== 'cidade-estrada'}>
        <CidadeEstrada />
      </SubPanel>
      <SubPanel hidden={subtab !== 'orcamento'}>
        <Orcamento />
      </SubPanel>
    </Panel>
  );
}
