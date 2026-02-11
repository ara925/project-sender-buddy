import { useState } from 'react';
import { AlertTriangle, Clock, ChevronDown, Shield } from 'lucide-react';
import { investigations, severityConfig } from '@/data/mock-investigations';
import { Link } from 'react-router-dom';

export function InvestigationsCard() {
  const [expanded, setExpanded] = useState(false);

  const activeInv = investigations.filter(i => i.status === 'open' || i.status === 'reviewing');
  const confirmedInv = investigations.filter(i => i.status === 'confirmed');
  const hasIssues = activeInv.length > 0 || confirmedInv.length > 0;
  const totalActive = activeInv.length + confirmedInv.length;
  const allInv = [...confirmedInv, ...activeInv];

  return (
    <div className={`rounded-xl border bg-[var(--surface)] overflow-hidden transition-all ${hasIssues ? 'border-red-500/20' : 'border-emerald-500/20'}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[var(--surface-hover)] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${hasIssues ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}>
            <Shield size={16} className={hasIssues ? 'text-red-500' : 'text-emerald-500'} />
          </div>
          <div className="text-left">
            <h2 className="text-sm font-semibold text-[var(--text-primary)] leading-tight">
              {hasIssues ? `${totalActive} Investigation${totalActive > 1 ? 's' : ''} Active` : 'No Investigations'}
            </h2>
            <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
              {activeInv.length} open
              {confirmedInv.length > 0 && <span className="text-red-500"> · {confirmedInv.length} confirmed</span>}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-0.5">
            {allInv.map(inv => (
              <span key={inv.id} className={`h-1.5 w-1.5 rounded-full ${severityConfig[inv.severity].color.replace('text-', 'bg-')}`} />
            ))}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
            <Clock size={10} />
            <span className="hidden sm:inline">Live</span>
          </div>
          <ChevronDown
            size={14}
            className={`text-[var(--text-muted)] transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="border-t border-[var(--border)]">
          {hasIssues ? (
            <div className="flex flex-col gap-1 p-2">
              {allInv.map(inv => {
                const sevConf = severityConfig[inv.severity];
                return (
                  <div key={inv.id} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-[var(--surface-hover)] transition-colors group">
                    <div className={`p-1.5 rounded-full ${sevConf.bg} shrink-0`}>
                      <AlertTriangle size={12} className={sevConf.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-semibold text-[var(--text-primary)]">{inv.leadName}</p>
                        <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-bold ${sevConf.bg} ${sevConf.color}`}>{sevConf.label}</span>
                      </div>
                      <p className="text-[10px] text-[var(--text-secondary)] truncate opacity-80 group-hover:opacity-100 transition-opacity">{inv.flag}</p>
                    </div>
                    <span className="text-[9px] font-medium text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors shrink-0">{inv.agentName}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-3 text-center text-[10px] text-[var(--text-muted)]">No active investigations.</div>
          )}
          <div className="border-t border-[var(--border)] p-2.5 flex justify-center">
            <Link to="/leads" className="text-[10px] font-medium text-[var(--primary)] hover:underline">
              View All Investigations →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
