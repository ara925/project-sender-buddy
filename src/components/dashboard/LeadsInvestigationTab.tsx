import { useState } from 'react';
import { AlertTriangle, Clock, User, TrendingDown, XCircle, AlertCircle, Phone, Mail, MessageSquare, FileText, ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface LeadIssue {
  id: string;
  name: string;
  source: string;
  issue: string;
  issueType: 'stale' | 'routing' | 'duplicate';
  daysSinceContact: number;
  assignedTo: string;
  value: string;
  // Detail data
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
  // Detail data
  recentLeads: { name: string; outcome: 'converted' | 'lost' | 'pending'; reason: string; daysAgo: number }[];
  weeklyTrend: { week: string; rate: number }[];
  analysis: string;
  recommendation: string;
}

const leadIssues: LeadIssue[] = [
  {
    id: 'L-1042', name: 'Maria Gonzalez', source: 'Google Ads', issue: 'No outreach in 72 hours — lead going cold',
    issueType: 'stale', daysSinceContact: 3, assignedTo: 'James Wilson', value: '$45,000',
    phone: '(213) 555-0188', email: 'mgonzalez@email.com', caseType: 'Personal Injury — Auto', intakeDate: 'Feb 9, 2026',
    rootCause: 'Lead was assigned to James Wilson who has 42 active leads — significantly above the 25-lead capacity threshold. Combined with his low conversion rate (12%), this lead has been deprioritized in his queue. No automated reminder was triggered because the SLA alert system only fires after 96 hours.',
    timeline: [
      { time: 'Feb 9, 10:22 AM', event: 'Lead captured via Google Ads click — "car accident lawyer los angeles"', type: 'info', source: 'Google Ads' },
      { time: 'Feb 9, 10:23 AM', event: 'Intake form submitted — PI Auto Accident, rear-end collision', type: 'info', source: 'Intaker' },
      { time: 'Feb 9, 10:25 AM', event: 'Auto-assigned to James Wilson (round-robin)', type: 'info', source: 'System' },
      { time: 'Feb 9, 10:25 AM', event: 'Assignment notification sent to James Wilson', type: 'info', source: 'Email' },
      { time: 'Feb 9, 2:00 PM', event: 'No action taken — 4 hours elapsed', type: 'warning', source: 'System' },
      { time: 'Feb 10, 9:00 AM', event: 'No action taken — 24 hours elapsed', type: 'warning', source: 'System' },
      { time: 'Feb 11, 9:00 AM', event: 'No action taken — 48 hours elapsed', type: 'error', source: 'System' },
      { time: 'Feb 12, 10:22 AM', event: 'ALERT: 72 hours with zero outreach — lead at risk', type: 'error', source: 'System' },
    ],
    recommendation: 'Reassign immediately to Sarah Kim or David Park. Send automated apology text + callback scheduling link. Flag James Wilson for workload review.',
    riskLevel: 'high',
  },
  {
    id: 'L-1038', name: 'Robert Chen', source: 'Intaker', issue: 'No outreach in 56 hours',
    issueType: 'stale', daysSinceContact: 2, assignedTo: 'Sarah Kim', value: '$120,000',
    phone: '(310) 555-0277', email: 'rchen@email.com', caseType: 'Employment Law — Wrongful Termination', intakeDate: 'Feb 10, 2026',
    rootCause: 'Sarah Kim was on PTO Feb 10-11 but the auto-assign system did not check agent availability. Lead sat in her queue without coverage. PTO integration with the assignment engine is not yet configured.',
    timeline: [
      { time: 'Feb 10, 3:15 PM', event: 'Intake form submitted — Wrongful Termination claim', type: 'info', source: 'Intaker' },
      { time: 'Feb 10, 3:16 PM', event: 'Auto-assigned to Sarah Kim (expertise match)', type: 'info', source: 'System' },
      { time: 'Feb 10, 3:16 PM', event: 'Sarah Kim is on PTO — notification NOT sent', type: 'error', source: 'System' },
      { time: 'Feb 11, 9:00 AM', event: 'No action — Sarah Kim still on PTO', type: 'warning', source: 'System' },
      { time: 'Feb 12, 9:00 AM', event: 'Sarah Kim returned — 56 hours elapsed on lead', type: 'warning', source: 'System' },
    ],
    recommendation: 'Configure PTO calendar integration with auto-assignment engine. Reassign coverage agent for future PTO periods. Sarah to prioritize this lead immediately upon return.',
    riskLevel: 'high',
  },
  {
    id: 'L-1035', name: 'Angela Davis', source: 'CallRail', issue: 'Lead assigned to wrong practice area — needs rerouting',
    issueType: 'routing', daysSinceContact: 1, assignedTo: 'Unassigned', value: '$85,000',
    phone: '(818) 555-0334', email: 'adavis@email.com', caseType: 'Workers Comp (misrouted as PI)', intakeDate: 'Feb 11, 2026',
    rootCause: 'Caller described a workplace injury during a phone call tracked by CallRail. The AI call classifier tagged it as "Personal Injury" based on keyword "injury", but the actual case is Workers Compensation. The PI intake team recognized the misroute and unassigned the lead, but no one re-routed it to the Workers Comp team.',
    timeline: [
      { time: 'Feb 11, 11:30 AM', event: 'Inbound call — (818) 555-0334, 4 min 22 sec', type: 'info', source: 'CallRail' },
      { time: 'Feb 11, 11:31 AM', event: 'AI classified: Personal Injury (confidence: 67%)', type: 'warning', source: 'Regal AI' },
      { time: 'Feb 11, 11:32 AM', event: 'Assigned to PI intake queue', type: 'info', source: 'System' },
      { time: 'Feb 11, 2:00 PM', event: 'PI team flagged: "This is Workers Comp, not PI"', type: 'error', source: 'Manual' },
      { time: 'Feb 11, 2:01 PM', event: 'Lead unassigned from PI queue — no re-route triggered', type: 'error', source: 'System' },
      { time: 'Feb 12, 12:00 PM', event: 'Lead still unassigned — 24 hours in limbo', type: 'error', source: 'System' },
    ],
    recommendation: 'Route immediately to Workers Comp team. Improve AI classifier training data for workplace injury vs. personal injury distinction. Add automatic escalation when a lead is unassigned for >2 hours.',
    riskLevel: 'high',
  },
  {
    id: 'L-1029', name: 'Tom Nakamura', source: 'Web Form', issue: 'Duplicate entry — data split across two records',
    issueType: 'duplicate', daysSinceContact: 4, assignedTo: 'James Wilson', value: '$60,000',
    phone: '(424) 555-0189', email: 'tnakamura@email.com', caseType: 'Personal Injury — Slip & Fall', intakeDate: 'Feb 8, 2026',
    rootCause: 'Tom submitted a web form on Feb 8 and then called in on Feb 9. The phone intake created a second record because the deduplication engine matches on exact name + email, but the phone record used "Thomas" while the web form used "Tom". Two agents are now working the same lead independently.',
    timeline: [
      { time: 'Feb 8, 4:45 PM', event: 'Web form submitted as "Tom Nakamura"', type: 'info', source: 'Web Form' },
      { time: 'Feb 8, 4:46 PM', event: 'Lead L-1029 created, assigned to James Wilson', type: 'info', source: 'System' },
      { time: 'Feb 9, 10:00 AM', event: 'Phone call from same number — "Thomas Nakamura"', type: 'info', source: 'CallRail' },
      { time: 'Feb 9, 10:01 AM', event: 'New lead L-1031 created (dedup check: no match for "Thomas")', type: 'warning', source: 'System' },
      { time: 'Feb 9, 10:02 AM', event: 'L-1031 assigned to Lisa Torres', type: 'info', source: 'System' },
      { time: 'Feb 12, 9:00 AM', event: 'Duplicate detected by audit — same phone number on two records', type: 'error', source: 'System' },
    ],
    recommendation: 'Merge records L-1029 and L-1031. Update dedup engine to use fuzzy name matching + phone number. Notify both agents and consolidate under single assignment.',
    riskLevel: 'medium',
  },
  {
    id: 'L-1044', name: 'Priya Sharma', source: 'Regal AI', issue: 'AI handoff failed — no human follow-up logged',
    issueType: 'routing', daysSinceContact: 1, assignedTo: 'David Park', value: '$95,000',
    phone: '(562) 555-0211', email: 'psharma@email.com', caseType: 'Employment — Discrimination', intakeDate: 'Feb 11, 2026',
    rootCause: 'The Regal AI agent successfully qualified this lead and attempted a warm transfer to David Park. The transfer webhook fired but David\'s softphone was in DND mode. The system marked the handoff as "complete" despite the call not connecting, and no fallback routing was triggered.',
    timeline: [
      { time: 'Feb 11, 1:30 PM', event: 'Inbound call answered by Regal AI agent', type: 'info', source: 'Regal AI' },
      { time: 'Feb 11, 1:34 PM', event: 'AI qualification complete — Employment Discrimination, high value', type: 'info', source: 'Regal AI' },
      { time: 'Feb 11, 1:35 PM', event: 'Warm transfer initiated to David Park', type: 'info', source: 'Regal AI' },
      { time: 'Feb 11, 1:35 PM', event: 'Transfer webhook fired — HTTP 200 response', type: 'info', source: 'System' },
      { time: 'Feb 11, 1:35 PM', event: 'David Park softphone in DND — call not connected', type: 'error', source: 'Phone System' },
      { time: 'Feb 11, 1:36 PM', event: 'System marked handoff as "complete" (false positive)', type: 'error', source: 'System' },
      { time: 'Feb 12, 12:00 PM', event: 'No human follow-up logged — 22 hours since AI qualification', type: 'error', source: 'System' },
    ],
    recommendation: 'Fix transfer verification — check call connection status, not just webhook response. Add DND-aware routing with automatic fallback to next available agent. Contact Priya immediately.',
    riskLevel: 'high',
  },
  {
    id: 'L-1047', name: 'Kevin O\'Brien', source: 'Google Ads', issue: 'No response to 3 callback attempts',
    issueType: 'stale', daysSinceContact: 5, assignedTo: 'Sarah Kim', value: '$35,000',
    phone: '(323) 555-0156', email: 'kobrien@email.com', caseType: 'Personal Injury — Dog Bite', intakeDate: 'Feb 7, 2026',
    rootCause: 'Sarah Kim made 3 callback attempts (Feb 7, 8, 9) but all went to voicemail. No text message or email follow-up was sent. The lead has not responded to any voicemails. Standard protocol requires multi-channel outreach after 2 failed calls, but this was not followed.',
    timeline: [
      { time: 'Feb 7, 2:15 PM', event: 'Lead captured via Google Ads — "dog bite lawyer"', type: 'info', source: 'Google Ads' },
      { time: 'Feb 7, 2:30 PM', event: 'Callback attempt #1 — voicemail left', type: 'info', source: 'CallRail' },
      { time: 'Feb 8, 10:00 AM', event: 'Callback attempt #2 — voicemail left', type: 'warning', source: 'CallRail' },
      { time: 'Feb 9, 11:00 AM', event: 'Callback attempt #3 — voicemail left', type: 'warning', source: 'CallRail' },
      { time: 'Feb 9, 11:01 AM', event: 'No text or email sent (protocol violation)', type: 'error', source: 'System' },
      { time: 'Feb 12, 12:00 PM', event: '5 days with no response — lead likely cold', type: 'error', source: 'System' },
    ],
    recommendation: 'Send immediate text + email with scheduling link. If no response in 24h, move to nurture campaign. Coach Sarah on multi-channel protocol after 2 failed calls.',
    riskLevel: 'medium',
  },
];

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
    analysis: 'James has been on a consistent 4-week decline from 28% to 12% conversion. His lead volume (42 active) is 68% above the recommended capacity of 25. He\'s not triaging effectively — high-value leads are getting the same response time as low-value ones. Two confirmed lost leads cited "slow response" as the reason for choosing a competitor. The workload issue is compounding — more leads assigned means slower response on each, which lowers conversion, which means more leads pile up.',
    recommendation: 'Immediately reduce his active queue to 25 leads by redistributing 17 leads to other agents. Implement a priority scoring system so high-value leads get same-day response. Schedule a 1:1 coaching session on time management and lead triage. Monitor weekly for 4 weeks.',
  },
  {
    id: 'S-02', name: 'Lisa Torres', role: 'Intake Specialist', conversionRate: 18, avgConversion: 34,
    leadsAssigned: 28, leadsConverted: 5, flagReason: 'Consistent decline over 3 weeks',
    recentLeads: [
      { name: 'Jennifer Adams', outcome: 'lost', reason: 'Lead wanted Spanish-speaking attorney — Lisa couldn\'t accommodate', daysAgo: 2 },
      { name: 'Robert Martinez', outcome: 'lost', reason: 'Intake call too scripted — felt impersonal', daysAgo: 5 },
      { name: 'Amy Chen', outcome: 'converted', reason: 'Good rapport, quick retainer signing', daysAgo: 7 },
      { name: 'Carlos Reyes', outcome: 'lost', reason: 'Competitor offered free consultation', daysAgo: 9 },
    ],
    weeklyTrend: [
      { week: 'W1', rate: 32 }, { week: 'W2', rate: 26 }, { week: 'W3', rate: 20 }, { week: 'W4', rate: 18 },
    ],
    analysis: 'Lisa\'s decline correlates with a shift in her lead sources — she\'s receiving more Spanish-preferred leads that she can\'t fully service. Her English-language conversions remain at ~30%, but her blended rate has dropped because of the language mismatch. Additionally, recent call recordings show she\'s relying too heavily on the intake script, leading to lower rapport scores.',
    recommendation: 'Reroute Spanish-preferred leads to bilingual agents. Provide conversational intake training to reduce script dependency. Her English-language performance is acceptable — isolate the language issue before escalating.',
  },
  {
    id: 'S-03', name: 'David Park', role: 'Junior Intake', conversionRate: 22, avgConversion: 34,
    leadsAssigned: 36, leadsConverted: 8, flagReason: 'High lead volume, low close rate — possible training gap',
    recentLeads: [
      { name: 'Priya Sharma', outcome: 'pending', reason: 'AI handoff failed — no follow-up yet', daysAgo: 1 },
      { name: 'Mark Thompson', outcome: 'lost', reason: 'Didn\'t explain retainer structure clearly', daysAgo: 3 },
      { name: 'Susan Wright', outcome: 'converted', reason: 'Employment case — strong pitch', daysAgo: 4 },
      { name: 'James Garcia', outcome: 'lost', reason: 'Lead had unrealistic expectations, not managed', daysAgo: 6 },
    ],
    weeklyTrend: [
      { week: 'W1', rate: 20 }, { week: 'W2', rate: 24 }, { week: 'W3', rate: 21 }, { week: 'W4', rate: 22 },
    ],
    analysis: 'David is a junior agent with stable but below-average conversion. His trend shows no decline — he\'s consistently around 21-24%, which suggests a skill plateau rather than a behavioral issue. Call recordings indicate he struggles with objection handling (particularly around fees and timelines) and doesn\'t effectively convey urgency. His lead volume (36) is also above the recommended 25 for a junior agent.',
    recommendation: 'Enroll in advanced objection handling workshop. Pair with a senior mentor for 2 weeks of shadowing. Reduce lead volume to 20 until conversion improves above 28%. Focus training on fee discussion and urgency framing.',
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

                {/* Contact Info */}
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

                {/* Root Cause */}
                <div className="p-4 rounded-xl border-2 border-red-500/20 bg-red-500/5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2">🔍 Why This Happened</h4>
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed">{lead.rootCause}</p>
                </div>

                {/* Recommendation */}
                <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-2">💡 Recommended Action</h4>
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed">{lead.recommendation}</p>
                </div>

                {/* Activity Timeline */}
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

                {/* Meta */}
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

                {/* Performance Overview */}
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

                {/* Weekly Trend */}
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

                {/* Analysis */}
                <div className="p-4 rounded-xl border-2 border-red-500/20 bg-red-500/5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2">🔍 Performance Analysis</h4>
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed">{staff.analysis}</p>
                </div>

                {/* Recommendation */}
                <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-2">💡 Recommended Action</h4>
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed">{staff.recommendation}</p>
                </div>

                {/* Recent Leads */}
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
