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
    console.log('CallRail webhook payload received, resource_id:', payload.resource_id);

    // Real CallRail field mapping based on actual webhook payload
    const callerNumber = payload.customer_phone_number || payload.caller_number || payload.callernum || 'unknown';
    const direction = payload.direction === 'outbound' ? 'outbound' : 'inbound';
    const duration = payload.duration ? parseInt(payload.duration) : null;
    const callrailId = payload.resource_id || null;
    const customerName = payload.customer_name || payload.callername || null;
    
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

    // If no lead matched, auto-create one from CallRail data
    if (!leadId && customerName) {
      const nameParts = customerName.trim().split(/\s+/);
      const firstName = nameParts[0] || 'Unknown';
      const lastName = nameParts.slice(1).join(' ') || 'Unknown';

      const { data: newLead } = await supabase.from('leads').insert({
        first_name: firstName,
        last_name: lastName,
        phone: callerNumber,
        source: 'callrail',
        external_id: callrailId,
        case_type: payload.company_name || null,
        google_click_id: payload.gclid || null,
        notes: payload.call_summary || null,
      }).select('id').single();

      if (newLead) {
        leadId = newLead.id;
      }
    }

    const { data, error } = await supabase.from('calls').insert({
      lead_id: leadId,
      direction,
      duration,
      status,
      caller_number: callerNumber,
      recording_url: payload.recording || payload.recording_redirect || null,
      callrail_id: callrailId,
      notes: payload.call_summary || payload.note || null,
    }).select().single();

    if (error) throw error;

    // Log lead activity if we have a lead
    if (leadId) {
      await supabase.from('lead_activities').insert({
        lead_id: leadId,
        platform: 'callrail',
        type: direction === 'inbound' ? 'call_inbound' : 'call_outbound',
        title: `${direction === 'inbound' ? 'Inbound' : 'Outbound'} call via CallRail`,
        description: payload.call_summary || (duration ? `Duration: ${Math.floor(duration / 60)}m ${duration % 60}s` : 'No duration recorded'),
        agent_name: payload.agent_email || null,
        metadata: {
          callrail_id: callrailId,
          source: payload.source,
          source_name: payload.source_name,
          sentiment: payload.sentiment,
          lead_score: payload.lead_score,
          gclid: payload.gclid,
          customer_city: payload.customer_city,
          customer_state: payload.customer_state,
          first_call: payload.first_call,
          tracking_phone: payload.tracking_phone_number,
          utm_source: payload.utm_source,
          utm_medium: payload.utm_medium,
          utm_campaign: payload.utm_campaign,
          call_highlights: payload.call_highlights,
          speaker_percent: payload.speaker_percent,
        },
      });
    }

    // Audit log
    await supabase.from('activities').insert({
      action: 'call_received',
      lead_id: leadId,
      details: { source: 'callrail', callrail_id: callrailId, call_id: data.id },
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
