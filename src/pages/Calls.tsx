import { useState, useEffect } from 'react';
import { Play, Download, ExternalLink, Clock, PhoneIncoming, PhoneOutgoing, PhoneMissed, Voicemail, Bot, Shield, ArrowRightLeft, ThumbsUp, ThumbsDown, Volume2, Loader2 } from 'lucide-react';
import { Badge, Button, Card } from '@/components/ui';
import { formatDateTime, formatDuration, formatPhone, capitalize } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import type { Call } from '@/types';

const getStatusBadgeVariant = (status: string): 'default' | 'secondary' | 'success' | 'destructive' | 'warning' => {
  switch (status) {
    case 'completed': return 'success';
    case 'missed': return 'destructive';
    case 'voicemail': return 'warning';
    default: return 'secondary';
  }
};

const getCallIcon = (direction: string, status: string) => {
  if (status === 'missed') return <PhoneMissed size={18} />;
  if (status === 'voicemail') return <Voicemail size={18} />;
  return direction === 'inbound' ? <PhoneIncoming size={18} /> : <PhoneOutgoing size={18} />;
};

export function Calls() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCalls() {
      setLoading(true);
      const { data, error } = await supabase
        .from('calls')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setCalls(data as unknown as Call[]);
      }
      setLoading(false);
    }
    fetchCalls();
  }, []);

  const todayCalls = calls.filter(c => {
    const today = new Date().toDateString();
    return new Date(c.created_at).toDateString() === today;
  });
  const completedToday = todayCalls.filter(c => c.status === 'completed').length;
  const missedToday = todayCalls.filter(c => c.status === 'missed').length;
  const avgDuration = todayCalls.length > 0
    ? Math.round(todayCalls.reduce((sum, c) => sum + (c.duration || 0), 0) / todayCalls.length)
    : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Calls</h1>
          <p className="text-[var(--text-secondary)] mt-1">View and manage call records</p>
        </div>
        <Button variant="outline">
          <Download size={16} />
          Export
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: 'Total', value: calls.length.toString(), icon: Clock, accent: 'border-blue-500', text: 'text-blue-500', sub: 'All Calls' },
          { label: 'Today', value: todayCalls.length.toString(), icon: PhoneIncoming, accent: 'border-emerald-500', text: 'text-emerald-500', sub: `${completedToday} completed` },
          { label: 'Missed', value: missedToday.toString(), icon: PhoneMissed, accent: 'border-red-500', text: 'text-red-500', sub: 'Today' },
          { label: 'Avg Duration', value: formatDuration(avgDuration), icon: PhoneOutgoing, accent: 'border-indigo-500', text: 'text-indigo-500', sub: 'Today' },
          { label: 'With Recording', value: calls.filter(c => c.recording_url).length.toString(), icon: Volume2, accent: 'border-purple-500', text: 'text-purple-500', sub: 'Available' },
        ].map(stat => (
          <div key={stat.label} className={`bg-[var(--surface)] p-5 border-l-4 ${stat.accent} hover:bg-[var(--surface-hover)] transition-colors`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-semibold">{stat.label}</span>
              <stat.icon size={14} className={stat.text} />
            </div>
            <p className="text-3xl font-bold text-[var(--text-primary)]">{stat.value}</p>
            <p className="text-[10px] text-[var(--text-muted)] mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-[var(--surface)] border-t-[4px] border-emerald-500">
        <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--surface-active)]/20">
          <h2 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wide">Call Log</h2>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">Live Data</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12 gap-2 text-[var(--text-muted)]">
            <Loader2 size={18} className="animate-spin" />
            <span className="text-sm">Loading calls...</span>
          </div>
        ) : calls.length === 0 ? (
          <div className="text-center py-12 text-[var(--text-muted)] text-sm">
            No calls recorded yet.
          </div>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {calls.map((call) => {
              const isCallRail = !!call.callrail_id;
              const isRegal = !!call.regal_id;
              return (
                <div key={call.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 hover:bg-[var(--surface-hover)] transition-colors group">
                  <div className="flex items-start gap-4 min-w-0">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--background)] ${call.status === 'missed' ? 'text-red-500' :
                        call.status === 'voicemail' ? 'text-amber-500' :
                          call.direction === 'inbound' ? 'text-emerald-500' : 'text-blue-500'
                      }`}>
                      {getCallIcon(call.direction, call.status)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-bold text-[var(--text-primary)] font-mono text-sm">{formatPhone(call.caller_number)}</p>
                        <Badge variant={getStatusBadgeVariant(call.status)} className="h-5 text-[9px] px-1.5 uppercase tracking-widest font-bold">
                          {capitalize(call.status)}
                        </Badge>

                        {isCallRail && (
                          <span className="text-[9px] font-bold text-blue-400 border border-blue-500/30 bg-blue-500/10 px-1.5 py-0.5 rounded">
                            CALLRAIL
                          </span>
                        )}
                        {isRegal && (
                          <span className="text-[9px] font-bold text-purple-400 border border-purple-500/30 bg-purple-500/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                            <Bot size={10} /> REGAL
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-1.5">
                        {call.notes && (
                          <p className="text-xs text-[var(--text-secondary)] truncate max-w-[280px]">
                            {call.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 sm:min-w-[150px]">
                    <div className="text-right">
                      <p className="text-xs font-mono text-[var(--text-primary)]">{formatDuration(call.duration ?? 0)}</p>
                      <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{formatDateTime(call.created_at)}</p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {call.recording_url && (
                        <a href={call.recording_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[var(--surface-active)]">
                            <Play size={14} className="text-emerald-500" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
