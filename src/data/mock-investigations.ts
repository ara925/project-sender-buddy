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
    leadName: 'Carlos Mendez',
    agentName: 'Aisha Williams',
    severity: 'critical',
    status: 'open',
    flag: 'Lead data exported before handoff',
    aiSummary: 'Agent exported lead contact info to personal device 3 minutes before marking lead as "lost." Pattern matches 4 other leads this week that were later signed by competing firm Torres & Associates.',
    details: 'CRM export log shows bulk download of 12 lead records at 11:47 PM — outside shift hours. Lead appeared at competitor within 48 hours.',
    flaggedAt: '2024-02-05T11:50:00Z',
    indicators: ['After-hours data export', 'Lead signed with competitor', 'Repeat pattern detected', 'Personal device access'],
  },
  {
    id: 'inv-2',
    leadId: '11',
    leadName: 'Patricia Nguyen',
    agentName: 'David Chen',
    severity: 'high',
    status: 'reviewing',
    flag: 'Suspicious status change pattern',
    aiSummary: 'Lead was marked "lost" within 8 minutes of intake — no call attempt, no notes. Lead later retained by Hartley Law Group. Agent has 6 similar rapid-close leads in 2 weeks, all PI cases over $50K estimated value.',
    details: 'Average handle time for similar leads is 12 minutes. This lead was closed in under 2 minutes with no recorded outreach.',
    flaggedAt: '2024-02-04T14:22:00Z',
    indicators: ['Rapid status change', 'No outreach attempted', 'High-value case type', 'Competitor retention within 72hrs'],
  },
  {
    id: 'inv-3',
    leadId: '5',
    leadName: 'Robert Brown',
    agentName: 'Kevin O\'Brien',
    severity: 'high',
    status: 'open',
    flag: 'Contact info accessed after reassignment',
    aiSummary: 'Agent accessed lead\'s phone number and email 3 times after the lead was reassigned to another agent. No legitimate reason found — agent was not on callback duty and had no active tasks related to this lead.',
    details: 'Access timestamps: Feb 3 at 9:12 PM, Feb 4 at 6:45 AM, Feb 4 at 11:30 PM. All outside normal working hours.',
    flaggedAt: '2024-02-04T23:35:00Z',
    indicators: ['Post-reassignment access', 'After-hours activity', 'Multiple access attempts', 'No task justification'],
  },
  {
    id: 'inv-4',
    leadId: '12',
    leadName: 'Angela Martinez',
    agentName: 'Marcus Johnson',
    severity: 'medium',
    status: 'cleared',
    flag: 'Unusual call routing',
    aiSummary: 'Lead was transferred to agent\'s personal line before being logged in CRM. Investigation found this was due to a system glitch during CallRail maintenance. Agent cooperated fully and provided call recordings.',
    details: 'CallRail downtime on Feb 2 caused 3 calls to route to backup numbers. All leads were properly logged once system restored.',
    flaggedAt: '2024-02-02T16:10:00Z',
    indicators: ['Personal line transfer', 'Delayed CRM logging'],
  },
  {
    id: 'inv-5',
    leadId: '13',
    leadName: 'Thomas Wright',
    agentName: 'Aisha Williams',
    severity: 'critical',
    status: 'confirmed',
    flag: 'Lead data shared externally',
    aiSummary: 'Email monitoring detected lead contact information sent to a non-company email address (a.williams.personal@gmail.com). The recipient domain has been linked to referral arrangements with 2 competing firms. This is the agent\'s second confirmed violation.',
    details: 'Email sent on Feb 1 at 10:15 PM containing 8 lead records with full contact info, case types, and estimated values. IT flagged the outbound email.',
    flaggedAt: '2024-02-01T22:20:00Z',
    indicators: ['External email detected', 'Bulk lead data', 'Known competitor contact', 'Repeat offender'],
  },
  {
    id: 'inv-6',
    leadId: '14',
    leadName: 'Diana Kim',
    agentName: 'James Park',
    severity: 'low',
    status: 'cleared',
    flag: 'Extended lead hold time',
    aiSummary: 'Agent held lead without action for 4 days — above the 24-hour SLA. Investigation revealed agent was on approved PTO and the lead was not properly reassigned by the manager. No malicious intent found.',
    details: 'Manager confirmed oversight in reassignment process. New protocol implemented for PTO coverage.',
    flaggedAt: '2024-02-03T09:00:00Z',
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
