/**
 * Helpers de parsing e formatação numérica no padrão pt-BR,
 * usados por todas as calculadoras.
 */

/** Converte texto de input (aceita vírgula decimal e milhar) em número. */
export function parseNum(v: string | number | null | undefined): number {
  if (v === null || v === undefined) return NaN;
  const s = String(v).trim();
  if (s === '') return NaN;
  if (s.indexOf(',') !== -1) {
    return parseFloat(s.replace(/\./g, '').replace(',', '.'));
  }
  return parseFloat(s);
}

/** Formata número com casas decimais fixas no padrão pt-BR, ou '—' se inválido. */
export function fmt(n: number, dec: number): string {
  if (!isFinite(n)) return '—';
  return n.toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

/** Formata número como moeda BRL, ou '—' se inválido. */
export function fmtBRL(n: number): string {
  if (!isFinite(n)) return '—';
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
