import { useState } from 'react';
import { Shield, ChevronDown, ChevronRight, AlertTriangle, CheckCircle2, Eye, Sparkles, ExternalLink, User } from 'lucide-react';
import { investigations, severityConfig, investigationStatusConfig, type Investigation } from '@/data/mock-investigations';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

export function InvestigationPanel() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'open' | 'reviewing' | 'cleared' | 'confirmed'>('all');

  const filtered = investigations.filter(inv => filter === 'all' || inv.status === filter);
  const openCount = investigations.filter(i => i.status === 'open' || i.status === 'reviewing').length;
  const confirmedCount = investigations.filter(i => i.status === 'confirmed').length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-red-500/10">
            <Shield size={18} className="text-red-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">Lead Investigations</h2>
            <p className="text-xs text-[var(--text-secondary)]">
              AI-flagged suspicious activity · {openCount} active · {confirmedCount} confirmed
            </p>
          </div>
        </div>
        <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white gap-1.5">
          <Shield size={14} />
          New Investigation
        </Button>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-1.5 flex-wrap">
        {(['all', 'open', 'reviewing', 'confirmed', 'cleared'] as const).map(f => {
          const count = f === 'all' ? investigations.length : investigations.filter(i => i.status === f).length;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border capitalize ${
                filter === f
                  ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                  : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:bg-[var(--surface-hover)]'
              }`}
            >
              {f === 'all' ? 'All' : investigationStatusConfig[f].label} ({count})
            </button>
          );
        })}
      </div>

      {/* Investigation Cards */}
      <div className="space-y-3">
        {filtered.map(inv => {
          const sevConfig = severityConfig[inv.severity];
          const statusConf = investigationStatusConfig[inv.status];
          const isExpanded = expandedId === inv.id;

          return (
            <div
              key={inv.id}
              className={`card border overflow-hidden transition-colors ${
                inv.status === 'confirmed' ? 'border-red-500/30' :
                inv.status === 'open' ? 'border-orange-500/20' :
                'border-[var(--border)]'
              }`}
            >
              {/* Row */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : inv.id)}
                className="w-full p-4 flex items-center gap-3 hover:bg-[var(--surface-hover)] transition-colors text-left cursor-pointer"
              >
                <div className={`p-1.5 rounded-lg ${sevConfig.bg}`}>
                  <AlertTriangle size={14} className={sevConfig.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{inv.flag}</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${sevConfig.bg} ${sevConfig.color} border ${sevConfig.border}`}>
                      {sevConfig.label}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusConf.bg} ${statusConf.color}`}>
                      {statusConf.label}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    <span className="font-medium">{inv.leadName}</span> · Agent: {inv.agentName} · {formatDate(inv.flaggedAt)}
                  </p>
                </div>
                {isExpanded ? <ChevronDown size={16} className="text-[var(--text-muted)]" /> : <ChevronRight size={16} className="text-[var(--text-muted)]" />}
              </button>

              {/* Expanded Detail */}
              {isExpanded && (
                <div className="border-t border-[var(--border)] p-4 space-y-4 animate-in fade-in duration-200">

                  {/* Details */}
                  <div className="p-3 rounded-lg bg-[var(--surface-hover)]">
                    <p className="text-xs font-medium text-[var(--text-primary)] mb-1">Investigation Details</p>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{inv.details}</p>
                  </div>

                  {/* Indicators */}
                  <div>
                    <p className="text-xs font-medium text-[var(--text-primary)] mb-2">Risk Indicators</p>
                    <div className="flex flex-wrap gap-1.5">
                      {inv.indicators.map(ind => (
                        <span key={ind} className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-red-500/10 text-red-500 border border-red-500/20">
                          <AlertTriangle size={9} />
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t border-[var(--border)]">
                    <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                      <Eye size={12} />
                      View Lead
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                      <User size={12} />
                      View Agent
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                      <ExternalLink size={12} />
                      Full Report
                    </Button>
                    {(inv.status === 'open' || inv.status === 'reviewing') && (
                      <Button size="sm" className="gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white ml-auto">
                        <CheckCircle2 size={12} />
                        Mark Cleared
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
