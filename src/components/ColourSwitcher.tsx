'use client';
import React from 'react';

export interface ThemeColor {
  id: string;
  name: string;
  hex: string;
  fontColor: string;
}

export const themeColors: ThemeColor[] = [
  { id: 'black', name: 'Black', hex: '#000000', fontColor: '#FFFFFF' },
  { id: 'orange', name: 'Orange', hex: '#F7480B', fontColor: '#FFFFFF' },
  { id: 'blue', name: 'Blue', hex: '#5E4C9B', fontColor: '#FFFFFF' },
  { id: 'green', name: 'Green', hex: '#4D6940', fontColor: '#FFFFFF' },
  { id: 'brown', name: 'Brown', hex: '#5B2616', fontColor: '#FFFFFF' },
  { id: 'purple', name: 'Purple', hex: '#97319B', fontColor: '#FFFFFF' }
];

interface ColourSwitcherProps {
  currentColor: ThemeColor;
  onColorChange: (color: ThemeColor) => void;
  isColorBG?: boolean;
}

export const ColourSwitcher: React.FC<ColourSwitcherProps> = ({
  currentColor,
  onColorChange,
  isColorBG = false
}) => {
  return (
    <div 
      className="relative flex items-center h-8"
      title="Theme Color Picker (Press 'c' to cycle)"
      role="group"
      aria-label="Theme color selector"
    >
      <div className="flex items-center gap-1.5 p-1 rounded-md transition-colors">
        {themeColors.map((color) => {
          const isSelected = color.id === currentColor.id;
          return (
            <button
              key={color.id}
              onClick={() => onColorChange(color)}
              aria-label={`Select ${color.name} theme`}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-200 cursor-pointer ${
                isSelected 
                  ? 'scale-125 ring-2 ring-offset-2 ring-white ring-offset-[var(--background)]' 
                  : 'opacity-75 hover:opacity-100 hover:scale-110'
              }`}
              style={{
                backgroundColor: color.hex,
                border: color.id === 'black'
                  ? '1px solid rgba(255, 255, 255, 0.7)'
                  : '1px solid rgba(255, 255, 255, 0.4)'
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
