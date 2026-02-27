import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const payload = await req.json();
    console.log('CallRail webhook payload:', JSON.stringify(payload));

    // CallRail sends different event types
    // Common fields: id, company_id, tracking_phone_number, caller_number, 
    // duration, direction, start_time, answered, recording, tags, etc.
    
    const callerNumber = payload.caller_number || payload.source_number || payload.customer_phone_number || 'unknown';
    const direction = payload.direction === 'outbound' ? 'outbound' : 'inbound';
    const duration = payload.duration ? parseInt(payload.duration) : null;
    
    let status = 'completed';
    if (payload.answered === false) {
      status = payload.voicemail ? 'voicemail' : 'missed';
    }

    // Try to match lead by phone number
    let leadId = null;
    if (callerNumber && callerNumber !== 'unknown') {
      const cleanPhone = callerNumber.replace(/\D/g, '').slice(-10);
      const { data: matchedLead } = await supabase
        .from('leads')
        .select('id')
        .or(`phone.ilike.%${cleanPhone}`)
        .limit(1)
        .single();
      
      if (matchedLead) {
        leadId = matchedLead.id;
      }
    }

    const { data, error } = await supabase.from('calls').insert({
      lead_id: leadId,
      direction,
      duration,
      status,
      caller_number: callerNumber,
      recording_url: payload.recording || payload.recording_url || null,
      callrail_id: payload.id?.toString() || null,
      notes: payload.note || payload.tags?.join(', ') || null,
    }).select().single();

    if (error) throw error;

    // Log activity if we matched a lead
    if (leadId) {
      await supabase.from('lead_activities').insert({
        lead_id: leadId,
        platform: 'callrail',
        type: direction === 'inbound' ? 'call_inbound' : 'call_outbound',
        title: `${direction === 'inbound' ? 'Inbound' : 'Outbound'} call via CallRail`,
        description: duration ? `Duration: ${Math.floor(duration / 60)}m ${duration % 60}s` : 'No duration recorded',
        metadata: { callrail_id: payload.id, raw_payload: payload },
      });
    }

    // Also log to activities table for audit
    await supabase.from('activities').insert({
      action: 'call_received',
      details: { source: 'callrail', callrail_id: payload.id, call_id: data.id, raw_payload: payload },
    });

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('CallRail webhook error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
