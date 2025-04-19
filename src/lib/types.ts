// Database types
export type User = {
  id: string;
  email: string;
  created_at: string;
};

export type Product = {
  id: number;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
  slug: string;
  created_at: string;
  updated_at: string;
  additional_images?: string[];
  features?: ProductFeature[];
};

export type ProductFeature = {
  id: number;
  product_id: number;
  title: string;
  description: string;
  icon_name: string;
};

export type CartItem = {
  id: number;
  user_id: string;
  product_id: number;
  quantity: number;
  created_at: string;
  product?: Product;
};

export type Order = {
  id: number;
  user_id: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  shipping_address?: string;
  billing_address?: string;
  payment_method?: string;
  shipping_method?: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
};

export type OrderItem = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price_at_purchase: string;
  created_at: string;
  product?: Product;
};

export type ConsultationBooking = {
  id: number;
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  booking_date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at: string;
}; 