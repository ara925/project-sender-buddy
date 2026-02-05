export interface Lead {
  id: string;
  source: 'intaker' | 'forms' | 'callrail' | 'manual';
  external_id: string | null;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  status: 'new' | 'contacted' | 'qualified' | 'retained' | 'lost' | 'duplicate';
  assigned_to: string | null;
  case_type: string | null;
  notes: string | null;
  litify_id: string | null;
  google_click_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Call {
  id: string;
  lead_id: string | null;
  direction: 'inbound' | 'outbound';
  duration: number | null;
  status: 'completed' | 'missed' | 'voicemail' | 'in-progress';
  caller_number: string;
  recording_url: string | null;
  callrail_id: string | null;
  regal_id: string | null;
  agent_id: string | null;
  notes: string | null;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'agent' | 'viewer';
  is_active: boolean;
  created_at: string;
}

export interface Activity {
  id: string;
  user_id: string | null;
  lead_id: string | null;
  action: string;
  details: Record<string, unknown> | null;
  created_at: string;
}
