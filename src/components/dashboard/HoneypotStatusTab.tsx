import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Eye, Phone, Clock, Bell, Lock, UserX, Wifi, Monitor, MapPin, Fingerprint, FileSearch, Loader2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { formatDate } from '@/lib/utils';

interface HoneypotRecord {
  id: string;
  fakeName: string;
  caseType: string;
  description: string;
  burnerPhone: string;
  phoneService: string;
  status: 'active' | 'alert' | 'dormant';
  lastAccessed: string | null;
  accessedBy: string | null;
  accessCount: number;
  createdDate: string;
  accessLog: { time: string; action: string; user: string; ip: string; device: string; type: 'access' | 'call' | 'alert' }[];
  threatAnalysis: string | null;
  burnerActivity: { type: 'call' | 'text' | 'voicemail'; from: string; time: string; content: string }[];
  plantedIn: string[];
  coverStory: string;
}

function timeAgo(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min${mins > 1 ? 's' : ''} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs > 1 ? 's' : ''} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

const statusConfig = {
  alert: { icon: AlertTriangle, label: 'ALERT', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30', dot: 'bg-red-500' },
  active: { icon: Eye, label: 'Active', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
  dormant: { icon: Clock, label: 'Dormant', color: 'text-[var(--text-muted)]', bg: 'bg-[var(--surface-hover)]', border: 'border-[var(--border)]', dot: 'bg-[var(--text-muted)]' },
};

const accessTypeConfig = {
  access: { color: 'text-amber-500', dot: 'bg-amber-500' },
  call: { color: 'text-red-500', dot: 'bg-red-500' },
  alert: { color: 'text-red-500', dot: 'bg-red-500' },
};

export function HoneypotStatusTab() {
  const [selectedHoneypot, setSelectedHoneypot] = useState<HoneypotRecord | null>(null);
  const [honeypots, setHoneypots] = useState<HoneypotRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHoneypots() {
      setLoading(true);
      const { data, error } = await supabase
        .from('honeypots')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        const mapped: HoneypotRecord[] = data.map((hp: any) => {
          // Map 'triggered' status from DB to 'alert' for display
          let status: 'active' | 'alert' | 'dormant' = hp.status === 'triggered' ? 'alert' : hp.status as any;
          return {
            id: hp.id,
            fakeName: hp.fake_name,
            caseType: hp.case_type,
            description: hp.description,
            burnerPhone: hp.burner_phone,
            phoneService: hp.phone_service,
            status,
            lastAccessed: hp.last_accessed ? timeAgo(hp.last_accessed) : null,
            accessedBy: hp.accessed_by,
            accessCount: hp.access_count,
            createdDate: formatDate(hp.created_at),
            accessLog: (hp.access_log || []) as any[],
            threatAnalysis: hp.threat_analysis,
            burnerActivity: (hp.burner_activity || []) as any[],
            plantedIn: hp.planted_in || [],
            coverStory: hp.cover_story || '',
          };
        });
        setHoneypots(mapped);
      }
      setLoading(false);
    }
    fetchHoneypots();
  }, []);

  const alerted = honeypots.filter(h => h.status === 'alert');
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

      {/* Live data badge */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-emerald-500 font-bold">LIVE DATA</span>
        <span className="text-[var(--text-muted)]">·</span>
        <span className="text-[var(--text-secondary)]">Honeypots loaded from database</span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12 gap-2 text-[var(--text-muted)]">
          <Loader2 size={18} className="animate-spin" />
          <span className="text-sm">Loading honeypots...</span>
        </div>
      ) : (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl border ${alerted.length > 0 ? 'border-red-500/30 bg-red-500/5' : 'border-[var(--border)] bg-[var(--surface)]'}`}>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={14} className="text-red-500" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">Alert</span>
              </div>
              <p className={`text-3xl font-bold ${alerted.length > 0 ? 'text-red-500' : 'text-[var(--text-primary)]'}`}>{alerted.length}</p>
              {alerted.length > 0 && (
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

          {/* Alert Banner (if any) */}
          {alerted.map((hp) => (
            <div
              key={hp.id}
              onClick={() => setSelectedHoneypot(hp)}
              className="rounded-xl border-2 border-red-500/40 bg-red-500/5 p-5 space-y-4 animate-in fade-in cursor-pointer hover:bg-red-500/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-sm font-bold text-red-500 uppercase tracking-wider">🚨 Honeypot Alert</span>
                </div>
                <span className="text-[10px] font-mono text-red-500">{hp.lastAccessed}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">Fake Lead</p>
                  <p className="text-sm font-bold text-[var(--text-primary)]">{hp.fakeName}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{hp.caseType}</p>
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
                      className={`p-4 hover:bg-[var(--surface-hover)] transition-colors cursor-pointer group ${hp.status === 'alert' ? 'bg-red-500/5' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono text-[var(--text-muted)]">{hp.id.slice(0, 8)}</span>
                            <span className={`flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${config.bg} ${config.color}`}>
                              <StatusIcon size={8} />
                              {config.label}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">{hp.fakeName}</p>
                          <p className="text-xs text-[var(--text-secondary)] mt-0.5">{hp.caseType}</p>
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
        </>
      )}

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
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">{hp.id.slice(0, 8)}</span>
                        <span className={`flex items-center gap-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${config.bg} ${config.color}`}>
                          <StatusIcon size={8} />
                          {config.label}
                        </span>
                      </div>
                      <SheetTitle className="text-lg font-bold text-[var(--text-primary)]">{hp.fakeName}</SheetTitle>
                      <p className="text-xs text-[var(--text-secondary)]">{hp.caseType}</p>
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


                {/* Access Log Timeline */}
                {hp.accessLog.length > 0 && (
                  <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                      Access Log ({hp.accessLog.length} events)
                    </h4>
                    <div className="space-y-0">
                      {hp.accessLog.map((evt, i) => {
                        const evtConfig = accessTypeConfig[evt.type] || accessTypeConfig.access;
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
