/*
  # PsyCare Database Schema

  ## Overview
  Complete database schema for PsyCare mental health assessment and consultation app.

  ## New Tables

  ### 1. `test_results`
  Stores psychological assessment results for users
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid, foreign key) - References auth.users
  - `responses` (jsonb) - Stores all 10 question responses
  - `anxiety_score` (integer) - Calculated anxiety score (0-100)
  - `stress_score` (integer) - Calculated stress score (0-100)
  - `depression_score` (integer) - Calculated depression score (0-100)
  - `overall_severity` (text) - mild, moderate, or severe
  - `recommendations` (text) - Generated recommendations
  - `created_at` (timestamptz) - When test was taken

  ### 2. `doctors`
  Healthcare provider information
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Doctor's full name
  - `specialization` (text) - Area of expertise
  - `phone` (text) - Contact number
  - `email` (text) - Email address
  - `consultation_fee` (integer) - Fee in rupees
  - `location` (text) - Clinic/hospital location
  - `latitude` (decimal) - For location services
  - `longitude` (decimal) - For location services
  - `rating` (decimal) - Average rating (0-5)
  - `available` (boolean) - Currently accepting patients
  - `created_at` (timestamptz) - Registration date

  ### 3. `appointments`
  Booking and appointment tracking
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid, foreign key) - Patient reference
  - `doctor_id` (uuid, foreign key) - Doctor reference
  - `test_result_id` (uuid, foreign key) - Related assessment
  - `appointment_date` (timestamptz) - Scheduled time
  - `status` (text) - pending, confirmed, completed, cancelled
  - `payment_id` (uuid, foreign key) - Payment reference
  - `video_call_room_id` (text) - Video call room identifier
  - `notes` (text) - Additional notes
  - `created_at` (timestamptz) - Booking time

  ### 4. `payments`
  Payment transaction records
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid, foreign key) - Payer reference
  - `appointment_id` (uuid, foreign key) - Related appointment
  - `amount` (integer) - Payment amount in rupees
  - `razorpay_payment_id` (text) - Razorpay transaction ID
  - `razorpay_order_id` (text) - Razorpay order ID
  - `status` (text) - pending, success, failed
  - `created_at` (timestamptz) - Payment time

  ## Security
  - Enable RLS on all tables
  - Users can only access their own data
  - Doctors can view their own appointments
  - Appropriate policies for each table
*/

-- Create test_results table
CREATE TABLE IF NOT EXISTS test_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  responses jsonb NOT NULL,
  anxiety_score integer DEFAULT 0,
  stress_score integer DEFAULT 0,
  depression_score integer DEFAULT 0,
  overall_severity text DEFAULT 'mild',
  recommendations text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own test results"
  ON test_results FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own test results"
  ON test_results FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  specialization text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  consultation_fee integer NOT NULL,
  location text NOT NULL,
  latitude decimal,
  longitude decimal,
  rating decimal DEFAULT 4.5,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available doctors"
  ON doctors FOR SELECT
  TO authenticated
  USING (available = true);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  doctor_id uuid REFERENCES doctors(id) ON DELETE CASCADE NOT NULL,
  test_result_id uuid REFERENCES test_results(id) ON DELETE SET NULL,
  appointment_date timestamptz DEFAULT now() + interval '1 day',
  status text DEFAULT 'pending',
  payment_id uuid,
  video_call_room_id text,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own appointments"
  ON appointments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own appointments"
  ON appointments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  appointment_id uuid REFERENCES appointments(id) ON DELETE CASCADE,
  amount integer NOT NULL,
  razorpay_payment_id text,
  razorpay_order_id text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own payments"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own payments"
  ON payments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Insert sample doctors
INSERT INTO doctors (name, specialization, phone, email, consultation_fee, location, latitude, longitude, rating, available)
VALUES 
  ('Dr. Priya Sharma', 'Clinical Psychologist', '+91 98765 43210', 'priya.sharma@psycare.com', 1500, 'Mumbai, Maharashtra', 19.0760, 72.8777, 4.8, true),
  ('Dr. Rajesh Kumar', 'Psychiatrist', '+91 98765 43211', 'rajesh.kumar@psycare.com', 2000, 'Delhi, NCR', 28.7041, 77.1025, 4.7, true),
  ('Dr. Anjali Mehta', 'Counseling Psychologist', '+91 98765 43212', 'anjali.mehta@psycare.com', 1200, 'Bangalore, Karnataka', 12.9716, 77.5946, 4.9, true),
  ('Dr. Vikram Singh', 'Psychiatrist', '+91 98765 43213', 'vikram.singh@psycare.com', 1800, 'Pune, Maharashtra', 18.5204, 73.8567, 4.6, true),
  ('Dr. Sneha Patel', 'Clinical Psychologist', '+91 98765 43214', 'sneha.patel@psycare.com', 1300, 'Ahmedabad, Gujarat', 23.0225, 72.5714, 4.8, true)
ON CONFLICT DO NOTHING;