import { CheckCircle2, AlertTriangle, XCircle, Activity, Clock, ArrowUpRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export type StatusType = 'operational' | 'degraded' | 'down';

export interface SystemStatus {
  name: string;
  status: StatusType;
  message: string;
  uptime: string;
  lastChecked: string;
}

export const statusConfig = {
  operational: { icon: CheckCircle2, label: 'Operational', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
  degraded: { icon: AlertTriangle, label: 'Degraded', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-500' },
  down: { icon: XCircle, label: 'Down', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', dot: 'bg-red-500' },
};

interface Props {
  statuses: SystemStatus[];
  icon: React.ElementType;
  title: { ok: string; issue: (count: number) => string };
  countLabel: { ok: string; issue?: string };
}

export function StatusCard({ statuses, icon: Icon, title, countLabel }: Props) {
  const [expanded, setExpanded] = useState(false);

  const operational = statuses.filter(s => s.status === 'operational').length;
  const degraded = statuses.filter(s => s.status === 'degraded').length;
  const down = statuses.filter(s => s.status === 'down').length;
  const allOk = degraded === 0 && down === 0;
  const issueCount = degraded + down;

  return (
    <div className={`rounded-xl border bg-[var(--surface)] overflow-hidden transition-all ${allOk ? 'border-emerald-500/20' : 'border-amber-500/20'}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[var(--surface-hover)] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${allOk ? 'bg-emerald-500/10' : 'bg-amber-500/10'}`}>
            <Icon size={16} className={allOk ? 'text-emerald-500' : 'text-amber-500'} />
          </div>
          <div className="text-left">
            <h2 className="text-sm font-semibold text-[var(--text-primary)] leading-tight">
              {allOk ? title.ok : title.issue(issueCount)}
            </h2>
            <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
              {operational}/{statuses.length} {countLabel.ok}
              {degraded > 0 && <span className="text-amber-500"> · {degraded} degraded</span>}
              {down > 0 && <span className="text-red-500"> · {down} down</span>}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-0.5">
            {statuses.map((s) => (
              <span key={s.name} className={`h-1.5 w-1.5 rounded-full ${statusConfig[s.status].dot}`} />
            ))}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
            <Clock size={10} />
            <span className="hidden sm:inline">Just now</span>
          </div>
          <ChevronDown
            size={14}
            className={`text-[var(--text-muted)] transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="border-t border-[var(--border)]">
          <div className="flex flex-col gap-1 p-2">
            {statuses.map((system) => {
              const config = statusConfig[system.status];
              const StatusIcon = config.icon;
              return (
                <div key={system.name} className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[var(--surface-hover)] transition-colors group">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <StatusIcon size={14} className={`${config.color} opacity-80`} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-medium text-[var(--text-primary)]">{system.name}</p>
                        <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
                      </div>
                      <p className="text-[10px] text-[var(--text-secondary)] mt-0.5 truncate opacity-80 group-hover:opacity-100 transition-opacity">{system.message}</p>
                    </div>
                  </div>
                  <div className="text-right ml-3 shrink-0">
                    <div className="flex items-center gap-1 text-[10px] font-medium text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                      <ArrowUpRight size={10} className="text-emerald-500" />
                      {system.uptime}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
