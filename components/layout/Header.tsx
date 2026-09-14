import { BrandIcon } from '@/components/nav/icons';

export function Header() {
  return (
    <header className="app-header">
      <div className="brand-icon">
        <BrandIcon />
      </div>
      <div>
        <h1>Consumo &amp; Custo</h1>
        <p>Calculadora de combustível para o dia a dia</p>
      </div>
    </header>
  );
}
