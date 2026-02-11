import { TrendingUp, TrendingDown, Users, UserCheck, UserX, AlertTriangle, Clock, Sparkles, Search, Gauge } from 'lucide-react';

interface OverviewProps {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  retainedLeads: number;
  lostLeads: number;
  openInvestigations: number;
}

export function LeadsOverview({ totalLeads, newLeads, qualifiedLeads, retainedLeads, lostLeads, openInvestigations }: OverviewProps) {
  const conversionRate = totalLeads > 0 ? Math.round((retainedLeads / totalLeads) * 100) : 0;
  const lossRate = totalLeads > 0 ? Math.round((lostLeads / totalLeads) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* AI Summary Banner */}
      <div className="card p-4 border border-[var(--primary)]/20 bg-[var(--primary)]/5">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-[var(--primary)]/10">
            <Sparkles size={18} className="text-[var(--primary)]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">AI Lead Intelligence</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              <span className="font-medium text-[var(--text-primary)]">3 leads are trending high-value</span> based on case type and engagement signals.
              Loss rate spiked <span className="text-red-500 font-medium">12% this week</span> — concentrated in PI cases handled by 2 agents.
              {openInvestigations > 0 && (
                <span className="text-red-500 font-medium"> {openInvestigations} active investigation{openInvestigations !== 1 ? 's' : ''} flagged for potential lead theft.</span>
              )}
              {' '}Recommend immediate review of after-hours CRM access logs.
            </p>
          </div>
        </div>
      </div>

      {/* Lead Pacing / Search Volume Strip */}
      <div className="bg-[var(--surface)] border-t-4 border-blue-500">
        <div className="px-5 py-3 border-b border-[var(--border)] flex items-center justify-between bg-[var(--surface-active)]/20">
          <h3 className="font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
            <Gauge size={14} className="text-blue-500" />
            Lead Pacing
          </h3>
          <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Today vs Target</span>
        </div>
        <div className="px-5 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Volume Today', value: '842', sub: '+12% vs avg', color: 'text-blue-500' },
              { label: 'Pacing', value: '104%', sub: 'On Track', color: 'text-emerald-500' },
              { label: 'Projected EOD', value: '1,250', sub: 'Above Target', color: 'text-emerald-500' },
              { label: 'Search Volume', value: '24.8K', sub: '+5% trend', color: 'text-blue-500' },
            ].map(m => (
              <div key={m.label} className="text-center">
                <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold mb-1">{m.label}</p>
                <p className="text-2xl font-bold text-[var(--text-primary)]">{m.value}</p>
                <p className={`text-xs font-mono mt-0.5 ${m.color}`}>{m.sub}</p>
              </div>
            ))}
          </div>
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-[10px] text-[var(--text-muted)] mb-1">
              <span>Daily Target Progress</span>
              <span className="font-mono text-[var(--text-primary)]">842 / 810</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[var(--surface-active)] overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all" style={{ width: '104%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Leads', value: totalLeads, icon: Users, accent: 'border-blue-500', text: 'text-blue-500', trend: '+8%', trendUp: true },
          { label: 'New Today', value: newLeads, icon: Clock, accent: 'border-indigo-500', text: 'text-indigo-500', trend: '+3', trendUp: true },
          { label: 'Qualified', value: qualifiedLeads, icon: UserCheck, accent: 'border-emerald-500', text: 'text-emerald-500', trend: '+15%', trendUp: true },
          { label: 'Retained', value: retainedLeads, icon: UserCheck, accent: 'border-emerald-600', text: 'text-emerald-600', trend: `${conversionRate}%`, trendUp: conversionRate > 20 },
          { label: 'Lost', value: lostLeads, icon: UserX, accent: 'border-red-500', text: 'text-red-500', trend: `${lossRate}%`, trendUp: false },
          { label: 'Investigations', value: openInvestigations, icon: AlertTriangle, accent: 'border-amber-500', text: openInvestigations > 0 ? 'text-amber-500' : 'text-emerald-500', trend: openInvestigations > 0 ? 'Active' : 'None', trendUp: false },
        ].map(kpi => (
          <div key={kpi.label} className={`bg-[var(--surface)] p-5 border-l-4 ${kpi.accent} hover:bg-[var(--surface-hover)] transition-colors`}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-semibold">{kpi.label}</p>
              <kpi.icon size={14} className={kpi.text} />
            </div>
            <p className="text-3xl font-bold text-[var(--text-primary)]">{kpi.value}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className={`text-[10px] font-mono ${kpi.trendUp ? 'text-emerald-500' : 'text-red-500'}`}>{kpi.trend}</span>
              <span className="text-[10px] text-[var(--text-muted)]">vs last wk</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
