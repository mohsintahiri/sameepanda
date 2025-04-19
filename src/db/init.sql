-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price VARCHAR(50) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  image VARCHAR(255) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product Features Table
CREATE TABLE IF NOT EXISTS product_features (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  icon_name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product Images Table (for additional images)
CREATE TABLE IF NOT EXISTS product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  image_url VARCHAR(255) NOT NULL,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Cart Items Table
CREATE TABLE IF NOT EXISTS cart_items (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  total DECIMAL(10, 2) NOT NULL,
  shipping_address TEXT,
  billing_address TEXT,
  payment_method VARCHAR(50),
  shipping_method VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  price_at_purchase VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Consultation Bookings Table
CREATE TABLE IF NOT EXISTS consultation_bookings (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  booking_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create RLS policies
-- Enable Row Level Security on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_bookings ENABLE ROW LEVEL SECURITY;

-- Products - anyone can view, only admins can modify
CREATE POLICY "Products are viewable by everyone" 
  ON products FOR SELECT USING (true);

-- Cart - users can only see and modify their own cart
CREATE POLICY "Users can manage their own cart" 
  ON cart_items FOR ALL USING (auth.uid() = user_id);

-- Orders - users can only see and manage their own orders
CREATE POLICY "Users can view their own orders" 
  ON orders FOR SELECT USING (auth.uid() = user_id);

-- Order Items - users can view items from their own orders
CREATE POLICY "Users can view their own order items" 
  ON order_items FOR SELECT USING (
    order_id IN (SELECT id FROM orders WHERE user_id = auth.uid())
  );

-- Bookings - users can manage their own bookings
CREATE POLICY "Users can manage their own bookings" 
  ON consultation_bookings FOR ALL USING (auth.uid() = user_id);

-- Insert initial products data
INSERT INTO products (name, price, category, description, image, slug) 
VALUES 
  ('1 Hour Brand Consultation', '500,00', 'Consultation Services', 
   'We''re excited to explore your project during our consultation call and discuss how we can elevate your brand. This is a session lasting up to 60 minutes where we aim to provide insightful feedback on your brand, your company logos, website, social media and more. Our audit is then compiled into a document with guidelines for you to implement.',
   '/images/1 Hour Brand Consultation.webp', 'brand-consultation'),
   
  ('Haramain Photo Pack (30)', '82,00', 'Haramain Packages',
   'Our Haramain Photo Pack includes 30 high-quality, professionally captured images of the holy mosques and surrounding areas.',
   '/images/Haramain Photo Pack (30) 1.webp', 'haramain-30'),
   
  ('Haramain Photo Pack (60)', '152,00', 'Haramain Packages',
   'Our medium Haramain Photo Pack includes 60 high-quality, professionally captured images of the holy mosques and surrounding areas.',
   '/images/Haramain Photo Pack (60) 1.webp', 'haramain-60'),
   
  ('Haramain Photo Pack (90)', '210,00', 'Haramain Packages',
   'Our comprehensive Haramain Photo Pack includes 90 high-quality, professionally captured images of the holy mosques and surrounding areas. Perfect for publications, websites, educational materials, and social media content.',
   '/images/Haramain Photo Pack (90) 1.webp', 'haramain-90');

-- Insert product features for consultation
INSERT INTO product_features (product_id, title, description, icon_name) 
VALUES 
  (1, '60 Minutes 1:1 Session', 'Dedicated time with one of our senior brand strategists', 'CalendarClock'),
  (1, 'Personalised Brand Audit', 'Document with detailed guidelines for implementation', 'ClipboardList'),
  (1, 'Call Recording', 'Access the recorded session for future reference', 'BrainCircuit'),
  (1, 'Zoom Meeting Link', 'Sent via e-mail once your appointment has been confirmed', 'Settings');

-- Insert product features for Haramain 90
INSERT INTO product_features (product_id, title, description, icon_name) 
VALUES 
  (4, '90 Premium Images', 'High-resolution photographs (min. 3000×2000px)', 'FileImage'),
  (4, 'Instant Digital Delivery', 'Download all images immediately after purchase', 'Download'),
  (4, 'Commercial License', 'Use in your publications, websites, and marketing materials', 'FileText'),
  (4, 'One-time Payment', 'No subscription or recurring fees', 'CreditCard');

-- Insert additional images
INSERT INTO product_images (product_id, image_url, position)
VALUES
  (2, '/images/Haramain Photo Pack (30) 2.webp', 1),
  (2, '/images/Haramain Photo Pack (30) 3.webp', 2),
  (3, '/images/Haramain Photo Pack (60) 2.webp', 1),
  (3, '/images/Haramain Photo Pack (60) 3.webp', 2),
  (4, '/images/Haramain Photo Pack (90) 2.webp', 1),
  (4, '/images/Haramain Photo Pack (90) 3.webp', 2); 