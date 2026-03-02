
UPDATE public.honeypots
SET 
  threat_analysis = NULL,
  access_log = '[{"time":"Feb 13, 11:02 AM","action":"Opened full case record","user":"Aisha Williams","ip":"192.168.1.47","device":"Chrome / Windows","type":"access"},{"time":"Feb 13, 11:04 AM","action":"Accessed contact info section","user":"Aisha Williams","ip":"192.168.1.47","device":"Chrome / Windows","type":"access"},{"time":"Feb 13, 11:08 AM","action":"Re-opened record — second session","user":"Aisha Williams","ip":"192.168.1.47","device":"Chrome / Windows","type":"access"},{"time":"Feb 13, 11:14 AM","action":"Burner phone received call from (510) 555-0342","user":"Unknown External","ip":"N/A","device":"N/A","type":"call"},{"time":"Feb 13, 11:14 AM","action":"🚨 SECURITY ALERT: Notices Sent","user":"System","ip":"N/A","device":"N/A","type":"alert"}]'::jsonb,
  cover_story = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore. Catastrophic injury with clear liability — commercial defendant.',
  burner_activity = '[{"type":"call","from":"(510) 555-0342","time":"Feb 13, 11:14 AM","content":"Incoming call — 18 seconds. Caller asked for Maria regarding her fall. Voicemail left."},{"type":"voicemail","from":"(510) 555-0342","time":"Feb 13, 11:14 AM","content":"Hi Maria, this is Tony from Rivera & Associates. We specialize in premises liability. Please call me back."}]'::jsonb
WHERE fake_name = 'Maria Delgado';

-- Also clear threat_analysis from all other honeypots and shorten cover stories
UPDATE public.honeypots SET threat_analysis = NULL WHERE threat_analysis IS NOT NULL;

UPDATE public.honeypots SET cover_story = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sidewalk defect — city defendant, strong liability indicators.' WHERE fake_name = 'Jorge Reyes';

UPDATE public.honeypots SET cover_story = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Wrongful death — commercial truck, highest value category.' WHERE fake_name = 'Linda Tran';

UPDATE public.honeypots SET cover_story = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product liability — vehicle recall, airbag failure, manufacturer defect.' WHERE fake_name = 'Sandra Okafor';

UPDATE public.honeypots SET cover_story = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Catastrophic auto MVA — clear liability, extended hospitalization.' WHERE fake_name = 'Rosa Gutierrez';

UPDATE public.honeypots SET cover_story = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Child victim — institutional negligence, prior bite history, facial scarring.' WHERE fake_name = 'Amara Jenkins';

UPDATE public.honeypots SET cover_story = 'Lorem ipsum dolor sit amet. Night shift worker — meal/rest break violations, hotel chain defendant.' WHERE fake_name = 'Kevin Nakamura';

UPDATE public.honeypots SET cover_story = 'Lorem ipsum dolor sit amet. Car salesman — unpaid meetings, expense reimbursement, meal break interruptions.' WHERE fake_name = 'Derek Lawson';
