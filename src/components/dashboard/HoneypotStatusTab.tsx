import { useState } from 'react';
import { Shield, AlertTriangle, Eye, Phone, Clock, Bell, Lock, UserX, Wifi, Monitor, MapPin, Fingerprint, FileSearch } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface HoneypotRecord {
  id: string;
  fakeName: string;
  caseType: string;
  description: string;
  burnerPhone: string;
  phoneService: 'Burner' | 'TextMe' | 'TextNow';
  status: 'active' | 'triggered' | 'dormant';
  lastAccessed: string | null;
  accessedBy: string | null;
  accessCount: number;
  createdDate: string;
  caseValue: string;
  // Detail data
  accessLog: { time: string; action: string; user: string; ip: string; device: string; type: 'access' | 'export' | 'call' | 'alert' }[];
  threatAnalysis: string | null;
  burnerActivity: { type: 'call' | 'text' | 'voicemail'; from: string; time: string; content: string }[];
  plantedIn: string[];
  coverStory: string;
}

const honeypots: HoneypotRecord[] = [
  {
    id: 'HP-001',
    fakeName: 'Maria Delgado',
    caseType: 'Premises Liability, Commercial & Catastrophic',
    description: 'Around 10:15pm at a Chevron gas station — dark area, no lighting. Tripped on a raised curb while walking to pump. Right hip fractured. Two bystanders called 911 and notified cashier. Emergency hip replacement surgery, 16 days ICU, 5 days regular care.',
    burnerPhone: '(408) 555-0177',
    phoneService: 'Burner',
    status: 'triggered',
    lastAccessed: '22 mins ago',
    accessedBy: 'Aisha Williams',
    accessCount: 5,
    createdDate: '2026-02-10',
    caseValue: '$2,800,000',
    accessLog: [
      { time: 'Feb 13, 11:02 AM', action: 'Viewed full case record including contact details', user: 'Aisha Williams', ip: '192.168.1.47', device: 'Chrome / Windows — Office Workstation', type: 'access' },
      { time: 'Feb 13, 11:03 AM', action: 'Copied phone number to clipboard', user: 'Aisha Williams', ip: '192.168.1.47', device: 'Chrome / Windows — Office Workstation', type: 'access' },
      { time: 'Feb 13, 11:05 AM', action: 'Exported case summary to PDF', user: 'Aisha Williams', ip: '192.168.1.47', device: 'Chrome / Windows — Office Workstation', type: 'export' },
      { time: 'Feb 13, 11:09 AM', action: 'Downloaded full intake record with medical details', user: 'Aisha Williams', ip: '192.168.1.47', device: 'Chrome / Windows — Office Workstation', type: 'export' },
      { time: 'Feb 13, 11:14 AM', action: 'Burner phone received incoming call from (510) 555-0342', user: 'Unknown External', ip: 'N/A', device: 'N/A', type: 'call' },
      { time: 'Feb 13, 11:14 AM', action: '🚨 SECURITY ALERT: Honeypot phone contacted — insider confirmed', user: 'System', ip: 'N/A', device: 'N/A', type: 'alert' },
    ],
    threatAnalysis: 'Aisha Williams accessed the honeypot record at 11:02 AM, copied the phone number, and exported both the case summary and full intake record. Within 12 minutes, the burner phone received an inbound call from (510) 555-0342 — a number linked to Rivera & Associates, a competing PI firm. This confirms a pre-established referral channel. Cross-referencing shows Aisha accessed 4 other high-value premises liability cases this month that she was not assigned to.',
    burnerActivity: [
      { type: 'call', from: '(510) 555-0342', time: 'Feb 13, 11:14 AM', content: 'Incoming call — 18 seconds. Caller asked for "Maria" regarding her gas station fall. Voicemail left.' },
      { type: 'voicemail', from: '(510) 555-0342', time: 'Feb 13, 11:14 AM', content: '"Hi Maria, this is Tony from Rivera & Associates. I understand you had a serious fall at a gas station. We specialize in premises liability and would love to help. Please call me back."' },
    ],
    plantedIn: ['Litify CRM', 'Intaker Queue', 'CallRail Recent Calls'],
    coverStory: 'Premises liability case at a major gas station chain. Catastrophic injury (hip replacement, extended ICU stay) with high case value. Dark conditions and no lighting create clear liability. Designed to be irresistible to lead theft — commercial defendant, high damages, sympathetic plaintiff.',
  },
  {
    id: 'HP-002',
    fakeName: 'Jorge Reyes',
    caseType: 'Premises Liability, Substantial Injury Major',
    description: 'Bicyclist struck a 5-inch raised cement obstruction on sidewalk — unfinished construction, no warning signs. Right leg broken, surgery on right knee. Hospitalized 8 days, currently in rehab facility. Witnesses available.',
    burnerPhone: '(714) 555-0263',
    phoneService: 'TextMe',
    status: 'active',
    lastAccessed: null,
    accessedBy: null,
    accessCount: 0,
    createdDate: '2026-02-12',
    caseValue: '$1,400,000',
    accessLog: [],
    threatAnalysis: null,
    burnerActivity: [],
    plantedIn: ['Litify CRM', 'Intaker Queue'],
    coverStory: 'Sidewalk defect premises liability — city or construction company defendant. Unfinished cement hazard with no signage creates strong liability. Knee surgery plus extended rehab drives case value. Planted as a recent intake with photos pending.',
  },
  {
    id: 'HP-003',
    fakeName: 'Linda Tran',
    caseType: 'Auto MVA, Death',
    description: 'Decedent was traveling on the 10 freeway, rear-ended by a commercial semi-truck at highway speed. Killed on scene. CHP report confirms truck driver at fault. Multiple witnesses.',
    burnerPhone: '(626) 555-0198',
    phoneService: 'TextNow',
    status: 'active',
    lastAccessed: null,
    accessedBy: null,
    accessCount: 0,
    createdDate: '2026-01-28',
    caseValue: '$5,200,000',
    accessLog: [],
    threatAnalysis: null,
    burnerActivity: [],
    plantedIn: ['Litify CRM', 'Internal Reports', 'CallRail Recent Calls'],
    coverStory: 'Wrongful death auto case with commercial truck involvement. Highest-value honeypot — $5.2M estimated. Death cases with commercial defendants are the most sought-after by lead buyers. Planted across 3 systems for maximum detection.',
  },
  {
    id: 'HP-004',
    fakeName: 'Sandra Okafor',
    caseType: 'Auto MVA, Death Commercial',
    description: 'Vehicle had a known wiring recall (repair appointment was scheduled). Car lost control — computer system shut off, auto-stop failed, airbags did not deploy. Driver struck a wall and was killed. Manufacturer defect suspected.',
    burnerPhone: '(818) 555-0144',
    phoneService: 'Burner',
    status: 'active',
    lastAccessed: null,
    accessedBy: null,
    accessCount: 0,
    createdDate: '2026-01-20',
    caseValue: '$6,500,000',
    accessLog: [],
    threatAnalysis: null,
    burnerActivity: [],
    plantedIn: ['Litify CRM', 'Intaker Queue'],
    coverStory: 'Product liability / wrongful death hybrid — vehicle recall with documented failure. Airbag non-deployment plus manufacturer defect creates massive case value. The recall appointment detail adds urgency and sympathy. Extremely attractive to competing firms.',
  },
  {
    id: 'HP-005',
    fakeName: 'Rosa Gutierrez',
    caseType: 'Auto MVA, Catastrophic',
    description: 'Traveling straight on a main boulevard when defendant turned left into a parking lot, causing head-on collision. Kidney surgery required, hospitalized since incident. Expected 2+ more weeks in rehabilitation. Will be wheelchair-bound for extended period.',
    burnerPhone: '(562) 555-0211',
    phoneService: 'TextMe',
    status: 'active',
    lastAccessed: null,
    accessedBy: null,
    accessCount: 0,
    createdDate: '2026-02-05',
    caseValue: '$3,100,000',
    accessLog: [],
    threatAnalysis: null,
    burnerActivity: [],
    plantedIn: ['Litify CRM', 'CallRail Recent Calls', 'Intaker Queue'],
    coverStory: 'Catastrophic auto MVA with clear liability (defendant turned left into oncoming traffic). Kidney surgery, extended hospitalization, and wheelchair-bound recovery. Planted across 3 systems with high urgency indicators.',
  },
  {
    id: 'HP-006',
    fakeName: 'Amara Jenkins',
    caseType: 'Dog Bite, Catastrophic Commercial',
    description: 'Minor child bitten on face while in foster care — chin, left cheek puncture wounds, lip torn in half, permanent scarring. Dog had prior bite history including severing a finger. Dog was euthanized. Mother was never notified of incident.',
    burnerPhone: '(323) 555-0199',
    phoneService: 'Burner',
    status: 'active',
    lastAccessed: null,
    accessedBy: null,
    accessCount: 0,
    createdDate: '2026-02-08',
    caseValue: '$2,200,000',
    accessLog: [],
    threatAnalysis: null,
    burnerActivity: [],
    plantedIn: ['Litify CRM', 'Intaker Queue'],
    coverStory: 'Child victim dog bite in foster care — extremely sympathetic case with institutional negligence angle. Prior bite history on the dog creates clear liability. Facial scarring on a minor drives high damages. Emotional case type makes it a prime target for lead theft.',
  },
  {
    id: 'HP-007',
    fakeName: 'Kevin Nakamura',
    caseType: 'Wage & Hour',
    description: 'Night auditor / front desk at a major hotel chain. Never provided meal or rest breaks during overnight shifts. Systematic violations across multiple pay periods.',
    burnerPhone: '(408) 555-0288',
    phoneService: 'TextNow',
    status: 'dormant',
    lastAccessed: '45 days ago',
    accessedBy: null,
    accessCount: 0,
    createdDate: '2025-12-15',
    caseValue: '$180,000',
    accessLog: [],
    threatAnalysis: null,
    burnerActivity: [],
    plantedIn: ['Litify CRM'],
    coverStory: 'Wage & hour case against a hotel chain — lower value but tests whether agents are also skimming employment cases. Night shift worker denied breaks is a common, credible scenario. Dormant — may need timestamp refresh.',
  },
  {
    id: 'HP-008',
    fakeName: 'Derek Lawson',
    caseType: 'Wage & Hour',
    description: 'Car salesman at a dealership. Required to attend unpaid pre-shift meetings, purchased work laptop with own funds, consistently interrupted during meal breaks.',
    burnerPhone: '(415) 555-0177',
    phoneService: 'TextMe',
    status: 'dormant',
    lastAccessed: '38 days ago',
    accessedBy: null,
    accessCount: 0,
    createdDate: '2025-12-20',
    caseValue: '$220,000',
    accessLog: [],
    threatAnalysis: null,
    burnerActivity: [],
    plantedIn: ['Litify CRM'],
    coverStory: 'Employment case against an auto dealership — multiple wage violations including off-the-clock work and expense reimbursement. Lower priority honeypot for detecting employment-case-specific theft patterns. Dormant — needs refresh.',
  },
];

const statusConfig = {
  triggered: { icon: AlertTriangle, label: 'TRIGGERED', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30', dot: 'bg-red-500' },
  active: { icon: Eye, label: 'Active', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
  dormant: { icon: Clock, label: 'Dormant', color: 'text-[var(--text-muted)]', bg: 'bg-[var(--surface-hover)]', border: 'border-[var(--border)]', dot: 'bg-[var(--text-muted)]' },
};

const accessTypeConfig = {
  access: { color: 'text-amber-500', dot: 'bg-amber-500' },
  export: { color: 'text-red-500', dot: 'bg-red-500' },
  call: { color: 'text-red-500', dot: 'bg-red-500' },
  alert: { color: 'text-red-500', dot: 'bg-red-500' },
};

export function HoneypotStatusTab() {
  const [selectedHoneypot, setSelectedHoneypot] = useState<HoneypotRecord | null>(null);

  const triggered = honeypots.filter(h => h.status === 'triggered');
  const active = honeypots.filter(h => h.status === 'active');
  const dormant = honeypots.filter(h => h.status === 'dormant');

  return (
    <div className="space-y-6">

      {/* Concept Explainer */}
      <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-start gap-4">
        <div className="p-2.5 rounded-lg bg-amber-500/10 shrink-0">
          <Shield size={18} className="text-amber-500" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">Honeypot System</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            High-value fake leads planted in the system to detect insider threats. Each honeypot uses a burner phone number
            (Burner / TextMe / TextNow) that can receive calls and texts. Any access to honeypot data
            instantly triggers a security alert — identifying both the insider <strong>and</strong> who is paying them.
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className={`p-4 rounded-xl border ${triggered.length > 0 ? 'border-red-500/30 bg-red-500/5' : 'border-[var(--border)] bg-[var(--surface)]'}`}>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={14} className="text-red-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">Triggered</span>
          </div>
          <p className={`text-3xl font-bold ${triggered.length > 0 ? 'text-red-500' : 'text-[var(--text-primary)]'}`}>{triggered.length}</p>
          {triggered.length > 0 && (
            <p className="text-[10px] text-red-500 mt-1 font-mono animate-pulse">⚠ IMMEDIATE ACTION REQUIRED</p>
          )}
        </div>
        <div className="p-4 rounded-xl border border-emerald-500/20 bg-[var(--surface)]">
          <div className="flex items-center gap-2 mb-2">
            <Eye size={14} className="text-emerald-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Active Traps</span>
          </div>
          <p className="text-3xl font-bold text-[var(--text-primary)]">{active.length}</p>
          <p className="text-[10px] text-[var(--text-muted)] mt-1 font-mono">Monitoring</p>
        </div>
        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={14} className="text-[var(--text-muted)]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Dormant</span>
          </div>
          <p className="text-3xl font-bold text-[var(--text-primary)]">{dormant.length}</p>
          <p className="text-[10px] text-[var(--text-muted)] mt-1 font-mono">Needs refresh</p>
        </div>
      </div>

      {/* Triggered Alert (if any) */}
      {triggered.map((hp) => (
        <div
          key={hp.id}
          onClick={() => setSelectedHoneypot(hp)}
          className="rounded-xl border-2 border-red-500/40 bg-red-500/5 p-5 space-y-4 animate-in fade-in cursor-pointer hover:bg-red-500/10 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-bold text-red-500 uppercase tracking-wider">🚨 Honeypot Triggered — {hp.id}</span>
            </div>
            <span className="text-[10px] font-mono text-red-500">{hp.lastAccessed}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">Fake Lead</p>
              <p className="text-sm font-bold text-[var(--text-primary)]">{hp.fakeName}</p>
              <p className="text-xs text-[var(--text-secondary)]">{hp.caseType} — {hp.caseValue}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">Accessed By</p>
              <div className="flex items-center gap-2">
                <UserX size={14} className="text-red-500" />
                <p className="text-sm font-bold text-red-500">{hp.accessedBy}</p>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">{hp.accessCount} access events logged</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs">
              <Phone size={12} className="text-[var(--text-muted)]" />
              <span className="font-mono text-[var(--text-primary)]">{hp.burnerPhone}</span>
              <span className="text-[10px] text-[var(--text-muted)]">({hp.phoneService})</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
              <Bell size={12} />
              <span>Click for full investigation →</span>
            </div>
          </div>
        </div>
      ))}

      {/* All Honeypots List */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <Lock size={14} />
          All Honeypot Records
        </h3>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
          <div className="divide-y divide-[var(--border)]">
            {honeypots.map((hp) => {
              const config = statusConfig[hp.status];
              const StatusIcon = config.icon;

              return (
                <div
                  key={hp.id}
                  onClick={() => setSelectedHoneypot(hp)}
                  className={`p-4 hover:bg-[var(--surface-hover)] transition-colors cursor-pointer group ${hp.status === 'triggered' ? 'bg-red-500/5' : ''}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">{hp.id}</span>
                        <span className={`flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${config.bg} ${config.color}`}>
                          <StatusIcon size={8} />
                          {config.label}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">{hp.fakeName}</p>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">{hp.caseType} — {hp.caseValue}</p>
                    </div>
                    <div className="text-right shrink-0 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Phone size={10} className="text-[var(--text-muted)]" />
                        <span className="font-mono text-[var(--text-primary)]">{hp.burnerPhone}</span>
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)]">{hp.phoneService}</p>
                      {hp.accessedBy && (
                        <div className="flex items-center gap-1 text-[10px] text-red-500 font-bold">
                          <UserX size={10} />
                          {hp.accessedBy}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      <Sheet open={!!selectedHoneypot} onOpenChange={(open) => !open && setSelectedHoneypot(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto bg-[var(--background)] border-[var(--border)]">
          {selectedHoneypot && (() => {
            const hp = selectedHoneypot;
            const config = statusConfig[hp.status];
            const StatusIcon = config.icon;

            return (
              <div className="space-y-6 pt-2">
                <SheetHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">{hp.id}</span>
                        <span className={`flex items-center gap-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${config.bg} ${config.color}`}>
                          <StatusIcon size={8} />
                          {config.label}
                        </span>
                      </div>
                      <SheetTitle className="text-lg font-bold text-[var(--text-primary)]">{hp.fakeName}</SheetTitle>
                      <p className="text-xs text-[var(--text-secondary)]">{hp.caseType} — {hp.caseValue}</p>
                    </div>
                  </div>
                </SheetHeader>

                {/* Cover Story */}
                <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2 flex items-center gap-2">
                    <FileSearch size={12} />
                    Cover Story / Bait Design
                  </h4>
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed">{hp.coverStory}</p>
                </div>

                {/* Planted Locations */}
                <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2 flex items-center gap-2">
                    <MapPin size={12} />
                    Planted In
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {hp.plantedIn.map((system, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-1 rounded bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border)]">
                        {system}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Burner Phone Info */}
                <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3 flex items-center gap-2">
                    <Phone size={12} />
                    Burner Phone
                  </h4>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-lg font-mono font-bold text-[var(--text-primary)]">{hp.burnerPhone}</span>
                    <span className="text-xs px-2 py-1 rounded bg-[var(--surface-hover)] text-[var(--text-secondary)]">{hp.phoneService}</span>
                  </div>

                  {hp.burnerActivity.length > 0 ? (
                    <div className="space-y-3">
                      <p className="text-[10px] font-bold uppercase text-red-500">📞 Incoming Activity Detected</p>
                      {hp.burnerActivity.map((activity, i) => (
                        <div key={i} className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold text-red-500 uppercase">
                              {activity.type === 'call' ? '📞 Call' : activity.type === 'text' ? '💬 Text' : '📨 Voicemail'}
                            </span>
                            <span className="text-[10px] font-mono text-[var(--text-muted)]">{activity.time}</span>
                          </div>
                          <p className="text-xs text-[var(--text-secondary)]">From: <span className="font-mono text-[var(--text-primary)]">{activity.from}</span></p>
                          <p className="text-xs text-[var(--text-primary)] mt-2 p-2 rounded bg-[var(--surface)] border border-[var(--border)] italic">"{activity.content}"</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[var(--text-muted)]">No incoming activity — phone number has not been contacted.</p>
                  )}
                </div>

                {/* Threat Analysis (if triggered) */}
                {hp.threatAnalysis && (
                  <div className="p-4 rounded-xl border-2 border-red-500/30 bg-red-500/5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2 flex items-center gap-2">
                      <Fingerprint size={12} />
                      🔍 Threat Analysis
                    </h4>
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed">{hp.threatAnalysis}</p>
                  </div>
                )}

                {/* Access Log Timeline */}
                {hp.accessLog.length > 0 && (
                  <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                      Access Log ({hp.accessLog.length} events)
                    </h4>
                    <div className="space-y-0">
                      {hp.accessLog.map((evt, i) => {
                        const evtConfig = accessTypeConfig[evt.type];
                        return (
                          <div key={i} className="flex gap-3 py-3 border-b border-[var(--border)] last:border-0">
                            <div className="flex flex-col items-center pt-1.5">
                              <div className={`h-2.5 w-2.5 rounded-full ${evtConfig.dot} ${evt.type === 'alert' ? 'animate-pulse' : ''}`} />
                              {i < hp.accessLog.length - 1 && <div className="w-px flex-1 bg-[var(--border)] mt-1" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs font-medium ${evtConfig.color}`}>{evt.action}</p>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                                <span className="text-[10px] font-mono text-[var(--text-muted)]">{evt.time}</span>
                                {evt.user !== 'System' && (
                                  <span className="flex items-center gap-1 text-[10px] text-[var(--text-secondary)]">
                                    <UserX size={9} />
                                    {evt.user}
                                  </span>
                                )}
                                {evt.ip !== 'N/A' && (
                                  <span className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                                    <Wifi size={9} />
                                    {evt.ip}
                                  </span>
                                )}
                                {evt.device !== 'N/A' && (
                                  <span className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                                    <Monitor size={9} />
                                    {evt.device}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                    <p className="text-[9px] font-bold uppercase text-[var(--text-muted)]">Created</p>
                    <p className="text-xs font-bold text-[var(--text-primary)] mt-1">{hp.createdDate}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                    <p className="text-[9px] font-bold uppercase text-[var(--text-muted)]">Access Count</p>
                    <p className={`text-xs font-bold mt-1 ${hp.accessCount > 0 ? 'text-red-500' : 'text-[var(--text-primary)]'}`}>{hp.accessCount} events</p>
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
