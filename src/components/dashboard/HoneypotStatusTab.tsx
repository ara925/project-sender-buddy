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
    fakeName: 'Carlos Mendoza',
    caseType: 'Commercial Vehicle Accident',
    description: 'Sideswiped by a Coca-Cola delivery truck on I-405. Multiple witnesses. $2.3M estimated damages.',
    burnerPhone: '(323) 555-0199',
    phoneService: 'Burner',
    status: 'triggered',
    lastAccessed: '14 mins ago',
    accessedBy: 'Aisha Williams',
    accessCount: 4,
    createdDate: '2024-01-15',
    caseValue: '$2,300,000',
    accessLog: [
      { time: 'Feb 12, 12:44 PM', action: 'Viewed full case record including contact details', user: 'Aisha Williams', ip: '192.168.1.47', device: 'Chrome / Windows — Office Workstation', type: 'access' },
      { time: 'Feb 12, 12:45 PM', action: 'Copied phone number to clipboard', user: 'Aisha Williams', ip: '192.168.1.47', device: 'Chrome / Windows — Office Workstation', type: 'access' },
      { time: 'Feb 12, 12:48 PM', action: 'Exported case summary to PDF', user: 'Aisha Williams', ip: '192.168.1.47', device: 'Chrome / Windows — Office Workstation', type: 'export' },
      { time: 'Feb 12, 12:52 PM', action: 'Burner phone received incoming call from (213) 555-0888', user: 'Unknown External', ip: 'N/A', device: 'N/A', type: 'call' },
      { time: 'Feb 12, 12:52 PM', action: '🚨 SECURITY ALERT: Honeypot phone contacted — insider confirmed', user: 'System', ip: 'N/A', device: 'N/A', type: 'alert' },
    ],
    threatAnalysis: 'Aisha Williams accessed the honeypot record at 12:44 PM, copied the phone number, and exported the case summary. Within 8 minutes, the burner phone received an inbound call from (213) 555-0888 — a number not associated with any firm employee. This strongly suggests Aisha shared the lead data with an external party (likely a competing firm or lead buyer). The speed of the external contact indicates a pre-established relationship, not a one-time leak. Cross-referencing with her access history shows she has also viewed 3 other high-value PI cases in the last week that she was not assigned to.',
    burnerActivity: [
      { type: 'call', from: '(213) 555-0888', time: 'Feb 12, 12:52 PM', content: 'Incoming call — 22 seconds. Caller asked for "Carlos" and inquired about the truck accident case. Voicemail left.' },
      { type: 'voicemail', from: '(213) 555-0888', time: 'Feb 12, 12:52 PM', content: '"Hi Carlos, this is Mike from Pacific Legal Associates. I heard about your accident and wanted to see if you need representation. Please call me back at this number."' },
    ],
    plantedIn: ['Litify CRM', 'Intaker Queue', 'CallRail Recent Calls'],
    coverStory: 'Case planted as a recent high-value intake from a Coca-Cola truck accident. Designed to be irresistible to lead theft — brand-name defendant, high damages, clear liability. Phone number routes to a Burner app monitored by security.',
  },
  {
    id: 'HP-002',
    fakeName: 'Jennifer Park',
    caseType: 'Workplace Injury',
    description: 'Construction site fall at Amazon warehouse. Employer negligence. Full disability claim.',
    burnerPhone: '(310) 555-0247',
    phoneService: 'TextMe',
    status: 'active',
    lastAccessed: null,
    accessedBy: null,
    accessCount: 0,
    createdDate: '2024-02-01',
    caseValue: '$1,800,000',
    accessLog: [],
    threatAnalysis: null,
    burnerActivity: [],
    plantedIn: ['Litify CRM', 'Intaker Queue'],
    coverStory: 'Fake workplace injury claim against Amazon. High media value and employer negligence angle designed to attract attention. TextMe number monitored for any contact.',
  },
  {
    id: 'HP-003',
    fakeName: 'David Richardson',
    caseType: 'Medical Malpractice',
    description: 'Surgical error at Cedars-Sinai. Clear liability. Celebrity-adjacent case.',
    burnerPhone: '(818) 555-0183',
    phoneService: 'TextNow',
    status: 'active',
    lastAccessed: null,
    accessedBy: null,
    accessCount: 0,
    createdDate: '2024-01-28',
    caseValue: '$3,500,000',
    accessLog: [],
    threatAnalysis: null,
    burnerActivity: [],
    plantedIn: ['Litify CRM', 'Internal Reports'],
    coverStory: 'Medical malpractice at a high-profile hospital. "Celebrity-adjacent" detail increases temptation value. TextNow number configured with voicemail transcription.',
  },
  {
    id: 'HP-004',
    fakeName: 'Rachel Thompson',
    caseType: 'Product Liability',
    description: 'Tesla autopilot malfunction. High media value. Multiple injury victims.',
    burnerPhone: '(424) 555-0156',
    phoneService: 'Burner',
    status: 'dormant',
    lastAccessed: '30 days ago',
    accessedBy: null,
    accessCount: 0,
    createdDate: '2023-12-10',
    caseValue: '$4,200,000',
    accessLog: [],
    threatAnalysis: null,
    burnerActivity: [],
    plantedIn: ['Litify CRM'],
    coverStory: 'Tesla product liability case. Created 2 months ago but no activity — may need refresh with updated timestamps to remain convincing in the system.',
  },
  {
    id: 'HP-005',
    fakeName: 'Marcus Johnson',
    caseType: 'Trucking Accident',
    description: 'FedEx truck rear-end collision on PCH. Spinal injuries. Clear fault.',
    burnerPhone: '(562) 555-0211',
    phoneService: 'TextMe',
    status: 'active',
    lastAccessed: null,
    accessedBy: null,
    accessCount: 0,
    createdDate: '2024-02-05',
    caseValue: '$1,500,000',
    accessLog: [],
    threatAnalysis: null,
    burnerActivity: [],
    plantedIn: ['Litify CRM', 'CallRail Recent Calls', 'Intaker Queue'],
    coverStory: 'FedEx trucking accident with spinal injuries. Planted across 3 systems to maximize detection surface area. TextMe number with auto-reply enabled.',
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
