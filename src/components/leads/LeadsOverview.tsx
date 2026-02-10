import { TrendingUp, TrendingDown, Users, UserCheck, UserX, AlertTriangle, Clock, Sparkles } from 'lucide-react';

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

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Total Leads', value: totalLeads, icon: Users, accent: 'text-[var(--primary)]', trend: '+8%', trendUp: true },
          { label: 'New Today', value: newLeads, icon: Clock, accent: 'text-blue-500', trend: '+3', trendUp: true },
          { label: 'Qualified', value: qualifiedLeads, icon: UserCheck, accent: 'text-emerald-500', trend: '+15%', trendUp: true },
          { label: 'Retained', value: retainedLeads, icon: UserCheck, accent: 'text-emerald-600', trend: `${conversionRate}%`, trendUp: conversionRate > 20 },
          { label: 'Lost', value: lostLeads, icon: UserX, accent: 'text-red-500', trend: `${lossRate}%`, trendUp: false },
          { label: 'Investigations', value: openInvestigations, icon: AlertTriangle, accent: openInvestigations > 0 ? 'text-red-500' : 'text-emerald-500', trend: openInvestigations > 0 ? 'Active' : 'None', trendUp: false },
        ].map(kpi => (
          <div key={kpi.label} className="card p-3 border border-[var(--border)]">
            <div className="flex items-center justify-between mb-2">
              <kpi.icon size={14} className={kpi.accent} />
              {kpi.trendUp ? (
                <TrendingUp size={12} className="text-emerald-500" />
              ) : (
                <TrendingDown size={12} className="text-red-500" />
              )}
            </div>
            <p className="text-xl font-bold text-[var(--text-primary)]">{kpi.value}</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] text-[var(--text-muted)]">{kpi.label}</span>
              <span className={`text-[10px] font-medium ${kpi.trendUp ? 'text-emerald-500' : 'text-red-500'}`}>{kpi.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
