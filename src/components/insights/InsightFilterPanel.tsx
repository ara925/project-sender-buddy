import { useState } from 'react';
import { Filter, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover, PopoverContent, PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SOURCES = ['Google Ads', 'Intaker', 'CallRail', 'Forms', 'Organic', 'Social Media', 'Referrals', 'Direct', 'Manual'];
const CASE_TYPES = ['Personal Injury', 'Auto Accident', 'Truck Accident', 'Motorcycle', 'Workers Comp', 'Employment Law', 'Slip & Fall', 'Other'];
const STATUSES = ['New', 'Contacted', 'Qualified', 'Retained', 'Disqualified', 'Lost'];
const AGENTS = ['Maria Santos', 'James Rodriguez', 'Ashley Kim', 'David Chen', 'Rachel Martinez', 'Kevin Park', 'Sarah Johnson', 'Michael Brown', 'Lisa Nguyen', 'Chris Taylor', 'Amanda White', 'Brian Lopez'];
const CAMPAIGNS = ['PI - Los Angeles', 'PI - Orange County', 'Auto Accident - Brand', 'Workers Comp', 'Employment Law', 'Remarketing'];

export interface InsightFilters {
  sources: string[];
  caseTypes: string[];
  statuses: string[];
  agents: string[];
  campaigns: string[];
  minQuality: number | null;
  costRange: [number, number] | null;
}

const emptyFilters: InsightFilters = {
  sources: [], caseTypes: [], statuses: [], agents: [], campaigns: [],
  minQuality: null, costRange: null,
};

interface Props {
  filters: InsightFilters;
  onChange: (f: InsightFilters) => void;
}

const MultiSelect = ({ label, options, selected, onToggle }: { label: string; options: string[]; selected: string[]; onToggle: (v: string) => void }) => (
  <div className="space-y-2">
    <div className="text-[10px] uppercase tracking-wider font-semibold text-[var(--text-muted)]">{label}</div>
    <div className="flex flex-wrap gap-1.5">
      {options.map(opt => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
            className={cn(
              'inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors',
              active
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:bg-[var(--surface-hover)]'
            )}
          >
            {active && <Check size={10} />}
            {opt}
          </button>
        );
      })}
    </div>
  </div>
);

export function InsightFilterPanel({ filters, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState<InsightFilters>(filters);

  const activeCount = [
    local.sources.length, local.caseTypes.length, local.statuses.length,
    local.agents.length, local.campaigns.length,
    local.minQuality ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const toggle = (key: keyof InsightFilters, val: string) => {
    const arr = local[key] as string[];
    const next = arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];
    setLocal({ ...local, [key]: next });
  };

  const apply = () => { onChange(local); setOpen(false); };
  const clear = () => { const cleared = { ...emptyFilters }; setLocal(cleared); onChange(cleared); };

  return (
    <Popover open={open} onOpenChange={(o) => { setOpen(o); if (o) setLocal(filters); }}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Filter size={16} /> Filter
          {activeCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-[var(--primary)] text-white border-0">
              {activeCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[420px] max-h-[70vh] overflow-y-auto bg-[var(--surface)] border-[var(--border)] p-0">
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">Drill-Down Filters</h3>
          <div className="flex items-center gap-2">
            {activeCount > 0 && (
              <button onClick={clear} className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-1">
                <X size={12} /> Clear all
              </button>
            )}
          </div>
        </div>
        <div className="p-4 space-y-5">
          <MultiSelect label="Lead Source" options={SOURCES} selected={local.sources} onToggle={(v) => toggle('sources', v)} />
          <MultiSelect label="Case Type" options={CASE_TYPES} selected={local.caseTypes} onToggle={(v) => toggle('caseTypes', v)} />
          <MultiSelect label="Lead Status" options={STATUSES} selected={local.statuses} onToggle={(v) => toggle('statuses', v)} />
          <MultiSelect label="Intake Agent" options={AGENTS} selected={local.agents} onToggle={(v) => toggle('agents', v)} />
          <MultiSelect label="Ad Campaign" options={CAMPAIGNS} selected={local.campaigns} onToggle={(v) => toggle('campaigns', v)} />

          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-wider font-semibold text-[var(--text-muted)]">Min Quality Score</div>
            <div className="flex gap-2">
              {[7, 8, 9].map(q => (
                <button
                  key={q}
                  onClick={() => setLocal({ ...local, minQuality: local.minQuality === q ? null : q })}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors',
                    local.minQuality === q
                      ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                      : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:bg-[var(--surface-hover)]'
                  )}
                >
                  ≥ {q}.0
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-[var(--border)] flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
          <Button size="sm" onClick={apply} className="bg-[var(--primary)] text-white hover:opacity-90">
            Apply Filters {activeCount > 0 && `(${activeCount})`}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { emptyFilters };