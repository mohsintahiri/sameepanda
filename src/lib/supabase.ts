import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for database schema
export type Profile = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  default_shipping_address: string | null;
  default_billing_address: string | null;
  created_at: string;
  updated_at: string;
  last_login: string | null;
};

export type CartItem = {
  id: number;
  user_id: string;
  product_id: number;
  quantity: number;
  created_at: string;
  product?: Product;
};

export type Product = {
  id: number;
  name: string;
  price: string;
  category: string;
  description: string | null;
  image: string;
  slug: string;
  created_at: string;
  updated_at: string;
  features?: ProductFeature[];
  images?: ProductImage[];
};

export type ProductFeature = {
  id: number;
  product_id: number;
  title: string;
  description: string | null;
  icon_name: string;
  created_at: string;
};

export type ProductImage = {
  id: number;
  product_id: number;
  image_url: string;
  position: number;
  created_at: string;
};

export type GuestCart = {
  id: string;
  cart_token: string;
  created_at: string;
  expires_at: string;
};

export type GuestCartItem = {
  id: number;
  guest_cart_id: string;
  product_id: number;
  quantity: number;
  created_at: string;
  product?: Product;
};

// Auth helper functions
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
};

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Products helper functions
export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  return { data, error };
};

export const getProductBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();
  return { data, error };
};

// Cart helper functions
export const getCart = async (userId: string) => {
  const { data, error } = await supabase
    .from('cart_items')
    .select('*, product:products(*)')
    .eq('user_id', userId);
  return { data, error };
};

export const addToCart = async (userId: string, productId: number, quantity: number = 1) => {
  // Check if the item already exists in the cart
  const { data: existingItem } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single();

  if (existingItem) {
    // Update quantity if item exists
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity: existingItem.quantity + quantity })
      .eq('id', existingItem.id);
    return { data, error };
  } else {
    // Insert new item if it doesn't exist
    const { data, error } = await supabase
      .from('cart_items')
      .insert({ user_id: userId, product_id: productId, quantity });
    return { data, error };
  }
};

export const removeFromCart = async (cartItemId: number) => {
  const { data, error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', cartItemId);
  return { data, error };
};

// Orders helper functions
export const createOrder = async (userId: string, orderData: any) => {
  // Start a transaction - first create the order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      status: 'pending',
      ...orderData
    })
    .select()
    .single();

  if (orderError) return { error: orderError };

  // Get cart items to convert to order items
  const { data: cartItems, error: cartError } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', userId);

  if (cartError) return { error: cartError };

  // Convert cart items to order items
  const orderItems = cartItems.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price_at_purchase: item.price // You would typically get this from the products table
  }));

  // Insert order items
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) return { error: itemsError };

  // Clear the cart
  const { error: clearCartError } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId);

  return { data: order, error: clearCartError };
};

// Consultation bookings helper functions
export const createBooking = async (bookingData: any) => {
  const { data, error } = await supabase
    .from('consultation_bookings')
    .insert(bookingData)
    .select();
  return { data, error };
};

export const getBookingsByUser = async (userId: string) => {
  const { data, error } = await supabase
    .from('consultation_bookings')
    .select('*')
    .eq('user_id', userId);
  return { data, error };
}; 