import { useState } from 'react';
import { Columns3, Check, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover, PopoverContent, PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

export interface ColumnVisibility {
  volume: boolean;
  trend: boolean;
  velocity: boolean;
  spend: boolean;
  cpl: boolean;
  roas: boolean;
  quality: boolean;
  comparison: boolean;
}

export const defaultColumns: ColumnVisibility = {
  volume: true, trend: true, velocity: true, spend: true, cpl: true, roas: true, quality: true, comparison: false,
};

const columnLabels: Record<keyof ColumnVisibility, string> = {
  volume: 'Volume', trend: 'Trend (WoW)', velocity: 'Velocity', spend: 'Spend',
  cpl: 'Cost per Lead', roas: 'ROAS', quality: 'Quality Score', comparison: 'Historical Compare',
};

interface Props {
  columns: ColumnVisibility;
  onChange: (c: ColumnVisibility) => void;
}

export function ColumnTogglePanel({ columns, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const toggle = (key: keyof ColumnVisibility) => {
    onChange({ ...columns, [key]: !columns[key] });
  };

  const activeCount = Object.values(columns).filter(Boolean).length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="hidden sm:inline-flex">
          <Columns3 size={16} /> Columns
          <span className="ml-1 text-[10px] text-[var(--text-muted)]">({activeCount}/{Object.keys(columns).length})</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[280px] bg-[var(--surface)] border-[var(--border)] p-0">
        <div className="p-3 border-b border-[var(--border)]">
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">Toggle Columns</h3>
          <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Show or hide data columns in the matrix</p>
        </div>
        <div className="p-2 space-y-0.5">
          {(Object.keys(columnLabels) as (keyof ColumnVisibility)[]).map(key => (
            <button
              key={key}
              onClick={() => toggle(key)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-[var(--surface-hover)] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                {columns[key] ? (
                  <Eye size={14} className="text-[var(--primary)]" />
                ) : (
                  <EyeOff size={14} className="text-[var(--text-muted)]" />
                )}
                <span className={cn('font-medium', columns[key] ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]')}>
                  {columnLabels[key]}
                </span>
              </div>
              {columns[key] && <Check size={14} className="text-[var(--primary)]" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}