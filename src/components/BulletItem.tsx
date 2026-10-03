'use client';
import React from 'react';
import { useLens } from '@/context/LensContext';

export interface BulletItemProps {
  children: React.ReactNode;
  active?: boolean;
  showDot?: boolean;
  className?: string;
  dotClassName?: string;
}

/**
 * Optical first-line bullet item.
 * Guarantees that circular/square status dots align optically
 * with the visual center of the FIRST line of text, regardless of
 * text length, line wrapping, or subsequent sub-labels.
 */
export const BulletItem: React.FC<BulletItemProps> = ({
  children,
  active = true,
  showDot = true,
  className = '',
  dotClassName = '',
}) => {
  const { lens } = useLens();

  if (!showDot) {
    return <div className={className}>{children}</div>;
  }

  const isSquare = lens === 'swiss' || lens === 'brutalist';

  return (
    <div className={`flex items-start gap-2.5 ${className}`}>
      {/* 
        Dot anchor: height is set to 1.45em to match the first line-height of text.
        Centered with inline-flex items-center so the dot sits at the optical
        center of the first line of text.
      */}
      <span
        className="inline-flex items-center justify-center flex-shrink-0 w-2 h-[1.45em] select-none pointer-events-none"
        aria-hidden="true"
      >
        <span
          className={`w-1.5 h-1.5 ${
            isSquare ? 'rounded-none' : 'rounded-full'
          } ${
            active ? 'bg-white ring-2 ring-white/25' : 'bg-white/40'
          } transition-all duration-200 ${dotClassName}`}
        />
      </span>
      <div className="flex-1 min-w-0 leading-[1.45]">
        {children}
      </div>
    </div>
  );
};

export interface StatusDotProps {
  active?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

export const StatusDot: React.FC<StatusDotProps> = ({
  active = true,
  className = '',
  size = 'sm',
}) => {
  const { lens } = useLens();
  const isSquare = lens === 'swiss' || lens === 'brutalist';
  const sizeClasses = size === 'md' ? 'w-2 h-2' : 'w-1.5 h-1.5';

  return (
    <span
      className={`inline-block ${sizeClasses} ${
        isSquare ? 'rounded-none' : 'rounded-full'
      } ${
        active ? 'bg-white ring-2 ring-white/25' : 'bg-white/40'
      } transition-all duration-200 ${className}`}
      aria-hidden="true"
    />
  );
};
