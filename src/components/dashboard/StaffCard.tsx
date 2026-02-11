import { useState } from 'react';
import { AlertTriangle, Clock, ChevronDown, Headset } from 'lucide-react';
import { staffMembers } from '@/data/mock-staff';
import { Link } from 'react-router-dom';

export function StaffCard() {
  const [expanded, setExpanded] = useState(false);

  const staffIssues = staffMembers.filter(s => s.issue);
  const onFloor = staffMembers.filter(s => s.status !== 'offline').length;
  const hasIssues = staffIssues.length > 0;

  return (
    <div className={`rounded-xl border bg-[var(--surface)] overflow-hidden transition-all ${hasIssues ? 'border-red-500/20' : 'border-emerald-500/20'}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[var(--surface-hover)] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${hasIssues ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}>
            <Headset size={16} className={hasIssues ? 'text-red-500' : 'text-emerald-500'} />
          </div>
          <div className="text-left">
            <h2 className="text-sm font-semibold text-[var(--text-primary)] leading-tight">
              {hasIssues ? `${staffIssues.length} Staff Issue${staffIssues.length > 1 ? 's' : ''}` : 'All Staff Normal'}
            </h2>
            <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
              {onFloor} on floor
              {hasIssues && <span className="text-red-500"> · {staffIssues.length} need attention</span>}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-0.5">
            {staffMembers.filter(s => s.status !== 'offline').map(s => (
              <span key={s.id} className={`h-1.5 w-1.5 rounded-full ${s.issue ? 'bg-red-500' : 'bg-emerald-500'}`} />
            ))}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
            <Clock size={10} />
            <span className="hidden sm:inline">Live</span>
          </div>
          <ChevronDown
            size={14}
            className={`text-[var(--text-muted)] transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="border-t border-[var(--border)]">
          {hasIssues ? (
            <div className="flex flex-col gap-1 p-2">
              {staffIssues.map(member => (
                <div key={member.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--surface-hover)] transition-colors group">
                  <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center text-[10px] font-bold text-red-500 ring-2 ring-[var(--surface)] group-hover:ring-[var(--surface-hover)] transition-all">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[var(--text-primary)]">{member.name}</p>
                    <p className="text-[10px] text-red-500/80 truncate font-medium">{member.issue}</p>
                  </div>
                  <AlertTriangle size={14} className="text-red-500 opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 text-center text-[10px] text-[var(--text-muted)]">All staff performing normally.</div>
          )}
          <div className="border-t border-[var(--border)] p-2.5 flex justify-center">
            <Link to="/staff" className="text-[10px] font-medium text-[var(--primary)] hover:underline">
              View All Staff →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
