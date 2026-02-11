import { useState, useRef, useEffect } from 'react';
import { Moon, Sun, Monitor, Sparkles, Palette } from 'lucide-react';
import { useTheme, type Theme } from '@/lib/theme-context';
import { cn } from '@/lib/utils';

const themes: { value: Theme; label: string; icon: typeof Moon; color?: string }[] = [
  { value: 'dark', label: 'Navy', icon: Palette, color: '#f47920' },
  { value: 'slate-dark', label: 'Dark (Standard)', icon: Moon },
  { value: 'executive', label: 'Executive', icon: Monitor, color: '#3b82f6' },
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'purple', label: 'Contrast', icon: Sparkles, color: '#f47920' },
  { value: 'midnight', label: 'Midnight', icon: Moon, color: '#0c1a2e' },
  { value: 'system', label: 'System', icon: Monitor },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentTheme = themes.find(t => t.value === theme) || themes[0];
  const CurrentIcon = currentTheme.icon;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] transition-all hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
        title="Change theme"
      >
        <CurrentIcon size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-48 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-xl">
          <div className="mb-2 px-2 py-1">
            <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Theme</p>
          </div>
          {themes.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.value}
                onClick={() => {
                  setTheme(t.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all',
                  theme === t.value
                    ? 'bg-[var(--accent-purple)]/20 text-[var(--accent-purple)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'
                )}
              >
                <Icon size={16} style={t.color ? { color: t.color } : undefined} />
                <span>{t.label}</span>
                {theme === t.value && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-[var(--accent-purple)]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
