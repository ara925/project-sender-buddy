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
    flag: 'Honeypot alert — burner phone contacted after record access',
    aiSummary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    details: 'Lorem ipsum dolor sit amet. Agent accessed honeypot data not assigned to her. Burner phone received contact from competing firm.',
    flaggedAt: '2026-02-13T11:14:00Z',
    indicators: ['Honeypot data accessed', 'Record not assigned to agent', 'Burner phone contacted within 12 min'],
  },
  {
    id: 'inv-2',
    leadId: '11',
    leadName: 'Linda Tran',
    agentName: 'David Chen',
    severity: 'high',
    status: 'reviewing',
    flag: 'Rapid close on high-value auto death case',
    aiSummary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    details: 'Lorem ipsum dolor sit amet. Lead closed in under 2 minutes with no recorded outreach.',
    flaggedAt: '2026-02-11T14:22:00Z',
    indicators: ['Rapid status change', 'No outreach attempted', 'Wrongful death case', 'Competitor retention within 48hrs'],
  },
  {
    id: 'inv-3',
    leadId: '5',
    leadName: 'Rosa Gutierrez',
    agentName: 'Kevin O\'Brien',
    severity: 'high',
    status: 'open',
    flag: 'Contact info accessed after reassignment',
    aiSummary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit.',
    details: 'Lorem ipsum dolor sit amet. Access timestamps outside normal working hours across multiple days.',
    flaggedAt: '2026-02-11T23:35:00Z',
    indicators: ['Post-reassignment access', 'After-hours activity', 'Multiple access attempts'],
  },
  {
    id: 'inv-4',
    leadId: '12',
    leadName: 'Jorge Reyes',
    agentName: 'Marcus Johnson',
    severity: 'medium',
    status: 'cleared',
    flag: 'Unusual call routing — premises liability',
    aiSummary: 'Lorem ipsum dolor sit amet. System glitch during maintenance caused routing issue. Agent cooperated fully.',
    details: 'Lorem ipsum dolor sit amet. Maintenance downtime caused 3 calls to route to backup numbers. All leads properly logged once restored.',
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
    flag: 'Lead data shared externally',
    aiSummary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident.',
    details: 'Lorem ipsum dolor sit amet. Agent accessed records over a 3-day period despite none being assigned to her. Second confirmed violation.',
    flaggedAt: '2026-02-08T22:20:00Z',
    indicators: ['External email detected', 'Known competitor contact', 'Repeat offender'],
  },
  {
    id: 'inv-6',
    leadId: '14',
    leadName: 'Amara Jenkins',
    agentName: 'James Park',
    severity: 'low',
    status: 'cleared',
    flag: 'Extended lead hold time — dog bite case',
    aiSummary: 'Lorem ipsum dolor sit amet. Agent on approved PTO, lead not reassigned by manager. No malicious intent.',
    details: 'Lorem ipsum dolor sit amet. Manager confirmed oversight in reassignment process. New protocol implemented for PTO coverage.',
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
