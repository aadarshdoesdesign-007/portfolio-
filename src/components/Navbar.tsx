'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavPill } from './NavPill';
import { CompanionSelector } from './CompanionSelector';
import { BatSymbolButton } from './BatSymbolButton';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/work', label: 'work', color: 'yellow' as const },
    { href: '/about', label: 'about', color: 'pink' as const },
    { href: '/play', label: 'play', color: 'cyan' as const },
    { href: '/contact', label: 'say hi', color: 'black' as const },
  ];

  return (
    <header className="relative top-0 z-40 w-full px-6 sm:px-20 py-6 transition-all bg-transparent pointer-events-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo - Positioned to the right of the 55px pink margin rule */}
        <Link
          href="/"
          className="group flex items-center gap-2 select-none"
        >
          <span className="font-pacaembu text-xl sm:text-2xl font-bold tracking-tight text-black group-hover:text-[#FF4BB9] transition-colors">
            aadarsh ramakrishnan
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-[#00ADE6] group-hover:scale-150 transition-transform" />
        </Link>

        {/* Desktop Navigation - Upper-Right */}
        <nav className="hidden md:flex items-center gap-2.5 lg:gap-3.5">
          {navItems.map((item) => (
            <NavPill
              key={item.href}
              href={item.href}
              label={item.label}
              color={item.color}
              isActive={pathname === item.href || (item.href === '/work' && pathname.startsWith('/work/'))}
            />
          ))}

          <div className="ml-1">
            <CompanionSelector />
          </div>

          <div className="ml-1">
            <BatSymbolButton size={40} />
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          <CompanionSelector />
          <BatSymbolButton size={38} />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col justify-center items-center w-10 h-10 rounded-full border-2 border-black bg-white/90 shadow-[2px_2px_0px_#000000] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span
              className={`w-5 h-0.5 bg-black transition-transform duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-black transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-black transition-transform duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden mt-3 p-6 rounded-3xl bg-[#F9F3EB] border-2 border-black shadow-[4px_4px_0px_#000000] flex flex-col gap-4"
          >
            {navItems.map((item) => (
              <NavPill
                key={item.href}
                href={item.href}
                label={item.label}
                color={item.color}
                isActive={pathname === item.href}
                onClick={() => setMobileMenuOpen(false)}
              />
            ))}
            <div className="pt-2 border-t border-black/15 flex items-center justify-between text-xs font-mono text-black/70">
              <span>Bengaluru, India</span>
              <a
                href="mailto:aadarshdoesdesign@gmail.com"
                className="underline hover:text-black font-semibold"
              >
                email me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
