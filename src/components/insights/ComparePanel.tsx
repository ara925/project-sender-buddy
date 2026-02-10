import { useState } from 'react';
import { CalendarIcon, GitCompareArrows, ArrowUpRight, ArrowDownRight, Equal } from 'lucide-react';
import { format, subDays, subMonths, subWeeks, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover, PopoverContent, PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export type ComparePreset = 'none' | 'prev_week' | 'prev_month' | 'prev_quarter' | 'same_month_ly' | 'custom';

export interface CompareConfig {
  preset: ComparePreset;
  currentRange: { from: Date; to: Date };
  compareRange: { from: Date; to: Date } | null;
}

const presets: { id: ComparePreset; label: string; sub: string }[] = [
  { id: 'none', label: 'No Comparison', sub: 'View current period only' },
  { id: 'prev_week', label: 'vs Previous Week', sub: 'Compare with 7 days prior' },
  { id: 'prev_month', label: 'vs Previous Month', sub: 'Compare with last calendar month' },
  { id: 'prev_quarter', label: 'vs Previous Quarter', sub: 'Compare with 3 months prior' },
  { id: 'same_month_ly', label: 'vs Same Month Last Year', sub: 'Year-over-year comparison' },
  { id: 'custom', label: 'Custom Range', sub: 'Pick any two date ranges' },
];

// Mock comparison data
const comparisonMetrics = [
  { label: 'Total Leads', current: 1247, compare: 1098, unit: '' },
  { label: 'Qualified', current: 438, compare: 405, unit: '' },
  { label: 'Contact Rate', current: 68.4, compare: 65.2, unit: '%' },
  { label: 'CPL', current: 29.57, compare: 32.14, unit: '$', inverse: true },
  { label: 'ROAS', current: 3.2, compare: 2.8, unit: 'x' },
  { label: 'Conversion', current: 24.7, compare: 22.1, unit: '%' },
];

function getDefaultCompareRange(preset: ComparePreset): { from: Date; to: Date } | null {
  const now = new Date();
  switch (preset) {
    case 'prev_week': return { from: subWeeks(startOfWeek(now), 1), to: subWeeks(endOfWeek(now), 1) };
    case 'prev_month': return { from: startOfMonth(subMonths(now, 1)), to: endOfMonth(subMonths(now, 1)) };
    case 'prev_quarter': return { from: startOfMonth(subMonths(now, 4)), to: endOfMonth(subMonths(now, 1)) };
    case 'same_month_ly': return { from: startOfMonth(subMonths(now, 12)), to: endOfMonth(subMonths(now, 12)) };
    default: return null;
  }
}

interface Props {
  config: CompareConfig;
  onChange: (c: CompareConfig) => void;
}

export function ComparePanel({ config, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [customDate, setCustomDate] = useState<Date | undefined>();

  const selectPreset = (preset: ComparePreset) => {
    const compareRange = getDefaultCompareRange(preset);
    onChange({ ...config, preset, compareRange });
  };

  const isActive = config.preset !== 'none';

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className={cn(isActive && 'border-[var(--primary)] text-[var(--primary)]')}>
            <GitCompareArrows size={16} />
            {isActive ? 'Comparing' : 'Compare'}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[380px] max-h-[70vh] overflow-y-auto bg-[var(--surface)] border-[var(--border)] p-0">
          <div className="p-4 border-b border-[var(--border)]">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Historical Comparison</h3>
            <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Compare current performance against any past period</p>
          </div>

          {/* Current period display */}
          <div className="px-4 pt-3">
            <div className="text-[10px] uppercase tracking-wider font-semibold text-[var(--text-muted)] mb-2">Current Period</div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)]">
              <CalendarIcon size={14} className="text-[var(--primary)]" />
              <span className="text-sm text-[var(--text-primary)]">
                {format(config.currentRange.from, 'MMM d')} – {format(config.currentRange.to, 'MMM d, yyyy')}
              </span>
            </div>
          </div>

          {/* Presets */}
          <div className="p-4 space-y-1.5">
            <div className="text-[10px] uppercase tracking-wider font-semibold text-[var(--text-muted)] mb-2">Compare Against</div>
            {presets.map(p => (
              <button
                key={p.id}
                onClick={() => selectPreset(p.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors',
                  config.preset === p.id
                    ? 'bg-[var(--primary)]/10 border border-[var(--primary)]/30'
                    : 'hover:bg-[var(--surface-hover)] border border-transparent'
                )}
              >
                <div className={cn(
                  'h-4 w-4 rounded-full border-2 flex items-center justify-center',
                  config.preset === p.id ? 'border-[var(--primary)]' : 'border-[var(--border)]'
                )}>
                  {config.preset === p.id && <div className="h-2 w-2 rounded-full bg-[var(--primary)]" />}
                </div>
                <div>
                  <div className="text-sm font-medium text-[var(--text-primary)]">{p.label}</div>
                  <div className="text-[10px] text-[var(--text-muted)]">{p.sub}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Custom date picker */}
          {config.preset === 'custom' && (
            <div className="px-4 pb-4 border-t border-[var(--border)] pt-3">
              <div className="text-[10px] uppercase tracking-wider font-semibold text-[var(--text-muted)] mb-2">Pick Comparison Date Range</div>
              <Calendar
                mode="single"
                selected={customDate}
                onSelect={setCustomDate}
                className={cn("p-3 pointer-events-auto rounded-lg border border-[var(--border)]")}
                disabled={(date) => date > new Date()}
              />
            </div>
          )}

          {/* Compare range display */}
          {config.compareRange && config.preset !== 'none' && (
            <div className="px-4 pb-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)]">
                <CalendarIcon size={14} className="text-[var(--text-muted)]" />
                <span className="text-sm text-[var(--text-secondary)]">
                  {format(config.compareRange.from, 'MMM d')} – {format(config.compareRange.to, 'MMM d, yyyy')}
                </span>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {/* Comparison Results Bar */}
      {isActive && config.compareRange && (
        <ComparisonResultsBar
          currentLabel={`${format(config.currentRange.from, 'MMM d')} – ${format(config.currentRange.to, 'MMM d')}`}
          compareLabel={`${format(config.compareRange.from, 'MMM d')} – ${format(config.compareRange.to, 'MMM d')}`}
        />
      )}
    </>
  );
}

function ComparisonResultsBar({ currentLabel, compareLabel }: { currentLabel: string; compareLabel: string }) {
  return (
    <Card className="overflow-hidden">
      <div className="px-5 py-3 border-b border-[var(--border)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitCompareArrows size={16} className="text-[var(--primary)]" />
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">Period Comparison</h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[var(--primary)]" /> {currentLabel}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[var(--text-muted)]" /> {compareLabel}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-[var(--border)]">
        {comparisonMetrics.map(m => {
          const diff = m.current - m.compare;
          const pctChange = ((diff / m.compare) * 100).toFixed(1);
          const isGood = m.inverse ? diff < 0 : diff > 0;
          const isNeutral = Math.abs(diff) < 0.01;
          return (
            <div key={m.label} className="bg-[var(--surface)] p-4">
              <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-2">{m.label}</div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-lg font-bold text-[var(--text-primary)]">
                  {m.unit === '$' && '$'}{m.current}{m.unit !== '$' && m.unit}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-[var(--text-muted)]">
                  was {m.unit === '$' && '$'}{m.compare}{m.unit !== '$' && m.unit}
                </span>
                <span className={cn(
                  'inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full',
                  isNeutral ? 'bg-[var(--surface-hover)] text-[var(--text-muted)]' : isGood ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'
                )}>
                  {isNeutral ? <Equal size={10} /> : isGood ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                  {pctChange}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export function getDefaultCompareConfig(): CompareConfig {
  const now = new Date();
  return {
    preset: 'none',
    currentRange: { from: startOfMonth(now), to: now },
    compareRange: null,
  };
}