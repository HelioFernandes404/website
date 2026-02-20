import type { Metadata } from 'next';

import '@/app/globals.css';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'Dev Toolbox',
  description: 'Curated developer tools by category for shipping products faster.',
  metadataBase: new URL('https://devtoolbox.local'),
  openGraph: {
    title: 'Dev Toolbox',
    description: 'Curated developer tools by category for shipping products faster.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-0 text-neutral-950 antialiased">
        <div className="noise-film" aria-hidden />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
