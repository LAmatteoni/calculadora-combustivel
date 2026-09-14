import type { Metadata } from 'next';
import { IBM_Plex_Mono, Manrope } from 'next/font/google';
import { ToastProvider } from '@/components/layout/ToastProvider';
import { ADSENSE_CLIENT } from '@/lib/ads';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Consumo & Custo — calculadora de combustível',
  description:
    'Calculadora de combustível para o dia a dia: consumo, autonomia, comparação de preços, conversão para GNV e histórico de abastecimentos.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${plexMono.variable}`}>
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
