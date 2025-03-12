/*
  # Create NGOs table

  1. New Tables
    - `ngos`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `category` (text, not null)
      - `focus_areas` (text)
      - `description` (text)
      - `website` (text)
      - `contact` (text)
      - `address` (text)
      - `established` (text)
      - `district` (text, not null)
      - `coordinates` (jsonb)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `ngos` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS ngos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  focus_areas text,
  description text,
  website text,
  contact text,
  address text,
  established text,
  district text NOT NULL,
  coordinates jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ngos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON ngos
  FOR SELECT
  TO public
  USING (true);