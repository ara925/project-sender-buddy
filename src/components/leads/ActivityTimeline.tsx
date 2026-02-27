import {
  Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Voicemail,
  FileText, Mail, MailOpen, MessageSquare, MessageCircle,
  ArrowRightLeft, StickyNote, UserCheck, RefreshCw, Database,
  MousePointerClick, PenTool, Upload, Bot, Shield, Target, AlertTriangle,
} from 'lucide-react';
import { Badge } from '@/components/ui';
import { formatDateTime } from '@/lib/utils';
import type { LeadActivity, LeadActivityPlatform, LeadActivityType } from '@/types';

const platformColors: Record<LeadActivityPlatform, string> = {
  callrail: 'bg-blue-500/15 text-blue-600 border-blue-500/30',
  regal: 'bg-purple-500/15 text-purple-600 border-purple-500/30',
  regal_ai: 'bg-purple-600/15 text-purple-700 border-purple-600/30',
  intaker: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30',
  salesforce: 'bg-blue-600/15 text-blue-700 border-blue-600/30',
  website: 'bg-orange-500/15 text-orange-600 border-orange-500/30',
  forms: 'bg-cyan-500/15 text-cyan-600 border-cyan-500/30',
  internal: 'bg-[var(--text-muted)]/10 text-[var(--text-secondary)] border-[var(--border)]',
};

const platformLabels: Record<LeadActivityPlatform, string> = {
  callrail: 'CallRail',
  regal: 'Regal',
  regal_ai: 'Regal AI',
  intaker: 'Intaker',
  salesforce: 'Salesforce',
  website: 'Website',
  forms: 'Web Forms',
  internal: 'Internal',
};

function getActivityIcon(type: LeadActivityType) {
  const size = 16;
  switch (type) {
    case 'call_inbound': return <PhoneIncoming size={size} />;
    case 'call_outbound': return <PhoneOutgoing size={size} />;
    case 'call_missed': return <PhoneMissed size={size} />;
    case 'voicemail': return <Voicemail size={size} />;
    case 'form_submission': return <FileText size={size} />;
    case 'email_sent': return <Mail size={size} />;
    case 'email_received': return <MailOpen size={size} />;
    case 'sms_sent': return <MessageSquare size={size} />;
    case 'sms_received': return <MessageCircle size={size} />;
    case 'status_change': return <ArrowRightLeft size={size} />;
    case 'note_added': return <StickyNote size={size} />;
    case 'assigned': return <UserCheck size={size} />;
    case 'salesforce_synced': return <RefreshCw size={size} />;
    case 'salesforce_case_created': return <Database size={size} />;
    case 'website_visit': return <MousePointerClick size={size} />;
    case 'retainer_signed': return <PenTool size={size} />;
    case 'document_uploaded': return <Upload size={size} />;
    case 'ai_call_inbound': return <Bot size={size} />;
    case 'ai_call_outbound': return <Bot size={size} />;
    case 'ai_qualification': return <Target size={size} />;
    case 'ai_escalation': return <AlertTriangle size={size} />;
    default: return <Phone size={size} />;
  }
}

function getIconBg(type: LeadActivityType): string {
  switch (type) {
    case 'call_inbound':
    case 'call_outbound':
      return 'bg-blue-500/15 text-blue-500';
    case 'call_missed':
      return 'bg-red-500/15 text-red-500';
    case 'voicemail':
      return 'bg-amber-500/15 text-amber-500';
    case 'form_submission':
      return 'bg-cyan-500/15 text-cyan-500';
    case 'email_sent':
    case 'email_received':
      return 'bg-indigo-500/15 text-indigo-500';
    case 'sms_sent':
    case 'sms_received':
      return 'bg-violet-500/15 text-violet-500';
    case 'status_change':
      return 'bg-emerald-500/15 text-emerald-500';
    case 'note_added':
      return 'bg-yellow-500/15 text-yellow-600';
    case 'assigned':
      return 'bg-teal-500/15 text-teal-500';
    case 'salesforce_synced':
    case 'salesforce_case_created':
      return 'bg-blue-600/15 text-blue-700';
    case 'website_visit':
      return 'bg-orange-500/15 text-orange-600';
    case 'retainer_signed':
      return 'bg-green-500/15 text-green-600';
    case 'document_uploaded':
      return 'bg-slate-500/15 text-slate-500';
    case 'ai_call_inbound':
    case 'ai_call_outbound':
      return 'bg-purple-600/15 text-purple-600';
    case 'ai_qualification':
      return 'bg-purple-500/15 text-purple-500';
    case 'ai_escalation':
      return 'bg-amber-600/15 text-amber-600';
    default:
      return 'bg-[var(--surface-active)] text-[var(--text-secondary)]';
  }
}

interface ActivityTimelineProps {
  activities: LeadActivity[];
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-[var(--text-muted)]">
        No activity recorded yet.
      </div>
    );
  }

  // Group by date
  const grouped = activities.reduce<Record<string, LeadActivity[]>>((acc, activity) => {
    const dateKey = new Date(activity.created_at).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(activity);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([date, items]) => (
        <div key={date}>
          <div className="sticky top-0 z-10 bg-[var(--surface)] py-1 mb-3">
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              {date}
            </span>
          </div>
          <div className="relative pl-8 space-y-0">
            {/* Vertical line */}
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-[var(--border)]" />

            {items.map((activity, idx) => (
              <div key={activity.id} className="relative pb-5 last:pb-0">
                {/* Icon dot */}
                <div
                  className={`absolute left-[-17px] top-1 w-8 h-8 rounded-full flex items-center justify-center ${getIconBg(activity.type)}`}
                >
                  {getActivityIcon(activity.type)}
                </div>

                {/* Content */}
                <div className="ml-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-[var(--text-primary)] leading-tight">
                      {activity.title}
                    </p>
                    <span className="text-xs text-[var(--text-muted)] whitespace-nowrap shrink-0">
                      {new Date(activity.created_at).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  {activity.description && (
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                      {activity.description}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <span
                      className={`inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded border ${platformColors[activity.platform]}`}
                    >
                      {platformLabels[activity.platform]}
                    </span>
                    {activity.agent_name && (
                      <span className="text-[10px] text-[var(--text-muted)]">
                        by {activity.agent_name}
                      </span>
                    )}
                    {activity.metadata?.duration && (
                      <span className="text-[10px] text-[var(--text-muted)]">
                        · {Math.floor(Number(activity.metadata.duration) / 60)}m {Number(activity.metadata.duration) % 60}s
                      </span>
                    )}
                    {/* AI-specific metadata */}
                    {activity.platform === 'regal_ai' && activity.metadata?.sentiment && (
                      <span className={`text-[10px] font-semibold ${
                        activity.metadata.sentiment === 'positive' ? 'text-emerald-600' :
                        activity.metadata.sentiment === 'frustrated' ? 'text-amber-600' :
                        activity.metadata.sentiment === 'negative' ? 'text-red-600' : 'text-[var(--text-muted)]'
                      }`}>
                        Sentiment: {Number(activity.metadata.sentimentScore).toFixed(1)}
                      </span>
                    )}
                    {activity.platform === 'regal_ai' && activity.metadata?.taskCompletion !== undefined && (
                      <span className="text-[10px] text-[var(--text-muted)]">
                        Task: {String(activity.metadata.taskCompletion)}%
                      </span>
                    )}
                    {activity.platform === 'regal_ai' && activity.metadata?.contained !== undefined && (
                      <Badge variant={activity.metadata.contained ? 'success' : 'warning'} className="h-4 text-[9px] px-1">
                        {activity.metadata.contained ? 'Contained' : 'Escalated'}
                      </Badge>
                    )}
                    {activity.platform === 'regal_ai' && activity.metadata?.result && (
                      <Badge variant={activity.metadata.result === 'qualified' ? 'success' : 'destructive'} className="h-4 text-[9px] px-1">
                        {String(activity.metadata.result)}
                      </Badge>
                    )}
                    {activity.platform === 'regal_ai' && activity.metadata?.speed_to_lead && (
                      <span className="text-[10px] text-purple-500 font-semibold">
                        ⚡ {String(activity.metadata.speed_to_lead)}s to lead
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
