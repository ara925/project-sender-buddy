
UPDATE public.honeypots
SET 
  access_log = '[
    {"time":"Feb 13, 11:02 AM","action":"Log Entry 1","user":"Aisha Williams","ip":"192.168.1.47","device":"Chrome / Windows","type":"access"},
    {"time":"Feb 13, 11:04 AM","action":"Log Entry 2","user":"Aisha Williams","ip":"192.168.1.47","device":"Chrome / Windows","type":"access"},
    {"time":"Feb 13, 11:08 AM","action":"Log Entry 3","user":"Aisha Williams","ip":"192.168.1.47","device":"Chrome / Windows","type":"access"},
    {"time":"Feb 13, 11:14 AM","action":"Incoming Call from (310) 555-1212","user":"Unknown External","ip":"N/A","device":"N/A","type":"call"},
    {"time":"Feb 13, 11:14 AM","action":"🚨 SECURITY ALERT: Notices Sent","user":"System","ip":"N/A","device":"N/A","type":"alert"}
  ]'::jsonb,
  burner_activity = '[
    {"type":"call","from":"(310) 555-1212","time":"Feb 13, 11:14 AM","content":"Incoming call — 18 seconds."},
    {"type":"voicemail","from":"(213) 555-1212","time":"Feb 13, 11:16 AM","content":"Voicemail from (213) 555-1212."}
  ]'::jsonb
WHERE fake_name = 'Maria Delgado';
