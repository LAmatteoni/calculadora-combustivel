import { Panel, PanelHead } from '@/components/ui/Panel';

export function GuiaPanel({ hidden }: { hidden?: boolean }) {
  return (
    <Panel hidden={hidden}>
      <PanelHead title="Guia rápido" description="Um pouco de contexto pra usar melhor os números." />

      <details className="guide-item" open>
        <summary>Por que o consumo real é diferente do informado pelo fabricante?</summary>
        <div className="guide-body">
          <p>
            O número que vem na ficha técnica ou na etiqueta do Inmetro é medido em laboratório, em condições
            controladas de temperatura, carga e velocidade constante. No dia a dia entram variáveis que o teste não
            captura: trânsito parado, ar-condicionado ligado, pneus mais ou menos calibrados, peso extra no carro e o
            jeito de cada motorista acelerar e frear.
          </p>
          <p>
            Por isso é normal o consumo real ficar de 10% a 25% abaixo do informado — e é justamente pra isso que
            serve medir o seu próprio consumo nas abas &quot;km/L rápido&quot; e &quot;Histórico&quot;.
          </p>
        </div>
      </details>

      <details className="guide-item">
        <summary>Dicas de direção econômica</summary>
        <div className="guide-body">
          <ul>
            <li>Mantenha os pneus calibrados na pressão indicada pelo fabricante.</li>
            <li>Evite acelerações e freadas bruscas — dirija de forma mais previsível.</li>
            <li>Troque de marcha mais cedo, mantendo o motor em rotações baixas.</li>
            <li>Use o ar-condicionado com moderação em trajetos curtos e a baixa velocidade.</li>
            <li>Retire peso e bagageiros que você não está usando.</li>
            <li>Mantenha a manutenção em dia: filtro de ar, velas e óleo afetam o consumo.</li>
          </ul>
        </div>
      </details>
    </Panel>
  );
}
