
-- Update all honeypot cover stories to Lorem Ipsum
UPDATE public.honeypots SET cover_story = 'Lorem Ipsum';

-- Update all honeypot case_type to Lorem Ipsum
UPDATE public.honeypots SET case_type = 'Lorem Ipsum';

-- Change "Aisha Williams" to "WLF Employee 3" in accessed_by
UPDATE public.honeypots SET accessed_by = 'WLF Employee 3' WHERE accessed_by = 'Aisha Williams';

-- Update access_log entries to replace Aisha Williams with WLF Employee 3
UPDATE public.honeypots 
SET access_log = (
  SELECT jsonb_agg(
    CASE 
      WHEN elem->>'user' = 'Aisha Williams' 
      THEN jsonb_set(elem, '{user}', '"WLF Employee 3"')
      ELSE elem
    END
  )
  FROM jsonb_array_elements(access_log) AS elem
)
WHERE access_log IS NOT NULL 
  AND access_log::text LIKE '%Aisha Williams%';
