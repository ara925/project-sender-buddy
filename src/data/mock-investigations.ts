export type InvestigationSeverity = 'critical' | 'high' | 'medium' | 'low';
export type InvestigationStatus = 'open' | 'reviewing' | 'cleared' | 'confirmed';

export interface Investigation {
  id: string;
  leadId: string;
  leadName: string;
  agentName: string;
  severity: InvestigationSeverity;
  status: InvestigationStatus;
  flag: string;
  aiSummary: string;
  details: string;
  flaggedAt: string;
  indicators: string[];
}

export const investigations: Investigation[] = [
  {
    id: 'inv-1',
    leadId: '10',
    leadName: 'Maria Delgado',
    agentName: 'Aisha Williams',
    severity: 'critical',
    status: 'open',
    flag: 'Honeypot triggered — lead data exported and shared externally',
    aiSummary: 'Agent accessed honeypot record HP-001 (Maria Delgado — Premises Liability, $2.8M) at 11:02 AM, copied the phone number, and exported the full case summary. Within 12 minutes, the burner phone received an inbound call from (510) 555-0342, linked to Rivera & Associates. This confirms a pre-established referral channel for selling high-value PI leads.',
    details: 'CRM access log shows agent viewed, copied, and exported honeypot data within 3 minutes. Burner phone (408) 555-0177 received contact from competing firm. Cross-reference shows agent accessed 4 other high-value premises liability cases this month she was not assigned to.',
    flaggedAt: '2026-02-13T11:14:00Z',
    indicators: ['Honeypot data accessed', 'Phone number copied to clipboard', 'Case summary exported to PDF', 'Burner phone contacted by competing firm within 12 min'],
  },
  {
    id: 'inv-2',
    leadId: '11',
    leadName: 'Linda Tran',
    agentName: 'David Chen',
    severity: 'high',
    status: 'reviewing',
    flag: 'Suspicious status change on high-value auto death case',
    aiSummary: 'Lead was marked "lost" within 6 minutes of intake — no call attempt, no notes. This was a $5.2M auto MVA wrongful death case (semi-truck rear-end on the freeway). Lead later retained by Hartley Law Group. Agent has 5 similar rapid-close leads in 2 weeks, all high-value PI or auto death cases.',
    details: 'Average handle time for wrongful death cases is 18 minutes. This lead was closed in under 2 minutes with no recorded outreach. Case type and value match honeypot profile HP-003.',
    flaggedAt: '2026-02-11T14:22:00Z',
    indicators: ['Rapid status change', 'No outreach attempted', 'Wrongful death — highest case value category', 'Competitor retention within 48hrs'],
  },
  {
    id: 'inv-3',
    leadId: '5',
    leadName: 'Rosa Gutierrez',
    agentName: 'Kevin O\'Brien',
    severity: 'high',
    status: 'open',
    flag: 'Contact info accessed after reassignment — catastrophic auto MVA',
    aiSummary: 'Agent accessed lead\'s phone number and email 3 times after the lead was reassigned to another agent. Rosa Gutierrez is a catastrophic auto MVA case ($3.1M — head-on collision, kidney surgery, wheelchair-bound). No legitimate reason found — agent was not on callback duty and had no active tasks related to this lead.',
    details: 'Access timestamps: Feb 10 at 9:12 PM, Feb 11 at 6:45 AM, Feb 11 at 11:30 PM. All outside normal working hours. Case profile matches honeypot HP-005.',
    flaggedAt: '2026-02-11T23:35:00Z',
    indicators: ['Post-reassignment access', 'After-hours activity', 'Multiple access attempts', 'Catastrophic injury case — high theft value'],
  },
  {
    id: 'inv-4',
    leadId: '12',
    leadName: 'Jorge Reyes',
    agentName: 'Marcus Johnson',
    severity: 'medium',
    status: 'cleared',
    flag: 'Unusual call routing — premises liability case',
    aiSummary: 'Lead was transferred to agent\'s personal line before being logged in CRM. Jorge Reyes is a premises liability case ($1.4M — sidewalk defect, knee surgery). Investigation found this was due to a system glitch during CallRail maintenance. Agent cooperated fully and provided call recordings.',
    details: 'CallRail downtime on Feb 9 caused 3 calls to route to backup numbers. All leads were properly logged once system restored. Case type matches honeypot HP-002 profile but no theft indicators found.',
    flaggedAt: '2026-02-09T16:10:00Z',
    indicators: ['Personal line transfer', 'Delayed CRM logging'],
  },
  {
    id: 'inv-5',
    leadId: '13',
    leadName: 'Sandra Okafor',
    agentName: 'Aisha Williams',
    severity: 'critical',
    status: 'confirmed',
    flag: 'Lead data shared externally — auto MVA death commercial case',
    aiSummary: 'Email monitoring detected lead contact information sent to a non-company email address (a.williams.personal@gmail.com). The data included Sandra Okafor\'s auto MVA death case ($6.5M — vehicle recall defect, airbag failure). The recipient domain has been linked to referral arrangements with 2 competing firms. This is the agent\'s second confirmed violation — first was honeypot HP-001 trigger.',
    details: 'Email sent on Feb 8 at 10:15 PM containing 6 lead records including Sandra Okafor\'s case with full contact info, case types, and estimated values. IT flagged the outbound email. Case profile matches honeypot HP-004.',
    flaggedAt: '2026-02-08T22:20:00Z',
    indicators: ['External email detected', 'Bulk lead data including death cases', 'Known competitor contact', 'Repeat offender — also triggered HP-001'],
  },
  {
    id: 'inv-6',
    leadId: '14',
    leadName: 'Amara Jenkins',
    agentName: 'James Park',
    severity: 'low',
    status: 'cleared',
    flag: 'Extended lead hold time — dog bite catastrophic case',
    aiSummary: 'Agent held lead without action for 4 days — above the 24-hour SLA. Amara Jenkins is a catastrophic dog bite case ($2.2M — minor child, facial injuries in foster care). Investigation revealed agent was on approved PTO and the lead was not properly reassigned by the manager. No malicious intent found.',
    details: 'Manager confirmed oversight in reassignment process. New protocol implemented for PTO coverage. Case type matches honeypot HP-006 profile but this was a genuine process failure, not theft.',
    flaggedAt: '2026-02-10T09:00:00Z',
    indicators: ['SLA breach', 'No reassignment'],
  },
];

export const severityConfig: Record<InvestigationSeverity, { label: string; color: string; bg: string; border: string }> = {
  critical: { label: 'Critical', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  high: { label: 'High', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  medium: { label: 'Medium', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  low: { label: 'Low', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
};

export const investigationStatusConfig: Record<InvestigationStatus, { label: string; color: string; bg: string }> = {
  open: { label: 'Open', color: 'text-red-500', bg: 'bg-red-500/10' },
  reviewing: { label: 'Under Review', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  cleared: { label: 'Cleared', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  confirmed: { label: 'Confirmed', color: 'text-red-600', bg: 'bg-red-600/10' },
};
