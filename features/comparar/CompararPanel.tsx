'use client';

import { useState } from 'react';
import { SubTabs } from '@/components/nav/SubTabs';
import { Panel, SubPanel } from '@/components/ui/Panel';
import { ConversorUnidades } from './ConversorUnidades';
import { DoisVeiculos } from './DoisVeiculos';
import { PrecosCombustivel } from './PrecosCombustivel';

type SubTab = 'precos' | 'veiculos' | 'unidades';

const SUBTABS: { key: SubTab; label: string }[] = [
  { key: 'precos', label: 'Preços de combustível' },
  { key: 'veiculos', label: 'Dois veículos' },
  { key: 'unidades', label: 'Unidades' },
];

export function CompararPanel({ hidden }: { hidden?: boolean }) {
  const [subtab, setSubtab] = useState<SubTab>('precos');

  return (
    <Panel hidden={hidden}>
      <SubTabs items={SUBTABS} active={subtab} onChange={setSubtab} />

      <SubPanel hidden={subtab !== 'precos'}>
        <PrecosCombustivel />
      </SubPanel>
      <SubPanel hidden={subtab !== 'veiculos'}>
        <DoisVeiculos />
      </SubPanel>
      <SubPanel hidden={subtab !== 'unidades'}>
        <ConversorUnidades />
      </SubPanel>
    </Panel>
  );
}
