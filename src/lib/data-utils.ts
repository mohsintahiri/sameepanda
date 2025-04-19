import { supabase } from './supabase';
import { Product, ProductFeature } from './types';

export async function fetchAllProducts(): Promise<Product[]> {
  try {
    // Get all products
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('id');

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    // For each product, get additional images
    for (const product of products) {
      const { data: images } = await supabase
        .from('product_images')
        .select('image_url')
        .eq('product_id', product.id)
        .order('position');

      if (images && images.length > 0) {
        product.additional_images = images.map(img => img.image_url);
      }

      // Get product features
      const { data: features } = await supabase
        .from('product_features')
        .select('*')
        .eq('product_id', product.id);

      if (features && features.length > 0) {
        product.features = features;
      }
    }

    return products;
  } catch (error) {
    console.error('Error in fetchAllProducts:', error);
    return [];
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    // Get the product
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching product by slug:', error);
      return null;
    }

    // Get additional images
    const { data: images } = await supabase
      .from('product_images')
      .select('image_url')
      .eq('product_id', product.id)
      .order('position');

    if (images && images.length > 0) {
      product.additional_images = images.map(img => img.image_url);
    }

    // Get product features
    const { data: features } = await supabase
      .from('product_features')
      .select('*')
      .eq('product_id', product.id);

    if (features && features.length > 0) {
      product.features = features;
    }

    return product;
  } catch (error) {
    console.error('Error in fetchProductBySlug:', error);
    return null;
  }
}

export function mapIconNameToComponent(iconName: string) {
  // This function would map the icon name from the database to the actual component
  // You would need to implement this based on the icons you use in your app
  return iconName; // Placeholder
}

export function formatPrice(price: string): string {
  // Format price string for display
  // Convert "500,00" to "€500,00"
  return `€${price}`;
} 