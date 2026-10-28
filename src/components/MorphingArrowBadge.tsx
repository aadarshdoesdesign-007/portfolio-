'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface MorphingArrowBadgeProps {
  size?: number;
  shapeColor?: string;
  arrowColor?: string;
  className?: string;
  onClick?: () => void;
}

const TOTAL_POINTS = 120;
const TWO_PI = Math.PI * 2;

function generateShapePath(type: 'burst' | 'star' | 'flower', radius: number, center: number): string {
  const points: number[] = new Array(TOTAL_POINTS);

  if (type === 'flower') {
    const petals = 6;
    for (let i = 0; i < TOTAL_POINTS; i++) {
      const angle = (i / TOTAL_POINTS) * TWO_PI;
      const r = radius * (0.8 + 0.2 * Math.sin(angle * petals));
      points[i] = r;
    }
  } else if (type === 'burst') {
    const spikes = 12;
    for (let i = 0; i < TOTAL_POINTS; i++) {
      const angle = (i / TOTAL_POINTS) * TWO_PI;
      const wave = Math.abs((((angle * spikes) / TWO_PI) % 1) - 0.5) * 2;
      const r = radius * (0.65 + 0.35 * (1 - wave));
      points[i] = r;
    }
  } else {
    // star
    const rays = 8;
    for (let i = 0; i < TOTAL_POINTS; i++) {
      const angle = (i / TOTAL_POINTS) * TWO_PI;
      const wave = (Math.cos(angle * rays) + 1) / 2;
      const r = radius * (0.7 + 0.3 * Math.pow(wave, 1.5));
      points[i] = r;
    }
  }

  let d = '';
  for (let i = 0; i < TOTAL_POINTS; i++) {
    const angle = (i / TOTAL_POINTS) * TWO_PI;
    const x = center + Math.cos(angle) * points[i];
    const y = center + Math.sin(angle) * points[i];
    d += (i === 0 ? 'M' : 'L') + x.toFixed(2) + ',' + y.toFixed(2);
  }
  return d + 'Z';
}

export const MorphingArrowBadge: React.FC<MorphingArrowBadgeProps> = ({
  size = 56,
  shapeColor = '#FFFF5F',
  arrowColor = '#000000',
  className = '',
  onClick,
}) => {
  const shapes: Array<'burst' | 'star' | 'flower'> = ['burst', 'flower', 'star'];
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const [pathData, setPathData] = useState(() =>
    generateShapePath('burst', size * 0.46, size * 0.5)
  );

  const morphNext = () => {
    const nextIndex = (currentShapeIndex + 1) % shapes.length;
    setCurrentShapeIndex(nextIndex);
    setPathData(generateShapePath(shapes[nextIndex], size * 0.46, size * 0.5));
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={morphNext}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none group ${className}`}
      style={{ width: size, height: size }}
      title="Explore"
    >
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="block"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
      >
        <motion.path
          d={pathData}
          fill={shapeColor}
          stroke="#000000"
          strokeWidth="1.5"
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        />
      </motion.svg>

      {/* Centered angled arrow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-300 group-hover:scale-110"
        style={{ color: arrowColor }}
      >
        <svg
          width={size * 0.38}
          height={size * 0.38}
          viewBox="0 0 86 86"
          fill="currentColor"
        >
          <path d="M84.76,0l2.02,2.21v79.24l-16.73-.18V28.13L11.4,86.96,0,75.38,59.57,16H5.51V0h79.24Z" />
        </svg>
      </div>
    </div>
  );
};
