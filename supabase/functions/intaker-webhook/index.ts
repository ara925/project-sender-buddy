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

    // Log the full raw payload so we can inspect exactly what Intaker sends
    console.log('Intaker raw payload:', JSON.stringify(payload, null, 2));

    // Map common Intaker fields to our leads table
    // We'll refine this after seeing the actual payload
    const leadData = {
      source: 'intaker',
      first_name: payload.first_name || payload.firstName || payload.name?.split(' ')[0] || 'Unknown',
      last_name: payload.last_name || payload.lastName || payload.name?.split(' ').slice(1).join(' ') || '',
      email: payload.email || null,
      phone: payload.phone || payload.phone_number || payload.phoneNumber || null,
      status: 'new',
      case_type: payload.case_type || payload.caseType || payload.practice_area || null,
      notes: payload.transcript || payload.message || payload.notes || null,
      external_id: payload.id || payload.lead_id || payload.leadId || null,
    };

    const { data, error } = await supabase
      .from('leads')
      .insert(leadData)
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await supabase.from('activities').insert({
      lead_id: data.id,
      action: 'lead_created',
      details: { source: 'intaker', raw_payload: payload },
    });

    console.log('Lead created from Intaker:', data.id);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Intaker webhook error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
