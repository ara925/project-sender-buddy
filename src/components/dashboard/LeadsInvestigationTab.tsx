import { useState, useEffect } from 'react';
import { AlertTriangle, Clock, User, TrendingDown, XCircle, AlertCircle, Phone, Mail, MessageSquare, FileText, ArrowRight, Calendar, MapPin, Loader2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { formatPhone, formatDate } from '@/lib/utils';

interface LeadIssue {
  id: string;
  name: string;
  source: string;
  issue: string;
  issueType: 'stale' | 'routing' | 'duplicate';
  daysSinceContact: number;
  assignedTo: string;
  value: string;
  phone: string;
  email: string;
  caseType: string;
  intakeDate: string;
  rootCause: string;
  timeline: { time: string; event: string; type: 'info' | 'warning' | 'error'; source: string }[];
  recommendation: string;
  riskLevel: 'high' | 'medium' | 'low';
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
  recentLeads: { name: string; outcome: 'converted' | 'lost' | 'pending'; reason: string; daysAgo: number }[];
  weeklyTrend: { week: string; rate: number }[];
  analysis: string;
  recommendation: string;
}

// Staff issues remain mock for now (no real staff performance data yet)
const staffIssues: StaffIssue[] = [
  {
    id: 'S-01', name: 'James Wilson', role: 'Senior Intake Specialist', conversionRate: 12, avgConversion: 34,
    leadsAssigned: 42, leadsConverted: 5, flagReason: 'Conversion rate 65% below team average',
    recentLeads: [
      { name: 'Maria Gonzalez', outcome: 'pending', reason: 'No outreach — 72 hours stale', daysAgo: 3 },
      { name: 'Tom Nakamura', outcome: 'pending', reason: 'Duplicate record confusion', daysAgo: 4 },
      { name: 'David Lee', outcome: 'lost', reason: 'Client hired competitor — 48hr response delay', daysAgo: 6 },
      { name: 'Sarah Johnson', outcome: 'lost', reason: 'Failed to return 2 callback requests', daysAgo: 8 },
      { name: 'Michael Brown', outcome: 'converted', reason: 'Signed retainer after 2nd call', daysAgo: 10 },
    ],
    weeklyTrend: [
      { week: 'W1', rate: 28 }, { week: 'W2', rate: 22 }, { week: 'W3', rate: 18 }, { week: 'W4', rate: 12 },
    ],
    analysis: 'James has been on a consistent 4-week decline from 28% to 12% conversion. His lead volume (42 active) is 68% above the recommended capacity of 25. He\'s not triaging effectively — high-value leads are getting the same response time as low-value ones.',
    recommendation: 'Immediately reduce his active queue to 25 leads by redistributing 17 leads to other agents. Implement a priority scoring system so high-value leads get same-day response.',
  },
  {
    id: 'S-02', name: 'Lisa Torres', role: 'Intake Specialist', conversionRate: 18, avgConversion: 34,
    leadsAssigned: 28, leadsConverted: 5, flagReason: 'Consistent decline over 3 weeks',
    recentLeads: [
      { name: 'Jennifer Adams', outcome: 'lost', reason: 'Lead wanted Spanish-speaking attorney', daysAgo: 2 },
      { name: 'Robert Martinez', outcome: 'lost', reason: 'Intake call too scripted', daysAgo: 5 },
      { name: 'Amy Chen', outcome: 'converted', reason: 'Good rapport, quick retainer signing', daysAgo: 7 },
      { name: 'Carlos Reyes', outcome: 'lost', reason: 'Competitor offered free consultation', daysAgo: 9 },
    ],
    weeklyTrend: [
      { week: 'W1', rate: 32 }, { week: 'W2', rate: 26 }, { week: 'W3', rate: 20 }, { week: 'W4', rate: 18 },
    ],
    analysis: 'Lisa\'s decline correlates with a shift in her lead sources — she\'s receiving more Spanish-preferred leads that she can\'t fully service.',
    recommendation: 'Reroute Spanish-preferred leads to bilingual agents. Provide conversational intake training to reduce script dependency.',
  },
  {
    id: 'S-03', name: 'David Park', role: 'Junior Intake', conversionRate: 22, avgConversion: 34,
    leadsAssigned: 36, leadsConverted: 8, flagReason: 'High lead volume, low close rate — possible training gap',
    recentLeads: [
      { name: 'Priya Sharma', outcome: 'pending', reason: 'AI handoff failed — no follow-up yet', daysAgo: 1 },
      { name: 'Mark Thompson', outcome: 'lost', reason: 'Didn\'t explain retainer structure clearly', daysAgo: 3 },
      { name: 'Susan Wright', outcome: 'converted', reason: 'Employment case — strong pitch', daysAgo: 4 },
      { name: 'James Garcia', outcome: 'lost', reason: 'Lead had unrealistic expectations', daysAgo: 6 },
    ],
    weeklyTrend: [
      { week: 'W1', rate: 20 }, { week: 'W2', rate: 24 }, { week: 'W3', rate: 21 }, { week: 'W4', rate: 22 },
    ],
    analysis: 'David is a junior agent with stable but below-average conversion. His trend shows no decline — he\'s consistently around 21-24%, which suggests a skill plateau rather than a behavioral issue.',
    recommendation: 'Enroll in advanced objection handling workshop. Pair with a senior mentor for 2 weeks. Reduce lead volume to 20 until conversion improves above 28%.',
  },
];

const issueTypeConfig = {
  stale: { label: 'Stale', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  routing: { label: 'Routing', color: 'text-red-500', bg: 'bg-red-500/10' },
  duplicate: { label: 'Duplicate', color: 'text-blue-500', bg: 'bg-blue-500/10' },
};

const riskConfig = {
  high: { label: 'High Risk', color: 'text-red-500', bg: 'bg-red-500/10' },
  medium: { label: 'Medium Risk', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  low: { label: 'Low Risk', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
};

const outcomeConfig = {
  converted: { color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'Converted' },
  lost: { color: 'text-red-500', bg: 'bg-red-500/10', label: 'Lost' },
  pending: { color: 'text-amber-500', bg: 'bg-amber-500/10', label: 'Pending' },
};

type DrawerContent = { type: 'lead'; data: LeadIssue } | { type: 'staff'; data: StaffIssue } | null;

export function LeadsInvestigationTab() {
  const [drawer, setDrawer] = useState<DrawerContent>(null);
  const [leadIssues, setLeadIssues] = useState<LeadIssue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeadIssues() {
      setLoading(true);

      // Fetch all leads with status 'new'
      const { data: leads, error: leadsErr } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (leadsErr || !leads) {
        setLoading(false);
        return;
      }

      // Fetch activities for these leads
      const leadIds = leads.map((l: any) => l.id);
      const { data: activities } = await supabase
        .from('lead_activities')
        .select('*')
        .in('lead_id', leadIds)
        .order('created_at', { ascending: false });

      const activitiesByLead: Record<string, any[]> = {};
      (activities || []).forEach((a: any) => {
        if (!activitiesByLead[a.lead_id]) activitiesByLead[a.lead_id] = [];
        activitiesByLead[a.lead_id].push(a);
      });

      const issues: LeadIssue[] = [];

      for (const lead of leads as any[]) {
        const leadActivities = activitiesByLead[lead.id] || [];
        const daysSinceCreation = Math.floor((Date.now() - new Date(lead.created_at).getTime()) / (1000 * 60 * 60 * 24));
        
        // Check for stale leads: status is still 'new' and no human follow-up activities
        const hasHumanFollowUp = leadActivities.some((a: any) => 
          ['call_outbound', 'email_sent', 'sms_sent', 'assigned', 'status_change'].includes(a.type)
        );

        if (lead.status === 'new' && !hasHumanFollowUp && daysSinceCreation >= 0) {
          const hoursStale = Math.floor((Date.now() - new Date(lead.created_at).getTime()) / (1000 * 60 * 60));
          
          let riskLevel: 'high' | 'medium' | 'low' = 'low';
          if (hoursStale >= 48) riskLevel = 'high';
          else if (hoursStale >= 12) riskLevel = 'medium';

          const timeline: LeadIssue['timeline'] = [];
          
          // Add creation event
          timeline.push({
            time: formatDate(lead.created_at),
            event: `Lead captured via ${lead.source === 'callrail' ? 'CallRail call' : lead.source}`,
            type: 'info',
            source: lead.source === 'callrail' ? 'CallRail' : lead.source,
          });

          // Add activity events
          leadActivities.forEach((a: any) => {
            timeline.push({
              time: formatDate(a.created_at),
              event: a.title + (a.description ? ` — ${a.description.slice(0, 80)}...` : ''),
              type: a.type.includes('missed') ? 'error' : 'info',
              source: a.platform,
            });
          });

          // Add stale warning
          if (hoursStale >= 1) {
            timeline.push({
              time: 'Now',
              event: `No human follow-up after ${hoursStale >= 24 ? `${daysSinceCreation}+ days` : `${hoursStale} hours`}`,
              type: hoursStale >= 24 ? 'error' : 'warning',
              source: 'System',
            });
          }

          issues.push({
            id: lead.id.slice(0, 8).toUpperCase(),
            name: `${lead.first_name} ${lead.last_name}`,
            source: lead.source === 'callrail' ? 'CallRail' : lead.source,
            issue: hoursStale >= 24
              ? `No outreach in ${daysSinceCreation} day${daysSinceCreation !== 1 ? 's' : ''} — lead going cold`
              : `No outreach in ${hoursStale} hours`,
            issueType: 'stale',
            daysSinceContact: daysSinceCreation,
            assignedTo: lead.assigned_to || 'Unassigned',
            value: lead.case_type || 'Unknown',
            phone: lead.phone ? formatPhone(lead.phone) : 'N/A',
            email: lead.email || 'N/A',
            caseType: lead.case_type || 'Not classified',
            intakeDate: formatDate(lead.created_at),
            rootCause: lead.assigned_to
              ? `Lead was assigned but no follow-up actions have been recorded. The assigned agent may be overloaded or missed the notification.`
              : `Lead was auto-created from ${lead.source} but was never assigned to an agent. No follow-up has occurred.`,
            timeline,
            recommendation: lead.assigned_to
              ? 'Check agent workload and send immediate reminder. If no response in 1 hour, reassign to available agent.'
              : 'Assign to an available intake specialist immediately. Send automated outreach (text + email) with callback scheduling link.',
            riskLevel,
          });
        }
      }

      // Sort by risk: high first, then by days stale
      issues.sort((a, b) => {
        const riskOrder = { high: 0, medium: 1, low: 2 };
        if (riskOrder[a.riskLevel] !== riskOrder[b.riskLevel]) return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
        return b.daysSinceContact - a.daysSinceContact;
      });

      setLeadIssues(issues);
      setLoading(false);
    }

    fetchLeadIssues();
  }, []);

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
            {loading ? (
              <Loader2 size={14} className="animate-spin text-[var(--text-muted)]" />
            ) : (
              <span className="text-[10px] font-mono bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full font-bold">{leadIssues.length} flagged</span>
            )}
          </div>
          <div className="flex gap-3 text-[10px] font-mono text-[var(--text-muted)]">
            <span>{staleCount} stale</span>
            <span>·</span>
            <span>{routingCount} routing</span>
          </div>
        </div>

        {/* Live data badge */}
        <div className="flex items-center gap-2 px-3 py-2 mb-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-500 font-bold">LIVE DATA</span>
          <span className="text-[var(--text-muted)]">·</span>
          <span className="text-[var(--text-secondary)]">Issues computed from real leads & activities</span>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12 gap-2 text-[var(--text-muted)]">
              <Loader2 size={18} className="animate-spin" />
              <span className="text-sm">Analyzing leads...</span>
            </div>
          ) : leadIssues.length === 0 ? (
            <div className="text-center py-12 text-[var(--text-muted)] text-sm">
              No lead issues detected — all leads have been followed up. ✅
            </div>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {leadIssues.map((lead) => {
                const typeConfig = issueTypeConfig[lead.issueType];
                return (
                  <div
                    key={lead.id}
                    onClick={() => setDrawer({ type: 'lead', data: lead })}
                    className="p-4 hover:bg-[var(--surface-hover)] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono text-[var(--text-muted)]">{lead.id}</span>
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${typeConfig.bg} ${typeConfig.color}`}>
                            {typeConfig.label}
                          </span>
                          <span className="text-[10px] text-[var(--text-muted)]">via {lead.source}</span>
                        </div>
                        <p className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">{lead.name}</p>
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
          )}
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
            <div
              key={staff.id}
              onClick={() => setDrawer({ type: 'staff', data: staff })}
              className="rounded-xl border border-red-500/20 bg-[var(--surface)] p-4 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <User size={18} className="text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">{staff.name}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">{staff.role}</p>
                </div>
              </div>

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

      {/* Detail Drawer */}
      <Sheet open={!!drawer} onOpenChange={(open) => !open && setDrawer(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto bg-[var(--background)] border-[var(--border)]">
          {drawer?.type === 'lead' && (() => {
            const lead = drawer.data;
            const typeConfig = issueTypeConfig[lead.issueType];
            const risk = riskConfig[lead.riskLevel];

            return (
              <div className="space-y-6 pt-2">
                <SheetHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">{lead.id}</span>
                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${typeConfig.bg} ${typeConfig.color}`}>{typeConfig.label}</span>
                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${risk.bg} ${risk.color}`}>{risk.label}</span>
                      </div>
                      <SheetTitle className="text-lg font-bold text-[var(--text-primary)]">{lead.name}</SheetTitle>
                      <p className="text-xs text-[var(--text-secondary)]">{lead.caseType}</p>
                    </div>
                    <p className="text-xl font-bold text-[var(--text-primary)]">{lead.value}</p>
                  </div>
                </SheetHeader>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center gap-2">
                    <Phone size={14} className="text-[var(--text-muted)]" />
                    <span className="text-xs font-mono text-[var(--text-primary)]">{lead.phone}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center gap-2">
                    <Mail size={14} className="text-[var(--text-muted)]" />
                    <span className="text-xs font-mono text-[var(--text-primary)] truncate">{lead.email}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border-2 border-red-500/20 bg-red-500/5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2">🔍 Why This Happened</h4>
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed">{lead.rootCause}</p>
                </div>

                <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-2">💡 Recommended Action</h4>
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed">{lead.recommendation}</p>
                </div>

                <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">Activity Timeline</h4>
                  <div className="space-y-0">
                    {lead.timeline.map((evt, i) => {
                      const dotColor = evt.type === 'error' ? 'bg-red-500' : evt.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500';
                      const textColor = evt.type === 'error' ? 'text-red-500' : evt.type === 'warning' ? 'text-amber-500' : 'text-[var(--text-secondary)]';
                      return (
                        <div key={i} className="flex gap-3 py-2.5 border-b border-[var(--border)] last:border-0">
                          <div className="flex flex-col items-center pt-1.5">
                            <div className={`h-2 w-2 rounded-full ${dotColor}`} />
                            {i < lead.timeline.length - 1 && <div className="w-px flex-1 bg-[var(--border)] mt-1" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs ${textColor}`}>{evt.event}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] font-mono text-[var(--text-muted)]">{evt.time}</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--surface-hover)] text-[var(--text-muted)]">{evt.source}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                    <p className="text-[9px] font-bold uppercase text-[var(--text-muted)]">Source</p>
                    <p className="text-xs font-bold text-[var(--text-primary)] mt-1">{lead.source}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                    <p className="text-[9px] font-bold uppercase text-[var(--text-muted)]">Assigned To</p>
                    <p className="text-xs font-bold text-[var(--text-primary)] mt-1">{lead.assignedTo}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                    <p className="text-[9px] font-bold uppercase text-[var(--text-muted)]">Intake Date</p>
                    <p className="text-xs font-bold text-[var(--text-primary)] mt-1">{lead.intakeDate}</p>
                  </div>
                </div>
              </div>
            );
          })()}

          {drawer?.type === 'staff' && (() => {
            const staff = drawer.data;

            return (
              <div className="space-y-6 pt-2">
                <SheetHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                      <User size={22} className="text-red-500" />
                    </div>
                    <div>
                      <SheetTitle className="text-lg font-bold text-[var(--text-primary)]">{staff.name}</SheetTitle>
                      <p className="text-xs text-[var(--text-secondary)]">{staff.role}</p>
                    </div>
                  </div>
                </SheetHeader>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-center">
                    <p className="text-[9px] font-bold uppercase text-[var(--text-muted)]">Conversion</p>
                    <p className="text-2xl font-bold text-red-500 mt-1">{staff.conversionRate}%</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-center">
                    <p className="text-[9px] font-bold uppercase text-[var(--text-muted)]">Team Avg</p>
                    <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">{staff.avgConversion}%</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-center">
                    <p className="text-[9px] font-bold uppercase text-[var(--text-muted)]">Active Leads</p>
                    <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">{staff.leadsAssigned}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">4-Week Conversion Trend</h4>
                  <div className="flex items-end gap-3 h-24">
                    {staff.weeklyTrend.map((w) => (
                      <div key={w.week} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-[10px] font-mono text-red-500">{w.rate}%</span>
                        <div className="w-full bg-red-500/20 rounded-t-sm" style={{ height: `${(w.rate / 40) * 80}px` }}>
                          <div className="w-full h-full bg-red-500 rounded-t-sm opacity-60" />
                        </div>
                        <span className="text-[9px] text-[var(--text-muted)]">{w.week}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl border-2 border-red-500/20 bg-red-500/5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2">🔍 Performance Analysis</h4>
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed">{staff.analysis}</p>
                </div>

                <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-2">💡 Recommended Action</h4>
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed">{staff.recommendation}</p>
                </div>

                <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">Recent Lead Outcomes</h4>
                  <div className="space-y-2">
                    {staff.recentLeads.map((rl, i) => {
                      const oc = outcomeConfig[rl.outcome];
                      return (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[var(--surface-hover)]">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-[var(--text-primary)]">{rl.name}</p>
                            <p className="text-[10px] text-[var(--text-muted)] mt-0.5 truncate">{rl.reason}</p>
                          </div>
                          <div className="text-right shrink-0 ml-3">
                            <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${oc.bg} ${oc.color}`}>{oc.label}</span>
                            <p className="text-[9px] text-[var(--text-muted)] mt-1">{rl.daysAgo}d ago</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })()}
        </SheetContent>
      </Sheet>
    </div>
  );
}
