'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase, Product, GuestCartItem } from '@/lib/supabase';

// Type for cart context
type CartContextType = {
  items: GuestCartItem[];
  isLoading: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (productId: number, quantity?: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Local storage key for guest cart token
const GUEST_CART_TOKEN_KEY = 'bambu_guest_cart_token';

// CartProvider component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<GuestCartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [guestCartToken, setGuestCartToken] = useState<string | null>(null);

  // Calculate derived values
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const subtotal = items.reduce((total, item) => {
    // Parse the price string (e.g., "152,00" -> 152.00)
    if (!item.product) return total;
    
    const price = parseFloat(
      item.product.price.replace(',', '.').replace(/[^\d.-]/g, '')
    );
    return total + price * item.quantity;
  }, 0);

  // Initialize guest cart token on mount
  useEffect(() => {
    // Skip localStorage operations during SSR
    if (typeof window === 'undefined') {
      return;
    }
    
    try {
      const storedToken = localStorage.getItem(GUEST_CART_TOKEN_KEY);
      if (storedToken) {
        setGuestCartToken(storedToken);
      } else {
        const newToken = uuidv4();
        localStorage.setItem(GUEST_CART_TOKEN_KEY, newToken);
        setGuestCartToken(newToken);
      }
    } catch (error) {
      console.error('Error initializing guest cart token:', error);
    }
  }, []);

  // Load cart items - guest cart only for now
  useEffect(() => {
    const loadCartItems = async () => {
      if (!guestCartToken) return;
      
      setIsLoading(true);
      try {
        // User is not logged in, load guest cart
        // First, ensure the guest cart exists in the database
        await ensureGuestCartExists(guestCartToken);

        // Then, load its items
        const { data: guestCartData, error: guestCartError } = await supabase
          .from('guest_carts')
          .select('id')
          .eq('cart_token', guestCartToken)
          .single();

        if (guestCartError) {
          console.error('Error fetching guest cart:', guestCartError);
          setItems([]);
        } else {
          const { data: guestItems, error: guestItemsError } = await supabase
            .from('guest_cart_items')
            .select('*, product:products(*)')
            .eq('guest_cart_id', guestCartData.id);

          if (guestItemsError) {
            console.error('Error fetching guest cart items:', guestItemsError);
            setItems([]);
          } else {
            setItems(guestItems as GuestCartItem[]);
          }
        }
      } catch (error) {
        console.error('Error fetching guest cart:', error);
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (guestCartToken) {
      loadCartItems();
    }
  }, [guestCartToken]);

  // Create a guest cart if it doesn't exist
  const ensureGuestCartExists = async (token: string) => {
    try {
      console.log('Ensuring guest cart exists for token:', token);
      
      if (!token) {
        console.error('No token provided to ensureGuestCartExists');
        return;
      }

      const { data, error } = await supabase
        .from('guest_carts')
        .select('id')
        .eq('cart_token', token)
        .maybeSingle();

      if (error) {
        console.error('Error checking guest cart:', error);
        
        // Log more details about the error
        if (error.code) {
          console.error('Error code:', error.code);
        }
        if (error.message) {
          console.error('Error message:', error.message);
        }
        if (error.details) {
          console.error('Error details:', error.details);
        }
        
        return;
      }

      if (!data) {
        console.log('No existing cart found, creating new guest cart');
        // Create a new guest cart
        const { error: insertError, data: insertData } = await supabase
          .from('guest_carts')
          .insert({ cart_token: token })
          .select('id')
          .single();

        if (insertError) {
          console.error('Error creating guest cart:', insertError);
          
          // Log more details about the insert error
          if (insertError.code) {
            console.error('Insert error code:', insertError.code);
          }
          if (insertError.message) {
            console.error('Insert error message:', insertError.message);
          }
          if (insertError.details) {
            console.error('Insert error details:', insertError.details);
          }
        } else {
          console.log('Successfully created guest cart with ID:', insertData?.id);
        }
      } else {
        console.log('Found existing guest cart with ID:', data.id);
      }
    } catch (e) {
      console.error('Unexpected error in ensureGuestCartExists:', e);
    }
  };

  // Add item to cart
  const addItem = async (productId: number, quantity = 1) => {
    if (quantity <= 0 || !guestCartToken) return;
    
    setIsLoading(true);
    try {
      // Get guest cart ID
      const { data: guestCartData, error: guestCartError } = await supabase
        .from('guest_carts')
        .select('id')
        .eq('cart_token', guestCartToken)
        .single();

      if (guestCartError) {
        console.error('Error getting guest cart:', guestCartError);
        return;
      }

      // Check if item already exists in guest cart
      const { data: existingItem, error: checkError } = await supabase
        .from('guest_cart_items')
        .select('id, quantity')
        .eq('guest_cart_id', guestCartData.id)
        .eq('product_id', productId)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing item:', checkError);
        return;
      }

      if (existingItem) {
        // Item already exists - as we're limiting to 1 per product, 
        // we don't need to update the quantity
        // Just return without making any changes
        console.log('Product already in cart, maximum quantity of 1 reached');
        return;
      } else {
        // Add new item with quantity of 1 (ignore passed quantity)
        const { error: insertError } = await supabase.from('guest_cart_items').insert({
          guest_cart_id: guestCartData.id,
          product_id: productId,
          quantity: 1, // Always set to 1 regardless of requested quantity
        });

        if (insertError) {
          console.error('Error adding item to guest cart:', insertError);
        }
      }

      // Reload cart items
      const { data: guestCartData2 } = await supabase
        .from('guest_carts')
        .select('id')
        .eq('cart_token', guestCartToken)
        .single();

      const { data: guestItems } = await supabase
        .from('guest_cart_items')
        .select('*, product:products(*)')
        .eq('guest_cart_id', guestCartData2?.id);

      if (guestItems) {
        setItems(guestItems as GuestCartItem[]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart
  const removeItem = async (itemId: number) => {
    if (!guestCartToken) return;
    
    setIsLoading(true);
    try {
      // Remove from guest cart
      const { error } = await supabase
        .from('guest_cart_items')
        .delete()
        .eq('id', itemId);

      if (error) {
        console.error('Error removing item from guest cart:', error);
        return;
      }

      // Update local state
      setItems(items.filter(item => item.id !== itemId));
    } finally {
      setIsLoading(false);
    }
  };

  // Update quantity - modify to limit maximum quantity to 1
  const updateQuantity = async (itemId: number, quantity: number) => {
    if (!guestCartToken) return;

    // Enforce maximum quantity of 1
    const actualQuantity = Math.min(quantity, 1);
    
    if (actualQuantity <= 0) {
      await removeItem(itemId);
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('guest_cart_items')
        .update({ quantity: actualQuantity })
        .eq('id', itemId);

      if (error) {
        console.error('Error updating cart item quantity:', error);
      } else {
        // Update local state
        setItems(prevItems =>
          prevItems.map(item =>
            item.id === itemId
              ? { ...item, quantity: actualQuantity }
              : item
          )
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!guestCartToken) return;
    
    setIsLoading(true);
    try {
      // Get guest cart ID
      const { data: guestCartData, error: guestCartError } = await supabase
        .from('guest_carts')
        .select('id')
        .eq('cart_token', guestCartToken)
        .single();

      if (guestCartError) {
        console.error('Error getting guest cart:', guestCartError);
        return;
      }

      // Clear guest cart
      const { error } = await supabase
        .from('guest_cart_items')
        .delete()
        .eq('guest_cart_id', guestCartData.id);

      if (error) {
        console.error('Error clearing guest cart:', error);
        return;
      }

      // Clear local state
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    items,
    isLoading,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook for accessing cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 