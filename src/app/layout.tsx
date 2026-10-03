import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Aadarsh R — UI/UX, Product & Communication Designer',
  description: 'Personal portfolio and research archive of Aadarsh R. UI/UX Designer, Product Designer, and Communication Designer based in Bengaluru.',
  keywords: [
    'Aadarsh R',
    'Aadarsh Ramakrishnan',
    'UI/UX Designer',
    'Product Designer',
    'Communication Designer',
    'Information Visualization',
    'Design Research',
    'Jain University',
    'NewSpace Research',
    'IIT Indore'
  ],
  authors: [{ name: 'Aadarsh R' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[var(--background)] text-[var(--foreground)] antialiased transition-colors duration-400">
        {children}
      </body>
    </html>
  );
}