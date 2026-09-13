
'use client';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';

const colors = [
  "#000000", // Black (Default)
  "#6B7280", // Gray
  "#EF4444", // Red
  "#F97316", // Orange
  "#F59E0B", // Amber
  "#EAB308", // Yellow
  "#84CC16", // Lime
  "#22C55E", // Green
  "#10B981", // Emerald
  "#14B8A6", // Teal
  "#06B6D4", // Cyan
  "#0EA5E9", // Sky
  "#3B82F6", // Blue
  "#6366F1", // Indigo
  "#8B5CF6", // Violet
  "#A855F7", // Purple
  "#D946EF", // Fuchsia
  "#EC4899", // Pink
  "#F43F5E", // Rose
];

export function ThemeSwitcher() {
  const { themeColor, setThemeColor } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-wrap items-center gap-3" aria-label="Theme colors">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          aria-label={`Use ${color} theme`}
          aria-pressed={themeColor === color}
          className={`h-9 w-9 rounded-full border-2 p-0.5 transition-all ${
            themeColor === color ? 'border-primary ring-2 ring-primary/30' : 'border-transparent'
          }`}
          onClick={() => setThemeColor(color)}
        >
          <span
            className="block h-full w-full rounded-full border border-black/10"
            style={{ backgroundColor: color }}
          />
        </button>
      ))}
    </div>
  );
}
