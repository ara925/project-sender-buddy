export type StaffStatus = 'available' | 'on_call' | 'break' | 'offline' | 'overloaded';

export interface StaffMember {
  id: string;
  name: string;
  role: 'intake_specialist' | 'senior_intake' | 'intake_manager' | 'receptionist';
  status: StaffStatus;
  currentCalls: number;
  callsToday: number;
  avgHandleTime: string;
  conversionRate: number;
  shift: string;
  skills: string[];
  issue?: string;
}

export const staffMembers: StaffMember[] = [
  {
    id: 's1',
    name: 'Maria Gonzalez',
    role: 'senior_intake',
    status: 'on_call',
    currentCalls: 1,
    callsToday: 18,
    avgHandleTime: '4:32',
    conversionRate: 68,
    shift: '8:00 AM – 4:00 PM',
    skills: ['Spanish', 'Employment Law', 'PI'],
  },
  {
    id: 's2',
    name: 'James Park',
    role: 'intake_specialist',
    status: 'available',
    currentCalls: 0,
    callsToday: 12,
    avgHandleTime: '5:15',
    conversionRate: 52,
    shift: '8:00 AM – 4:00 PM',
    skills: ['PI', 'Workers Comp'],
  },
  {
    id: 's3',
    name: 'Aisha Williams',
    role: 'intake_specialist',
    status: 'overloaded',
    currentCalls: 3,
    callsToday: 22,
    avgHandleTime: '3:48',
    conversionRate: 61,
    shift: '8:00 AM – 4:00 PM',
    skills: ['Employment Law', 'Wage & Hour'],
    issue: 'Handling 3 concurrent calls — risk of dropped leads',
  },
  {
    id: 's4',
    name: 'David Chen',
    role: 'intake_specialist',
    status: 'break',
    currentCalls: 0,
    callsToday: 9,
    avgHandleTime: '6:02',
    conversionRate: 45,
    shift: '10:00 AM – 6:00 PM',
    skills: ['PI', 'Mandarin'],
    issue: 'Extended break — 25 min (limit: 15 min)',
  },
  {
    id: 's5',
    name: 'Rachel Torres',
    role: 'intake_manager',
    status: 'available',
    currentCalls: 0,
    callsToday: 5,
    avgHandleTime: '7:10',
    conversionRate: 74,
    shift: '8:00 AM – 4:00 PM',
    skills: ['All Case Types', 'Escalations'],
  },
  {
    id: 's6',
    name: "Kevin O'Brien",
    role: 'intake_specialist',
    status: 'offline',
    currentCalls: 0,
    callsToday: 0,
    avgHandleTime: '—',
    conversionRate: 55,
    shift: '2:00 PM – 10:00 PM',
    skills: ['PI', 'Employment Law'],
    issue: 'Scheduled for shift but not logged in — 12 min late',
  },
  {
    id: 's7',
    name: 'Sarah Kim',
    role: 'receptionist',
    status: 'on_call',
    currentCalls: 1,
    callsToday: 31,
    avgHandleTime: '1:45',
    conversionRate: 0,
    shift: '8:00 AM – 4:00 PM',
    skills: ['Call Routing', 'Scheduling'],
  },
  {
    id: 's8',
    name: 'Marcus Johnson',
    role: 'senior_intake',
    status: 'on_call',
    currentCalls: 2,
    callsToday: 16,
    avgHandleTime: '4:55',
    conversionRate: 71,
    shift: '8:00 AM – 4:00 PM',
    skills: ['PI', 'Employment Law', 'Escalations'],
    issue: 'Conversion rate dropped 15% this week',
  },
];

export const staffStatusConfig: Record<StaffStatus, { label: string; color: string; bg: string; dot: string }> = {
  available: { label: 'Available', color: 'text-emerald-500', bg: 'bg-emerald-500/10', dot: 'bg-emerald-500' },
  on_call: { label: 'On Call', color: 'text-blue-500', bg: 'bg-blue-500/10', dot: 'bg-blue-500' },
  break: { label: 'On Break', color: 'text-amber-500', bg: 'bg-amber-500/10', dot: 'bg-amber-500' },
  offline: { label: 'Offline', color: 'text-[var(--text-muted)]', bg: 'bg-[var(--surface-hover)]', dot: 'bg-[var(--text-muted)]' },
  overloaded: { label: 'Overloaded', color: 'text-red-500', bg: 'bg-red-500/10', dot: 'bg-red-500' },
};

export const roleLabels: Record<StaffMember['role'], string> = {
  intake_specialist: 'Intake Specialist',
  senior_intake: 'Senior Intake',
  intake_manager: 'Intake Manager',
  receptionist: 'Receptionist',
};
