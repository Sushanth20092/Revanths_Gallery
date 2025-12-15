-- Create admins table for authentication
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create paintings table
CREATE TABLE IF NOT EXISTS paintings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  medium TEXT NOT NULL,
  dimensions TEXT NOT NULL,
  year INTEGER,
  description TEXT,
  status TEXT CHECK (status IN ('AVAILABLE', 'SOLD', 'NOT_FOR_SALE', 'RESERVED')) DEFAULT 'AVAILABLE',
  price DECIMAL(10, 2),
  main_image_url TEXT,
  additional_image_urls TEXT[] DEFAULT '{}',
  is_featured_home BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for featured paintings
CREATE INDEX IF NOT EXISTS paintings_featured_idx ON paintings(is_featured_home) WHERE is_featured_home = TRUE;

-- Insert admin user
-- Email: revanthacharya9481@gmail.com
-- Password hash (bcrypt hash for 'admin123'): $2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/KFm
-- To generate a new hash: use bcrypt in your auth setup, or use online bcrypt generator
INSERT INTO admins (email, password_hash, name) VALUES (
  'revanthacharya9481@gmail.com',
  '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/KFm',
  'Revanth'
) ON CONFLICT (email) DO NOTHING;
