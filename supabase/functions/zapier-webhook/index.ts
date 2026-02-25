import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-webhook-secret',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate webhook secret
    const webhookSecret = req.headers.get('x-webhook-secret');
    const expectedSecret = Deno.env.get('ZAPIER_WEBHOOK_SECRET');
    if (expectedSecret && webhookSecret !== expectedSecret) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const payload = await req.json();
    const { type } = payload; // 'lead', 'call', 'honeypot', 'investigation'

    let result;

    if (type === 'lead') {
      const { data, error } = await supabase.from('leads').insert({
        source: payload.source || 'manual',
        external_id: payload.external_id || null,
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email || null,
        phone: payload.phone || null,
        status: payload.status || 'new',
        case_type: payload.case_type || null,
        notes: payload.notes || null,
        litify_id: payload.litify_id || null,
        google_click_id: payload.google_click_id || null,
      }).select().single();

      if (error) throw error;
      result = data;

      // Log activity
      await supabase.from('activities').insert({
        lead_id: data.id,
        action: 'lead_created',
        details: { source: payload.source, via: 'zapier' },
      });

    } else if (type === 'call') {
      const { data, error } = await supabase.from('calls').insert({
        lead_id: payload.lead_id || null,
        direction: payload.direction || 'inbound',
        duration: payload.duration || null,
        status: payload.status || 'completed',
        caller_number: payload.caller_number,
        recording_url: payload.recording_url || null,
        callrail_id: payload.callrail_id || null,
        regal_id: payload.regal_id || null,
        notes: payload.notes || null,
      }).select().single();

      if (error) throw error;
      result = data;

    } else if (type === 'activity') {
      const { data, error } = await supabase.from('lead_activities').insert({
        lead_id: payload.lead_id,
        platform: payload.platform || 'internal',
        type: payload.activity_type || 'note_added',
        title: payload.title,
        description: payload.description || null,
        agent_name: payload.agent_name || null,
        metadata: payload.metadata || null,
      }).select().single();

      if (error) throw error;
      result = data;

    } else {
      return new Response(JSON.stringify({ error: 'Unknown type. Use: lead, call, or activity' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
