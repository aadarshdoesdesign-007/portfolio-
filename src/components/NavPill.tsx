'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface NavPillProps {
  href: string;
  label: string;
  isActive?: boolean;
  color?: 'yellow' | 'pink' | 'cyan' | 'black';
  onClick?: () => void;
}

export const NavPill: React.FC<NavPillProps> = ({
  href,
  label,
  isActive = false,
  color = 'yellow',
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const colorStyles = {
    yellow: 'bg-[#FFFF5F] text-black shadow-[2px_2px_0px_#000000]',
    pink: 'bg-[#FF4BB9] text-white shadow-[2px_2px_0px_#000000]',
    cyan: 'bg-[#00ADE6] text-white shadow-[2px_2px_0px_#000000]',
    black: 'bg-black text-white shadow-[2px_2px_0px_rgba(0,0,0,0.3)]',
  };

  const idleStyle = 'bg-white/80 hover:bg-white text-black border border-black/80 hover:border-black';

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-block relative"
    >
      <motion.div
        style={{ transformOrigin: '85% 100%' }}
        animate={
          isHovered
            ? {
                rotate: [0, -10, 8, -6, 4, -2, 0],
                y: [0, -4, 2, -1, 0],
              }
            : { rotate: 0, y: 0 }
        }
        transition={{
          duration: 0.8,
          ease: 'easeOut',
        }}
      >
        <Link
          href={href}
          onClick={onClick}
          className={`block px-4 py-1.5 sm:px-5 sm:py-2 rounded-full font-pacaembu text-sm sm:text-base font-semibold tracking-wide transition-all duration-200 select-none ${
            isActive ? colorStyles[color] : idleStyle
          }`}
        >
          {label}
        </Link>
      </motion.div>
    </div>
  );
};
