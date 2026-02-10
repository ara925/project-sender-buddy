import { Play, Download, ExternalLink, Clock, PhoneIncoming, PhoneOutgoing, PhoneMissed, Voicemail, Bot, Shield, ArrowRightLeft, ThumbsUp, ThumbsDown, Volume2 } from 'lucide-react';
import { Badge, Button, Card } from '@/components/ui';
import { formatDateTime, formatDuration, formatPhone, capitalize } from '@/lib/utils';
import type { Call } from '@/types';

interface AICallMeta {
  handler: 'ai' | 'human';
  agentName?: string;
  contained?: boolean;
  sentiment?: 'positive' | 'neutral' | 'frustrated' | 'negative';
  sentimentScore?: number;
  taskCompletion?: number;
  escalationReason?: string;
  qualificationResult?: 'qualified' | 'disqualified' | 'pending';
}

const aiCallMeta: Record<string, AICallMeta> = {
  '1': { handler: 'ai', agentName: 'Regal Agent Alpha', contained: true, sentiment: 'positive', sentimentScore: 8.8, taskCompletion: 100, qualificationResult: 'qualified' },
  '2': { handler: 'human' },
  '3': { handler: 'ai', agentName: 'Regal Agent Alpha', contained: false, sentiment: 'frustrated', sentimentScore: 4.2, taskCompletion: 30, escalationReason: 'Customer demanded human', qualificationResult: 'pending' },
  '4': { handler: 'human' },
  '5': { handler: 'ai', agentName: 'Regal Agent Gamma', contained: true, sentiment: 'neutral', sentimentScore: 6.5, taskCompletion: 85, qualificationResult: 'pending' },
  '6': { handler: 'human' },
  '7': { handler: 'ai', agentName: 'Regal Agent Beta', contained: true, sentiment: 'positive', sentimentScore: 8.1, taskCompletion: 100, qualificationResult: 'qualified' },
  '8': { handler: 'ai', agentName: 'Regal Agent Alpha', contained: true, sentiment: 'positive', sentimentScore: 9.0, taskCompletion: 100, qualificationResult: 'qualified' },
  '9': { handler: 'ai', agentName: 'Regal Agent Alpha', contained: false, sentiment: 'negative', sentimentScore: 2.8, taskCompletion: 15, escalationReason: 'Language barrier', qualificationResult: 'pending' },
  '10': { handler: 'human' },
  '11': { handler: 'ai', agentName: 'Regal Agent Beta', contained: true, sentiment: 'neutral', sentimentScore: 7.0, taskCompletion: 92, qualificationResult: 'disqualified' },
  '12': { handler: 'human' },
  '13': { handler: 'ai', agentName: 'Regal Agent Gamma', contained: true, sentiment: 'positive', sentimentScore: 8.5, taskCompletion: 100, qualificationResult: 'qualified' },
  '14': { handler: 'ai', agentName: 'Regal Agent Alpha', contained: false, sentiment: 'frustrated', sentimentScore: 3.5, taskCompletion: 0, escalationReason: 'Missed — no answer' },
  '15': { handler: 'human' },
  '16': { handler: 'ai', agentName: 'Regal Agent Delta', contained: true, sentiment: 'positive', sentimentScore: 7.8, taskCompletion: 88, qualificationResult: 'qualified' },
  '17': { handler: 'human' },
  '18': { handler: 'ai', agentName: 'Regal Agent Beta', contained: true, sentiment: 'neutral', sentimentScore: 6.2, taskCompletion: 75 },
  '19': { handler: 'human' },
  '20': { handler: 'ai', agentName: 'Regal Agent Alpha', contained: true, sentiment: 'positive', sentimentScore: 8.9, taskCompletion: 100, qualificationResult: 'qualified' },
  '21': { handler: 'ai', agentName: 'Regal Agent Gamma', contained: false, sentiment: 'negative', sentimentScore: 2.0, taskCompletion: 0, escalationReason: 'Missed — after hours overflow' },
  '22': { handler: 'human' },
  '23': { handler: 'ai', agentName: 'Regal Agent Alpha', contained: true, sentiment: 'positive', sentimentScore: 8.3, taskCompletion: 95, qualificationResult: 'qualified' },
  '24': { handler: 'human' },
  '25': { handler: 'ai', agentName: 'Regal Agent Echo', contained: true, sentiment: 'neutral', sentimentScore: 7.2, taskCompletion: 90, qualificationResult: 'qualified' },
  '26': { handler: 'ai', agentName: 'Regal Agent Alpha', contained: false, sentiment: 'frustrated', sentimentScore: 4.0, taskCompletion: 0, escalationReason: 'Missed — no answer' },
  '27': { handler: 'human' },
  '28': { handler: 'ai', agentName: 'Regal Agent Alpha', contained: true, sentiment: 'positive', sentimentScore: 9.1, taskCompletion: 100, qualificationResult: 'qualified' },
  '29': { handler: 'human' },
  '30': { handler: 'ai', agentName: 'Regal Agent Gamma', contained: true, sentiment: 'neutral', sentimentScore: 6.8, taskCompletion: 80 },
};

const mockCalls: Call[] = [
  { id: '1', lead_id: '1', direction: 'inbound', duration: 245, status: 'completed', caller_number: '5551234567', recording_url: '#', callrail_id: 'cr_123', regal_id: 'rg_456', agent_id: null, notes: 'Initial inquiry about personal injury case', created_at: '2024-02-05T14:30:00Z' },
  { id: '2', lead_id: '2', direction: 'outbound', duration: 180, status: 'completed', caller_number: '5559876543', recording_url: '#', callrail_id: 'cr_124', regal_id: 'rg_457', agent_id: null, notes: 'Follow-up call to discuss case details', created_at: '2024-02-05T13:15:00Z' },
  { id: '3', lead_id: '3', direction: 'inbound', duration: 0, status: 'missed', caller_number: '5554567890', recording_url: null, callrail_id: 'cr_125', regal_id: null, agent_id: null, notes: null, created_at: '2024-02-05T11:45:00Z' },
  { id: '4', lead_id: '4', direction: 'outbound', duration: 420, status: 'completed', caller_number: '5557891234', recording_url: '#', callrail_id: 'cr_126', regal_id: 'rg_458', agent_id: null, notes: 'Detailed consultation, client retained', created_at: '2024-02-05T10:00:00Z' },
  { id: '5', lead_id: '5', direction: 'inbound', duration: 60, status: 'voicemail', caller_number: '5552345678', recording_url: '#', callrail_id: 'cr_127', regal_id: null, agent_id: null, notes: 'Left voicemail requesting callback', created_at: '2024-02-04T16:30:00Z' },
  { id: '6', lead_id: '6', direction: 'inbound', duration: 1560, status: 'completed', caller_number: '5553456789', recording_url: '#', callrail_id: 'cr_128', regal_id: 'rg_459', agent_id: null, notes: 'Lengthy discussion about potential lawsuit', created_at: '2024-02-04T14:20:00Z' },
  { id: '7', lead_id: '7', direction: 'outbound', duration: 45, status: 'voicemail', caller_number: '5558765432', recording_url: '#', callrail_id: 'cr_129', regal_id: null, agent_id: null, notes: 'Left message for Jennifer regarding accident report', created_at: '2024-02-04T11:15:00Z' },
  { id: '8', lead_id: '8', direction: 'inbound', duration: 320, status: 'completed', caller_number: '5555678901', recording_url: '#', callrail_id: 'cr_130', regal_id: 'rg_460', agent_id: null, notes: 'New intake for auto accident', created_at: '2024-02-04T09:45:00Z' },
  { id: '9', lead_id: '9', direction: 'inbound', duration: 0, status: 'missed', caller_number: '5559012345', recording_url: null, callrail_id: 'cr_131', regal_id: null, agent_id: null, notes: null, created_at: '2024-02-03T15:30:00Z' },
  { id: '10', lead_id: '10', direction: 'outbound', duration: 900, status: 'completed', caller_number: '5552349012', recording_url: '#', callrail_id: 'cr_132', regal_id: 'rg_461', agent_id: null, notes: 'Client update call', created_at: '2024-02-03T13:20:00Z' },
  { id: '11', lead_id: '11', direction: 'inbound', duration: 120, status: 'completed', caller_number: '5556781234', recording_url: '#', callrail_id: 'cr_133', regal_id: 'rg_462', agent_id: null, notes: 'Quick question about paperwork', created_at: '2024-02-03T10:10:00Z' },
  { id: '12', lead_id: '12', direction: 'outbound', duration: 55, status: 'voicemail', caller_number: '5559015678', recording_url: '#', callrail_id: 'cr_134', regal_id: null, agent_id: null, notes: 'Returned call, left voicemail', created_at: '2024-02-03T09:05:00Z' },
  { id: '13', lead_id: '13', direction: 'inbound', duration: 740, status: 'completed', caller_number: '5551238907', recording_url: '#', callrail_id: 'cr_135', regal_id: 'rg_463', agent_id: null, notes: 'Detailed intake review', created_at: '2024-02-02T16:45:00Z' },
  { id: '14', lead_id: '14', direction: 'inbound', duration: 0, status: 'missed', caller_number: '5554562389', recording_url: null, callrail_id: 'cr_136', regal_id: null, agent_id: null, notes: null, created_at: '2024-02-02T14:15:00Z' },
  { id: '15', lead_id: '15', direction: 'outbound', duration: 240, status: 'completed', caller_number: '5557893456', recording_url: '#', callrail_id: 'cr_137', regal_id: 'rg_464', agent_id: null, notes: 'Scheduled consultation meeting', created_at: '2024-02-02T11:40:00Z' },
  { id: '16', lead_id: '16', direction: 'inbound', duration: 50, status: 'completed', caller_number: '5552346789', recording_url: '#', callrail_id: 'cr_138', regal_id: 'rg_465', agent_id: null, notes: 'Asked for office address', created_at: '2024-02-02T09:30:00Z' },
  { id: '17', lead_id: '17', direction: 'inbound', duration: 1100, status: 'completed', caller_number: '5555679012', recording_url: '#', callrail_id: 'cr_139', regal_id: 'rg_466', agent_id: null, notes: 'Major injury case intake', created_at: '2024-02-01T15:20:00Z' },
  { id: '18', lead_id: '18', direction: 'outbound', duration: 30, status: 'voicemail', caller_number: '5558902345', recording_url: '#', callrail_id: 'cr_140', regal_id: null, agent_id: null, notes: 'Left voicemail regarding missing documents', created_at: '2024-02-01T13:00:00Z' },
  { id: '19', lead_id: '19', direction: 'inbound', duration: 380, status: 'completed', caller_number: '5551235678', recording_url: '#', callrail_id: 'cr_141', regal_id: 'rg_467', agent_id: null, notes: 'Follow up on medical records', created_at: '2024-02-01T10:45:00Z' },
  { id: '20', lead_id: '20', direction: 'outbound', duration: 150, status: 'completed', caller_number: '5554568901', recording_url: '#', callrail_id: 'cr_142', regal_id: 'rg_468', agent_id: null, notes: 'Confirmed appointment time', created_at: '2024-02-01T08:50:00Z' },
  { id: '21', lead_id: '21', direction: 'inbound', duration: 0, status: 'missed', caller_number: '5557892345', recording_url: null, callrail_id: 'cr_143', regal_id: null, agent_id: null, notes: null, created_at: '2024-01-31T16:10:00Z' },
  { id: '22', lead_id: '22', direction: 'outbound', duration: 600, status: 'completed', caller_number: '5552345690', recording_url: '#', callrail_id: 'cr_144', regal_id: 'rg_469', agent_id: null, notes: 'Strategizing legal approach', created_at: '2024-01-31T14:30:00Z' },
  { id: '23', lead_id: '23', direction: 'inbound', duration: 290, status: 'completed', caller_number: '5555678912', recording_url: '#', callrail_id: 'cr_145', regal_id: 'rg_470', agent_id: null, notes: 'Question about contingency fee', created_at: '2024-01-31T11:20:00Z' },
  { id: '24', lead_id: '24', direction: 'outbound', duration: 75, status: 'completed', caller_number: '5559012356', recording_url: '#', callrail_id: 'cr_146', regal_id: 'rg_471', agent_id: null, notes: 'Brief check-in', created_at: '2024-01-31T09:15:00Z' },
  { id: '25', lead_id: '25', direction: 'inbound', duration: 480, status: 'completed', caller_number: '5551236789', recording_url: '#', callrail_id: 'cr_147', regal_id: 'rg_472', agent_id: null, notes: 'Discussing settlement offer', created_at: '2024-01-30T15:50:00Z' },
  { id: '26', lead_id: '26', direction: 'inbound', duration: 0, status: 'missed', caller_number: '5554569012', recording_url: null, callrail_id: 'cr_148', regal_id: null, agent_id: null, notes: null, created_at: '2024-01-30T13:40:00Z' },
  { id: '27', lead_id: '27', direction: 'outbound', duration: 180, status: 'completed', caller_number: '5557893467', recording_url: '#', callrail_id: 'cr_149', regal_id: 'rg_473', agent_id: null, notes: 'Returning client call', created_at: '2024-01-30T10:30:00Z' },
  { id: '28', lead_id: '28', direction: 'inbound', duration: 300, status: 'completed', caller_number: '5552347890', recording_url: '#', callrail_id: 'cr_150', regal_id: 'rg_474', agent_id: null, notes: 'New case inquiry', created_at: '2024-01-30T08:20:00Z' },
  { id: '29', lead_id: '29', direction: 'outbound', duration: 420, status: 'completed', caller_number: '5555671234', recording_url: '#', callrail_id: 'cr_151', regal_id: 'rg_475', agent_id: null, notes: 'Follow up on police report', created_at: '2024-01-29T16:00:00Z' },
  { id: '30', lead_id: '30', direction: 'inbound', duration: 60, status: 'voicemail', caller_number: '5559014567', recording_url: '#', callrail_id: 'cr_152', regal_id: null, agent_id: null, notes: 'Left voicemail', created_at: '2024-01-29T14:45:00Z' },
];

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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-[var(--text-secondary)]">Today</div>
              <div className="mt-2 text-3xl font-bold text-[var(--text-primary)]">89</div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-hover)] text-[var(--text-secondary)]">
              <Clock size={18} />
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-[var(--text-secondary)]">Completed</div>
              <div className="mt-2 text-3xl font-bold text-[var(--text-primary)]">72</div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <PhoneIncoming size={18} />
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-[var(--text-secondary)]">Missed</div>
              <div className="mt-2 text-3xl font-bold text-[var(--text-primary)]">12</div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-600">
              <PhoneMissed size={18} />
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-[var(--text-secondary)]">Avg Duration</div>
              <div className="mt-2 text-3xl font-bold text-[var(--text-primary)]">4:32</div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
              <PhoneOutgoing size={18} />
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-purple-500">AI Handled</div>
              <div className="mt-2 text-3xl font-bold text-[var(--text-primary)]">187</div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
              <Bot size={18} />
            </div>
          </div>
          <div className="mt-2 text-xs text-[var(--text-muted)]">78% contained · 22% escalated</div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">Recent Calls</h2>
          <span className="text-xs text-[var(--text-muted)]">Last 30 days</span>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {mockCalls.map((call) => {
            const meta = aiCallMeta[call.id];
            const isAI = meta?.handler === 'ai';
            const sentimentColor = meta?.sentiment === 'positive' ? 'text-emerald-600' : meta?.sentiment === 'frustrated' ? 'text-amber-600' : meta?.sentiment === 'negative' ? 'text-red-600' : 'text-[var(--text-muted)]';
            return (
            <div key={call.id} className="flex items-center justify-between gap-4 p-4 hover:bg-[var(--surface-hover)] transition-colors group">
              <div className="flex items-center gap-4 min-w-0">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  call.status === 'missed' ? 'bg-red-500/10 text-red-600' :
                  call.status === 'voicemail' ? 'bg-amber-500/10 text-amber-600' :
                  call.direction === 'inbound' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-blue-500/10 text-blue-600'
                }`}>
                  {getCallIcon(call.direction, call.status)}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-[var(--text-primary)]">{formatPhone(call.caller_number)}</p>
                    <Badge variant={getStatusBadgeVariant(call.status)} className="h-5 text-[10px] px-1.5 uppercase tracking-wider">
                      {capitalize(call.status)}
                    </Badge>
                    <Badge variant="outline" className="h-5 text-[10px] px-1.5 uppercase tracking-wider">
                      {capitalize(call.direction)}
                    </Badge>
                    {/* AI / Human handler badge */}
                    {isAI ? (
                      <Badge className="h-5 text-[10px] px-1.5 uppercase tracking-wider bg-purple-500/15 text-purple-600 border-purple-500/30 border">
                        <Bot size={10} className="mr-0.5" /> AI
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="h-5 text-[10px] px-1.5 uppercase tracking-wider">
                        👤 Human
                      </Badge>
                    )}
                    {/* Containment badge */}
                    {isAI && meta?.contained !== undefined && (
                      <Badge className={`h-5 text-[10px] px-1.5 border ${meta.contained ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-amber-500/10 text-amber-600 border-amber-500/20'}`}>
                        {meta.contained ? <Shield size={10} className="mr-0.5" /> : <ArrowRightLeft size={10} className="mr-0.5" />}
                        {meta.contained ? 'Contained' : 'Escalated'}
                      </Badge>
                    )}
                    {(call.duration ?? 0) > 0 && (
                      <span className="text-xs text-[var(--text-muted)]">
                        {formatDuration(call.duration ?? 0)}
                      </span>
                    )}
                  </div>
                  {/* Notes + AI metadata row */}
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    {call.notes && (
                      <p className="text-xs text-[var(--text-secondary)] truncate max-w-[280px]">
                        {call.notes}
                      </p>
                    )}
                    {isAI && meta?.agentName && (
                      <span className="text-[10px] text-purple-500 font-medium">{meta.agentName}</span>
                    )}
                    {isAI && meta?.sentiment && (
                      <span className={`text-[10px] font-semibold ${sentimentColor} flex items-center gap-0.5`}>
                        {meta.sentiment === 'positive' ? <ThumbsUp size={10} /> : meta.sentiment === 'negative' || meta.sentiment === 'frustrated' ? <ThumbsDown size={10} /> : <Volume2 size={10} />}
                        {meta.sentimentScore?.toFixed(1)}
                      </span>
                    )}
                    {isAI && meta?.taskCompletion !== undefined && meta.taskCompletion > 0 && (
                      <span className="text-[10px] text-[var(--text-muted)]">Task: {meta.taskCompletion}%</span>
                    )}
                    {isAI && meta?.escalationReason && (
                      <span className="text-[10px] text-amber-600">{meta.escalationReason}</span>
                    )}
                    {isAI && meta?.qualificationResult && (
                      <Badge variant={meta.qualificationResult === 'qualified' ? 'success' : meta.qualificationResult === 'disqualified' ? 'destructive' : 'secondary'} className="h-4 text-[9px] px-1">
                        {meta.qualificationResult}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                  <p className="text-sm text-[var(--text-secondary)]">{formatDateTime(call.created_at)}</p>
                </div>
                <div className="flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                  {call.recording_url && (
                    <Button variant="ghost" size="icon" className="hover:bg-[var(--surface-hover)]" aria-label="Play recording">
                      <Play size={16} />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="hover:bg-[var(--surface-hover)]" aria-label="Open call details">
                    <ExternalLink size={16} />
                  </Button>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
