import { AlertTriangle, Clock, User, TrendingDown, ArrowRight, XCircle, AlertCircle, BarChart3 } from 'lucide-react';

interface LeadIssue {
  id: string;
  name: string;
  source: string;
  issue: string;
  issueType: 'stale' | 'routing' | 'duplicate';
  daysSinceContact: number;
  assignedTo: string;
  value: string;
}

interface StaffIssue {
  id: string;
  name: string;
  role: string;
  conversionRate: number;
  avgConversion: number;
  leadsAssigned: number;
  leadsConverted: number;
  flagReason: string;
}

const leadIssues: LeadIssue[] = [
  { id: 'L-1042', name: 'Maria Gonzalez', source: 'Google Ads', issue: 'No outreach in 72 hours — lead going cold', issueType: 'stale', daysSinceContact: 3, assignedTo: 'James Wilson', value: '$45,000' },
  { id: 'L-1038', name: 'Robert Chen', source: 'Intaker', issue: 'No outreach in 56 hours', issueType: 'stale', daysSinceContact: 2, assignedTo: 'Sarah Kim', value: '$120,000' },
  { id: 'L-1035', name: 'Angela Davis', source: 'CallRail', issue: 'Lead assigned to wrong practice area — needs rerouting', issueType: 'routing', daysSinceContact: 1, assignedTo: 'Unassigned', value: '$85,000' },
  { id: 'L-1029', name: 'Tom Nakamura', source: 'Web Form', issue: 'Duplicate entry — data split across two records', issueType: 'duplicate', daysSinceContact: 4, assignedTo: 'James Wilson', value: '$60,000' },
  { id: 'L-1044', name: 'Priya Sharma', source: 'Regal AI', issue: 'AI handoff failed — no human follow-up logged', issueType: 'routing', daysSinceContact: 1, assignedTo: 'David Park', value: '$95,000' },
  { id: 'L-1047', name: 'Kevin O\'Brien', source: 'Google Ads', issue: 'No response to 3 callback attempts', issueType: 'stale', daysSinceContact: 5, assignedTo: 'Sarah Kim', value: '$35,000' },
];

const staffIssues: StaffIssue[] = [
  { id: 'S-01', name: 'James Wilson', role: 'Senior Intake Specialist', conversionRate: 12, avgConversion: 34, leadsAssigned: 42, leadsConverted: 5, flagReason: 'Conversion rate 65% below team average' },
  { id: 'S-02', name: 'Lisa Torres', role: 'Intake Specialist', conversionRate: 18, avgConversion: 34, leadsAssigned: 28, leadsConverted: 5, flagReason: 'Consistent decline over 3 weeks' },
  { id: 'S-03', name: 'David Park', role: 'Junior Intake', conversionRate: 22, avgConversion: 34, leadsAssigned: 36, leadsConverted: 8, flagReason: 'High lead volume, low close rate — possible training gap' },
];

const issueTypeConfig = {
  stale: { label: 'Stale', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  routing: { label: 'Routing', color: 'text-red-500', bg: 'bg-red-500/10' },
  duplicate: { label: 'Duplicate', color: 'text-blue-500', bg: 'bg-blue-500/10' },
};

export function LeadsInvestigationTab() {
  const staleCount = leadIssues.filter(l => l.issueType === 'stale').length;
  const routingCount = leadIssues.filter(l => l.issueType === 'routing').length;

  return (
    <div className="space-y-8">

      {/* Section 1: Leads with Issues */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">Leads with Issues</h3>
            <span className="text-[10px] font-mono bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full font-bold">{leadIssues.length} flagged</span>
          </div>
          <div className="flex gap-3 text-[10px] font-mono text-[var(--text-muted)]">
            <span>{staleCount} stale</span>
            <span>·</span>
            <span>{routingCount} routing</span>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
          <div className="divide-y divide-[var(--border)]">
            {leadIssues.map((lead) => {
              const typeConfig = issueTypeConfig[lead.issueType];
              return (
                <div key={lead.id} className="p-4 hover:bg-[var(--surface-hover)] transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">{lead.id}</span>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${typeConfig.bg} ${typeConfig.color}`}>
                          {typeConfig.label}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)]">via {lead.source}</span>
                      </div>
                      <p className="text-sm font-bold text-[var(--text-primary)]">{lead.name}</p>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">{lead.issue}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-[var(--text-primary)]">{lead.value}</p>
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-[var(--text-muted)]">
                        <User size={10} />
                        <span>{lead.assignedTo}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5 text-[10px]">
                        <Clock size={10} className={lead.daysSinceContact >= 3 ? 'text-red-500' : 'text-amber-500'} />
                        <span className={lead.daysSinceContact >= 3 ? 'text-red-500 font-bold' : 'text-amber-500'}>
                          {lead.daysSinceContact}d no contact
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section 2: Staff with Issues */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown size={16} className="text-red-500" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">Staff — High Failure Rates</h3>
          <span className="text-[10px] font-mono bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full font-bold">{staffIssues.length} flagged</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {staffIssues.map((staff) => (
            <div key={staff.id} className="rounded-xl border border-red-500/20 bg-[var(--surface)] p-4 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <User size={18} className="text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--text-primary)]">{staff.name}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">{staff.role}</p>
                </div>
              </div>

              {/* Conversion comparison */}
              <div className="p-3 rounded-lg bg-[var(--surface-hover)] mb-3">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <p className="text-[9px] font-bold uppercase text-[var(--text-muted)]">Conversion Rate</p>
                    <p className="text-2xl font-bold text-red-500">{staff.conversionRate}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-bold uppercase text-[var(--text-muted)]">Team Avg</p>
                    <p className="text-lg font-bold text-[var(--text-secondary)]">{staff.avgConversion}%</p>
                  </div>
                </div>
                {/* Visual bar */}
                <div className="h-2 rounded-full bg-[var(--surface-active)] overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${(staff.conversionRate / staff.avgConversion) * 100}%` }} />
                </div>
              </div>

              <div className="flex justify-between text-xs text-[var(--text-muted)] mb-3">
                <span>{staff.leadsAssigned} assigned</span>
                <span>{staff.leadsConverted} converted</span>
              </div>

              <div className="pt-3 border-t border-[var(--border)]">
                <div className="flex items-start gap-2">
                  <AlertCircle size={12} className="text-red-500 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-[var(--text-secondary)]">{staff.flagReason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
