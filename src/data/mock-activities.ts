import type { LeadActivity } from '@/types';

export const mockLeadActivities: LeadActivity[] = [
  // Lead 1 — James Wilson (new, from forms)
  { id: 'a1', lead_id: '1', platform: 'google_ads', type: 'ad_click', title: 'Google Ads click', description: 'Clicked "PI Lawyer Near Me" ad — Campaign: PI_Brand_2024', agent_name: null, metadata: { campaign: 'PI_Brand_2024', keyword: 'personal injury lawyer', cost: 4.20 }, created_at: '2024-02-05T10:28:00Z' },
  { id: 'a2', lead_id: '1', platform: 'forms', type: 'form_submission', title: 'Web form submitted', description: 'Contact form on /free-consultation — PI case evaluation', agent_name: null, metadata: { form: 'free-consultation', page: '/free-consultation' }, created_at: '2024-02-05T10:30:00Z' },
  { id: 'a3', lead_id: '1', platform: 'internal', type: 'status_change', title: 'Status → New', description: 'Lead auto-created from web form submission', agent_name: 'System', metadata: { from: null, to: 'new' }, created_at: '2024-02-05T10:30:01Z' },

  // Lead 2 — Sarah Parker (contacted, from intaker)
  { id: 'a4', lead_id: '2', platform: 'intaker', type: 'call_inbound', title: 'Inbound call received', description: 'Call from 555-0124, routed via Intaker IVR', agent_name: 'Maria Garcia', metadata: { duration: 185, recording_url: '#' }, created_at: '2024-02-05T09:15:00Z' },
  { id: 'a5', lead_id: '2', platform: 'internal', type: 'status_change', title: 'Status → New', description: 'Lead created from Intaker call', agent_name: 'System', metadata: { from: null, to: 'new' }, created_at: '2024-02-05T09:15:01Z' },
  { id: 'a6', lead_id: '2', platform: 'internal', type: 'assigned', title: 'Assigned to Maria Garcia', description: 'Auto-assigned via round-robin routing', agent_name: 'System', metadata: { agent: 'Maria Garcia' }, created_at: '2024-02-05T09:16:00Z' },
  { id: 'a7', lead_id: '2', platform: 'regal', type: 'call_outbound', title: 'Outbound call via Regal', description: 'Follow-up call — left voicemail', agent_name: 'Maria Garcia', metadata: { duration: 42, outcome: 'voicemail' }, created_at: '2024-02-05T09:30:00Z' },
  { id: 'a8', lead_id: '2', platform: 'internal', type: 'note_added', title: 'Note added', description: 'Left voicemail, will try again tomorrow', agent_name: 'Maria Garcia', metadata: null, created_at: '2024-02-05T09:31:00Z' },
  { id: 'a9', lead_id: '2', platform: 'internal', type: 'status_change', title: 'Status → Contacted', description: null, agent_name: 'Maria Garcia', metadata: { from: 'new', to: 'contacted' }, created_at: '2024-02-05T09:45:00Z' },
  { id: 'a10', lead_id: '2', platform: 'internal', type: 'email_sent', title: 'Follow-up email sent', description: 'Sent intake packet and consultation scheduling link', agent_name: 'Maria Garcia', metadata: { subject: 'Your Free Consultation — Next Steps' }, created_at: '2024-02-05T10:00:00Z' },

  // Lead 3 — Michael Johnson (qualified, manual)
  { id: 'a11', lead_id: '3', platform: 'internal', type: 'note_added', title: 'Lead created manually', description: 'Referral from attorney David Kim', agent_name: 'John Adams', metadata: null, created_at: '2024-02-04T16:20:00Z' },
  { id: 'a12', lead_id: '3', platform: 'internal', type: 'status_change', title: 'Status → New', description: null, agent_name: 'John Adams', metadata: { from: null, to: 'new' }, created_at: '2024-02-04T16:20:01Z' },
  { id: 'a13', lead_id: '3', platform: 'callrail', type: 'call_outbound', title: 'Outbound call via CallRail', description: 'Initial consultation call — 12 min', agent_name: 'John Adams', metadata: { duration: 720, recording_url: '#' }, created_at: '2024-02-04T17:00:00Z' },
  { id: 'a14', lead_id: '3', platform: 'internal', type: 'status_change', title: 'Status → Contacted', description: null, agent_name: 'John Adams', metadata: { from: 'new', to: 'contacted' }, created_at: '2024-02-04T17:15:00Z' },
  { id: 'a15', lead_id: '3', platform: 'internal', type: 'document_uploaded', title: 'Document uploaded', description: 'Medical records — accident_report_2024.pdf', agent_name: 'John Adams', metadata: { filename: 'accident_report_2024.pdf', size: '2.4MB' }, created_at: '2024-02-05T09:00:00Z' },
  { id: 'a16', lead_id: '3', platform: 'internal', type: 'note_added', title: 'Note added', description: 'Strong case potential — clear liability, documented injuries', agent_name: 'John Adams', metadata: null, created_at: '2024-02-05T09:30:00Z' },
  { id: 'a17', lead_id: '3', platform: 'litify', type: 'litify_synced', title: 'Synced to Litify', description: 'Lead record created in Litify CRM', agent_name: 'System', metadata: { litify_id: 'LIT-2024-0891' }, created_at: '2024-02-05T10:00:00Z' },
  { id: 'a18', lead_id: '3', platform: 'internal', type: 'status_change', title: 'Status → Qualified', description: null, agent_name: 'John Adams', metadata: { from: 'contacted', to: 'qualified' }, created_at: '2024-02-05T11:00:00Z' },

  // Lead 4 — Emily Davis (new, callrail)
  { id: 'a19', lead_id: '4', platform: 'google_ads', type: 'ad_click', title: 'Google Ads click', description: 'Clicked "Car Accident Lawyer" ad', agent_name: null, metadata: { campaign: 'MVA_Generic_2024', keyword: 'car accident lawyer', cost: 6.80 }, created_at: '2024-02-03T09:55:00Z' },
  { id: 'a20', lead_id: '4', platform: 'callrail', type: 'call_inbound', title: 'Inbound call via CallRail', description: 'Call from 555-0126, tracking number match', agent_name: null, metadata: { duration: 95, tracking_number: '800-555-0199' }, created_at: '2024-02-03T10:00:00Z' },
  { id: 'a21', lead_id: '4', platform: 'internal', type: 'status_change', title: 'Status → New', description: 'Lead auto-created from CallRail', agent_name: 'System', metadata: { from: null, to: 'new' }, created_at: '2024-02-03T10:00:01Z' },

  // Lead 5 — Robert Brown (lost, intaker)
  { id: 'a22', lead_id: '5', platform: 'intaker', type: 'call_inbound', title: 'Inbound call via Intaker', description: 'Call from 555-0127', agent_name: 'Sarah Lee', metadata: { duration: 310 }, created_at: '2024-02-04T11:30:00Z' },
  { id: 'a23', lead_id: '5', platform: 'internal', type: 'status_change', title: 'Status → New', description: null, agent_name: 'System', metadata: { from: null, to: 'new' }, created_at: '2024-02-04T11:30:01Z' },
  { id: 'a24', lead_id: '5', platform: 'internal', type: 'assigned', title: 'Assigned to Sarah Lee', description: null, agent_name: 'System', metadata: { agent: 'Sarah Lee' }, created_at: '2024-02-04T11:31:00Z' },
  { id: 'a25', lead_id: '5', platform: 'regal', type: 'call_outbound', title: 'Outbound call via Regal', description: 'Follow-up — client not interested', agent_name: 'Sarah Lee', metadata: { duration: 120, outcome: 'declined' }, created_at: '2024-02-04T14:00:00Z' },
  { id: 'a26', lead_id: '5', platform: 'internal', type: 'note_added', title: 'Note added', description: 'Not interested — already retained counsel elsewhere', agent_name: 'Sarah Lee', metadata: null, created_at: '2024-02-04T14:05:00Z' },
  { id: 'a27', lead_id: '5', platform: 'internal', type: 'status_change', title: 'Status → Lost', description: 'Client declined — retained other counsel', agent_name: 'Sarah Lee', metadata: { from: 'new', to: 'lost' }, created_at: '2024-02-05T09:00:00Z' },

  // Lead 6 — Jennifer Smith (retained, manual)
  { id: 'a28', lead_id: '6', platform: 'internal', type: 'note_added', title: 'Lead created manually', description: 'Walk-in client referral', agent_name: 'John Adams', metadata: null, created_at: '2024-02-03T15:10:00Z' },
  { id: 'a29', lead_id: '6', platform: 'internal', type: 'status_change', title: 'Status → New', description: null, agent_name: 'John Adams', metadata: { from: null, to: 'new' }, created_at: '2024-02-03T15:10:01Z' },
  { id: 'a30', lead_id: '6', platform: 'callrail', type: 'call_outbound', title: 'Outbound call via CallRail', description: 'Consultation scheduled for Feb 4', agent_name: 'John Adams', metadata: { duration: 480 }, created_at: '2024-02-03T16:00:00Z' },
  { id: 'a31', lead_id: '6', platform: 'internal', type: 'status_change', title: 'Status → Contacted', description: null, agent_name: 'John Adams', metadata: { from: 'new', to: 'contacted' }, created_at: '2024-02-03T16:10:00Z' },
  { id: 'a32', lead_id: '6', platform: 'internal', type: 'status_change', title: 'Status → Qualified', description: null, agent_name: 'John Adams', metadata: { from: 'contacted', to: 'qualified' }, created_at: '2024-02-04T12:00:00Z' },
  { id: 'a33', lead_id: '6', platform: 'litify', type: 'litify_matter_created', title: 'Litify matter created', description: 'Matter #LIT-2024-0887 — Personal Injury', agent_name: 'System', metadata: { litify_id: 'LIT-2024-0887', matter_type: 'Personal Injury' }, created_at: '2024-02-04T14:00:00Z' },
  { id: 'a34', lead_id: '6', platform: 'internal', type: 'document_uploaded', title: 'Document uploaded', description: 'Signed retainer agreement — retainer_smith_signed.pdf', agent_name: 'John Adams', metadata: { filename: 'retainer_smith_signed.pdf' }, created_at: '2024-02-05T10:00:00Z' },
  { id: 'a35', lead_id: '6', platform: 'internal', type: 'retainer_signed', title: 'Retainer signed', description: 'Client signed retainer agreement', agent_name: 'John Adams', metadata: null, created_at: '2024-02-05T10:10:00Z' },
  { id: 'a36', lead_id: '6', platform: 'internal', type: 'status_change', title: 'Status → Retained', description: null, agent_name: 'John Adams', metadata: { from: 'qualified', to: 'retained' }, created_at: '2024-02-05T10:15:00Z' },
  { id: 'a37', lead_id: '6', platform: 'litify', type: 'litify_synced', title: 'Litify record updated', description: 'Status synced: Retained', agent_name: 'System', metadata: { litify_id: 'LIT-2024-0887' }, created_at: '2024-02-05T10:16:00Z' },

  // Lead 7 — David Miller (contacted, forms)
  { id: 'a38', lead_id: '7', platform: 'forms', type: 'form_submission', title: 'Web form submitted', description: 'Contact form on /slip-and-fall', agent_name: null, metadata: { form: 'case-evaluation', page: '/slip-and-fall' }, created_at: '2024-02-03T13:20:00Z' },
  { id: 'a39', lead_id: '7', platform: 'internal', type: 'status_change', title: 'Status → New', description: null, agent_name: 'System', metadata: { from: null, to: 'new' }, created_at: '2024-02-03T13:20:01Z' },
  { id: 'a40', lead_id: '7', platform: 'internal', type: 'email_sent', title: 'Auto-reply email sent', description: 'Thank you for contacting us — intake packet attached', agent_name: 'System', metadata: { subject: 'Thank You — Maryman Law Group' }, created_at: '2024-02-03T13:21:00Z' },
  { id: 'a41', lead_id: '7', platform: 'regal', type: 'call_outbound', title: 'Outbound call via Regal', description: 'Follow-up call — discussed case details', agent_name: 'Maria Garcia', metadata: { duration: 360 }, created_at: '2024-02-04T10:00:00Z' },
  { id: 'a42', lead_id: '7', platform: 'internal', type: 'note_added', title: 'Note added', description: 'Slip and fall at grocery store, needs medical records', agent_name: 'Maria Garcia', metadata: null, created_at: '2024-02-04T10:10:00Z' },
  { id: 'a43', lead_id: '7', platform: 'internal', type: 'status_change', title: 'Status → Contacted', description: null, agent_name: 'Maria Garcia', metadata: { from: 'new', to: 'contacted' }, created_at: '2024-02-04T16:00:00Z' },

  // Lead 8 — Lisa Anderson (new, callrail)
  { id: 'a44', lead_id: '8', platform: 'callrail', type: 'call_inbound', title: 'Inbound call via CallRail', description: 'Call from 555-0130', agent_name: null, metadata: { duration: 60, tracking_number: '800-555-0199' }, created_at: '2024-02-03T10:00:00Z' },
  { id: 'a45', lead_id: '8', platform: 'internal', type: 'status_change', title: 'Status → New', description: 'Lead auto-created from CallRail', agent_name: 'System', metadata: { from: null, to: 'new' }, created_at: '2024-02-03T10:00:01Z' },

  // Lead 9 — Kevin White (qualified, intaker)
  { id: 'a46', lead_id: '9', platform: 'intaker', type: 'call_inbound', title: 'Inbound call via Intaker', description: 'Call from 555-0131, workplace injury inquiry', agent_name: 'Sarah Lee', metadata: { duration: 480 }, created_at: '2024-02-02T16:45:00Z' },
  { id: 'a47', lead_id: '9', platform: 'internal', type: 'status_change', title: 'Status → New', description: null, agent_name: 'System', metadata: { from: null, to: 'new' }, created_at: '2024-02-02T16:45:01Z' },
  { id: 'a48', lead_id: '9', platform: 'internal', type: 'assigned', title: 'Assigned to Sarah Lee', description: null, agent_name: 'System', metadata: { agent: 'Sarah Lee' }, created_at: '2024-02-02T16:46:00Z' },
  { id: 'a49', lead_id: '9', platform: 'regal', type: 'sms_sent', title: 'SMS sent via Regal', description: 'Sent consultation confirmation text', agent_name: 'Sarah Lee', metadata: { message: 'Hi Kevin, confirming your consultation for Feb 3 at 2pm.' }, created_at: '2024-02-02T17:00:00Z' },
  { id: 'a50', lead_id: '9', platform: 'internal', type: 'email_received', title: 'Email received', description: 'Client replied with medical records attachment', agent_name: null, metadata: { subject: 'Re: Your Consultation' }, created_at: '2024-02-03T09:00:00Z' },
  { id: 'a51', lead_id: '9', platform: 'internal', type: 'document_uploaded', title: 'Document uploaded', description: 'workplace_injury_report.pdf', agent_name: 'Sarah Lee', metadata: { filename: 'workplace_injury_report.pdf', size: '1.8MB' }, created_at: '2024-02-03T10:00:00Z' },
  { id: 'a52', lead_id: '9', platform: 'internal', type: 'status_change', title: 'Status → Contacted', description: null, agent_name: 'Sarah Lee', metadata: { from: 'new', to: 'contacted' }, created_at: '2024-02-03T14:00:00Z' },
  { id: 'a53', lead_id: '9', platform: 'internal', type: 'note_added', title: 'Note added', description: 'Medical records needed — requesting from Providence Medical', agent_name: 'Sarah Lee', metadata: null, created_at: '2024-02-04T09:00:00Z' },
  { id: 'a54', lead_id: '9', platform: 'litify', type: 'litify_synced', title: 'Synced to Litify', description: 'Lead record created in Litify CRM', agent_name: 'System', metadata: { litify_id: 'LIT-2024-0895' }, created_at: '2024-02-04T10:00:00Z' },
  { id: 'a55', lead_id: '9', platform: 'internal', type: 'status_change', title: 'Status → Qualified', description: null, agent_name: 'Sarah Lee', metadata: { from: 'contacted', to: 'qualified' }, created_at: '2024-02-04T11:30:00Z' },
];

export function getActivitiesForLead(leadId: string): LeadActivity[] {
  return mockLeadActivities
    .filter(a => a.lead_id === leadId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}
