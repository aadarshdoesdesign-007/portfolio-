import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CompanionProvider } from '@/context/CompanionContext';
import { GothamProvider } from '@/context/GothamContext';
import { GothamTransitionOverlay } from '@/components/GothamTransitionOverlay';

export const viewport: Viewport = {
  themeColor: '#E4E2D8',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Aadarsh Ramakrishnan | Multidisciplinary Designer',
  description: "Portfolio of Aadarsh Ramakrishnan — multidisciplinary designer and creative technologist creating work across UI/UX, product design, complex data visualization, and design research.",
  keywords: [
    'Aadarsh Ramakrishnan',
    'Aadarsh R',
    'UI/UX Designer',
    'Product Designer',
    'Design Research',
    'Data Visualization',
    'IIT Indore',
    'NewSpace Research',
    'Bengaluru Designer'
  ],
  authors: [{ name: 'Aadarsh Ramakrishnan' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[var(--bg-paper)] text-[var(--text-primary)] antialiased font-pacaembu transition-colors duration-500">
        <GothamProvider>
          <CompanionProvider>
            <GothamTransitionOverlay />
            {children}
          </CompanionProvider>
        </GothamProvider>
      </body>
    </html>
  );
}
