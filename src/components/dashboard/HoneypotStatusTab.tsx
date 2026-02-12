import { Shield, AlertTriangle, CheckCircle2, Eye, Phone, Clock, Bell, Lock, UserX, ExternalLink, Activity } from 'lucide-react';

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
  },
];

const statusConfig = {
  triggered: { icon: AlertTriangle, label: 'TRIGGERED', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30', dot: 'bg-red-500' },
  active: { icon: Eye, label: 'Active', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
  dormant: { icon: Clock, label: 'Dormant', color: 'text-[var(--text-muted)]', bg: 'bg-[var(--surface-hover)]', border: 'border-[var(--border)]', dot: 'bg-[var(--text-muted)]' },
};

export function HoneypotStatusTab() {
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
        <div key={hp.id} className="rounded-xl border-2 border-red-500/40 bg-red-500/5 p-5 space-y-4 animate-in fade-in">
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

          <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
            <p className="text-xs text-[var(--text-secondary)]">{hp.description}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs">
              <Phone size={12} className="text-[var(--text-muted)]" />
              <span className="font-mono text-[var(--text-primary)]">{hp.burnerPhone}</span>
              <span className="text-[10px] text-[var(--text-muted)]">({hp.phoneService})</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
              <Bell size={12} />
              <span>Security team notified</span>
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
                <div key={hp.id} className={`p-4 hover:bg-[var(--surface-hover)] transition-colors ${hp.status === 'triggered' ? 'bg-red-500/5' : ''}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">{hp.id}</span>
                        <span className={`flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${config.bg} ${config.color}`}>
                          <StatusIcon size={8} />
                          {config.label}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-[var(--text-primary)]">{hp.fakeName}</p>
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
    </div>
  );
}
