
CREATE TABLE rsvps (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  phone text NOT NULL,
  will_attend boolean NOT NULL,
  plus_one boolean NOT NULL DEFAULT false,
  plus_one_name text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone_can_insert_rsvp" ON rsvps FOR INSERT
  TO anon WITH CHECK (true);

CREATE POLICY "anyone_can_select_rsvp" ON rsvps FOR SELECT
  TO anon USING (true);
