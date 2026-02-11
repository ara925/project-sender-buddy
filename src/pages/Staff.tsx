import { useState } from 'react';
import { Users, Phone, AlertTriangle, Clock, Coffee, Wifi, WifiOff, PhoneCall, Flame, Search } from 'lucide-react';
import { staffMembers, staffStatusConfig, roleLabels, type StaffStatus } from '@/data/mock-staff';
import { Badge } from '@/components/ui/badge';

const statusIcons: Record<StaffStatus, typeof Users> = {
  available: Wifi,
  on_call: PhoneCall,
  break: Coffee,
  offline: WifiOff,
  overloaded: Flame,
};

export function Staff() {
  const [filter, setFilter] = useState<StaffStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = staffMembers.filter(s => {
    if (filter !== 'all' && s.status !== filter) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const onFloor = staffMembers.filter(s => s.status !== 'offline').length;
  const onCall = staffMembers.filter(s => s.status === 'on_call').length;
  const issues = staffMembers.filter(s => s.issue).length;
  const available = staffMembers.filter(s => s.status === 'available').length;

  const statFilters: { key: StaffStatus | 'all'; label: string; count: number; icon: typeof Users }[] = [
    { key: 'all', label: 'All Staff', count: staffMembers.length, icon: Users },
    { key: 'available', label: 'Available', count: available, icon: Wifi },
    { key: 'on_call', label: 'On Call', count: onCall, icon: PhoneCall },
    { key: 'break', label: 'On Break', count: staffMembers.filter(s => s.status === 'break').length, icon: Coffee },
    { key: 'overloaded', label: 'Overloaded', count: staffMembers.filter(s => s.status === 'overloaded').length, icon: Flame },
    { key: 'offline', label: 'Offline', count: staffMembers.filter(s => s.status === 'offline').length, icon: WifiOff },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Intake Staff</h1>
          <p className="text-[var(--text-secondary)] mt-1">Staff on the floor & real-time availability</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-md bg-[var(--surface)] border border-[var(--border)] flex items-center gap-2">
            <Phone size={14} className="text-[var(--primary)]" />
            <span className="text-xs font-medium text-[var(--text-secondary)]">{onFloor} on floor</span>
          </div>
          {issues > 0 && (
            <div className="px-3 py-1.5 rounded-md bg-red-500/10 border border-red-500/20 flex items-center gap-2">
              <AlertTriangle size={14} className="text-red-500" />
              <span className="text-xs font-medium text-red-500">{issues} issue{issues !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'On Floor', value: onFloor, icon: Users, accent: 'border-blue-500', text: 'text-blue-500' },
          { label: 'On Calls', value: onCall, icon: PhoneCall, accent: 'border-emerald-500', text: 'text-emerald-500' },
          { label: 'Available', value: available, icon: Wifi, accent: 'border-[var(--primary)]', text: 'text-[var(--primary)]' },
          { label: 'Issues', value: issues, icon: AlertTriangle, accent: issues > 0 ? 'border-red-500' : 'border-emerald-500', text: issues > 0 ? 'text-red-500' : 'text-emerald-500' },
        ].map(kpi => (
          <div key={kpi.label} className={`relative overflow-hidden pl-4 pr-4 py-4 bg-[var(--surface)] border-l-4 ${kpi.accent} hover:bg-[var(--surface-hover)] transition-colors`}>
            <div className="flex items-center gap-2 mb-2">
              <kpi.icon size={16} className={kpi.text} />
              <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">{kpi.label}</span>
            </div>
            <span className="text-3xl font-bold text-[var(--text-primary)]">{kpi.value}</span>
          </div>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search staff..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {statFilters.map(sf => (
            <button
              key={sf.key}
              onClick={() => setFilter(sf.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${filter === sf.key
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:bg-[var(--surface-hover)]'
                }`}
            >
              {sf.label} ({sf.count})
            </button>
          ))}
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(member => {
          const config = staffStatusConfig[member.status];
          const StatusIcon = statusIcons[member.status];
          return (
            <div
              key={member.id}
              className={`group bg-[var(--surface)] p-5 border-t-4 hover:bg-[var(--surface-hover)] transition-all ${member.issue ? 'border-red-500' : 'border-transparent hover:border-[var(--primary)]'}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-[var(--surface-active)] flex items-center justify-center text-sm font-bold text-[var(--text-primary)] border border-[var(--border)]">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[var(--surface)] ${config.dot}`} />
                  </div>
                  <div>
                    <p className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">{member.name}</p>
                    <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wide">{roleLabels[member.role]}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${config.bg} ${config.color}`}>
                  <StatusIcon size={12} />
                  {config.label}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-2 rounded bg-[var(--surface-active)]/30">
                  <p className="text-[10px] font-semibold text-[var(--text-muted)] uppercase">Calls</p>
                  <p className="text-sm font-bold text-[var(--text-primary)]">{member.callsToday}</p>
                </div>
                <div className="text-center p-2 rounded bg-[var(--surface-active)]/30">
                  <p className="text-[10px] font-semibold text-[var(--text-muted)] uppercase">Avg</p>
                  <p className="text-sm font-bold text-[var(--text-primary)]">{member.avgHandleTime}</p>
                </div>
                <div className="text-center p-2 rounded bg-[var(--surface-active)]/30">
                  <p className="text-[10px] font-semibold text-[var(--text-muted)] uppercase">Conv</p>
                  <p className="text-sm font-bold text-[var(--text-primary)]">{member.conversionRate > 0 ? `${member.conversionRate}%` : '—'}</p>
                </div>
              </div>

              {/* Skills & Shift */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-wrap gap-1">
                  {member.skills.slice(0, 2).map(skill => (
                    <Badge key={skill} variant="outline" className="text-[10px] px-1.5 py-0 h-5 border-[var(--border)] text-[var(--text-secondary)]">
                      {skill}
                    </Badge>
                  ))}
                  {member.skills.length > 2 && (
                    <span className="text-[10px] text-[var(--text-muted)] self-center">+{member.skills.length - 2}</span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono">
                  <Clock size={12} />
                  <span>{member.shift}</span>
                </div>
              </div>

              {/* Issue Alert */}
              {member.issue && (
                <div className="mt-3 p-2 rounded bg-red-500/10 border-l-2 border-red-500 flex items-start gap-2">
                  <AlertTriangle size={12} className="text-red-500 mt-0.5 shrink-0" />
                  <p className="text-xs font-medium text-red-500">{member.issue}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
