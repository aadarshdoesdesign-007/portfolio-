import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CompanionProvider } from '@/context/CompanionContext';

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
      <body className="bg-[#E4E2D8] text-black antialiased font-pacaembu">
        <CompanionProvider>
          {children}
        </CompanionProvider>
      </body>
    </html>
  );
}
