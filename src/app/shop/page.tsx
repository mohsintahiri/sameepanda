"use client";

import Image from "next/image";
import Link from "next/link";
import { Home as HomeIcon, ShoppingBag, ShoppingCart, LogIn, Camera, Building } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import { useState } from "react";

// Define product data as a const (not exported)
const products = [
  {
    id: 1,
    name: "1 Hour Brand Consultation",
    price: "500,00",
    category: "Consultation Services",
    buttonText: "Book Now",
    buttonLink: "/shop/brand-consultation",
    image: "/images/1 Hour Brand Consultation.webp",
    slug: "brand-consultation"
  },
  {
    id: 2,
    name: "Haramain Photo Pack (30)",
    price: "82,00",
    category: "Haramain Packages",
    buttonText: "Add to cart",
    image: "/images/Haramain Photo Pack (30) 1.webp", 
    additionalImages: [
      "/images/Haramain Photo Pack (30) 2.webp",
      "/images/Haramain Photo Pack (30) 3.webp"
    ],
    slug: "haramain-30"
  },
  {
    id: 3,
    name: "Haramain Photo Pack (60)",
    price: "152,00",
    category: "Haramain Packages",
    buttonText: "Add to cart",
    image: "/images/Haramain Photo Pack (60) 1.webp",
    additionalImages: [
      "/images/Haramain Photo Pack (60) 2.webp",
      "/images/Haramain Photo Pack (60) 3.webp"
    ],
    slug: "haramain-60"
  },
  {
    id: 4,
    name: "Haramain Photo Pack (90)",
    price: "210,00",
    category: "Haramain Packages",
    buttonText: "Add to cart",
    image: "/images/Haramain Photo Pack (90) 1.webp",
    additionalImages: [
      "/images/Haramain Photo Pack (90) 2.webp",
      "/images/Haramain Photo Pack (90) 3.webp"
    ],
    slug: "haramain-90"
  }
];

// Don't export products here
// export { products };

export default function Shop() {
  const { addItem, isLoading: isCartLoading } = useCart();
  const [loadingItems, setLoadingItems] = useState<number[]>([]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleAddToCart = async (productId: number, productName: string) => {
    if (loadingItems.includes(productId)) return;
    
    setLoadingItems(prev => [...prev, productId]);
    
    try {
      await addItem(productId, 1);
      toast?.("Item added to cart", {
        description: `${productName} has been added to your cart.`,
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast?.("Failed to add item", {
        description: "There was an error adding this item to your cart. Please try again.",
      });
    } finally {
      setLoadingItems(prev => prev.filter(id => id !== productId));
    }
  };

  const navItems = [
    { name: 'Home', url: '/', icon: HomeIcon },
    { name: 'Shop', url: '/shop', icon: ShoppingBag },
    { name: 'Cart', url: '/cart', icon: ShoppingCart },
    { name: 'Log In', url: '/login', icon: LogIn }
  ]

  return (
    <div 
      className="relative min-h-screen flex flex-col items-center overflow-hidden"
      onContextMenu={handleContextMenu}
    >
      {/* Background image - fixed position */}
      <div className="fixed inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/images/Web Gradient copy.png" 
          alt="Background gradient"
          fill
          priority
          className="object-cover blur-[3px] opacity-100"
          style={{ objectPosition: 'center center' }}
          draggable="false"
          onDragStart={handleContextMenu}
          unoptimized
        />
        {/* Darkening overlay */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[0px]"></div>
      </div>
      
      {/* Navbar */}
      <NavBar items={navItems} />
      
      {/* Shop Content */}
      <div className="pt-24 pb-24 md:pt-32 md:pb-0 flex flex-col items-center z-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-montserrat font-bold text-white mb-10 tracking-wider">Our Shop</h1>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white/5 backdrop-blur-sm rounded-md overflow-hidden border border-white/10 transition-all hover:shadow-lg hover:bg-white/10 flex flex-col"
            >
              {/* Product Image with Hover Effect */}
              <Link href={`/shop/${product.slug}`} className="block aspect-square relative overflow-hidden group">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-150 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-end justify-center pb-4">
                  <span className="text-white text-sm font-medium px-3 py-1 bg-purple-600/80 rounded-full">
                    View Details
                  </span>
                </div>
              </Link>
              
              <div className="p-4 flex flex-col flex-grow">
                <p className="text-white/70 text-xs mb-1">{product.category}</p>
                <Link href={`/shop/${product.slug}`} className="hover:text-purple-300 transition-colors">
                  <h3 className="text-white font-semibold mb-2">{product.name}</h3>
                </Link>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-white font-medium">{product.price} €</span>
                  {product.id === 1 ? (
                    <Link 
                      href={product.buttonLink || "#"}
                      className="bg-white/90 text-purple-700 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide hover:bg-opacity-100 transition-all"
                    >
                      {product.buttonText}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(product.id, product.name)}
                      disabled={loadingItems.includes(product.id)}
                      className="bg-white/90 text-purple-700 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide hover:bg-opacity-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[90px]"
                    >
                      {loadingItems.includes(product.id) ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-purple-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Adding...
                        </span>
                      ) : (
                        product.buttonText
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 