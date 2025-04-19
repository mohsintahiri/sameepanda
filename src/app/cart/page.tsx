"use client";

import Image from "next/image";
import Link from "next/link";
import { Home as HomeIcon, ShoppingBag, ShoppingCart, LogIn, Trash2, Loader2, Minus, Plus } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

export default function Cart() {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const { items, isLoading, subtotal, removeItem, updateQuantity } = useCart();
  const [processingItems, setProcessingItems] = useState<Record<number, boolean>>({});

  const navItems = [
    { name: 'Home', url: '/', icon: HomeIcon },
    { name: 'Shop', url: '/shop', icon: ShoppingBag },
    { name: 'Cart', url: '/cart', icon: ShoppingCart },
    { name: 'Log In', url: '/login', icon: LogIn }
  ]

  // Format price using the European format (comma as decimal separator)
  const formatPrice = (price: number): string => {
    return price.toFixed(2).replace('.', ',') + ' €';
  };

  // Handle removing an item
  const handleRemoveItem = async (itemId: number) => {
    setProcessingItems(prev => ({ ...prev, [itemId]: true }));
    try {
      await removeItem(itemId);
    } finally {
      setProcessingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  // Handle updating quantity
  const handleUpdateQuantity = async (itemId: number, quantity: number) => {
    setProcessingItems(prev => ({ ...prev, [itemId]: true }));
    try {
      await updateQuantity(itemId, quantity);
    } finally {
      setProcessingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  return (
    <div 
      className="relative min-h-screen flex flex-col items-center overflow-hidden"
      onContextMenu={handleContextMenu}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/images/Web Gradient copy.png" 
          alt="Background gradient"
          fill
          priority
          className="object-cover blur-[3px]"
          draggable="false"
          onDragStart={handleContextMenu}
          unoptimized
        />
        {/* Darkening overlay */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[0px]"></div>
      </div>
      
      {/* Navbar */}
      <NavBar items={navItems} />
      
      {/* Cart Content */}
      <div className="pt-24 pb-24 md:pt-32 md:pb-0 flex flex-col items-center z-20 w-full max-w-3xl px-4 sm:px-6">
        <h1 className="text-4xl font-montserrat font-bold text-white mb-10 tracking-wider">Your Cart</h1>
        
        {isLoading ? (
          <div className="flex items-center justify-center p-12 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 w-full">
            <Loader2 className="h-10 w-10 text-white animate-spin" />
            <span className="ml-3 text-white">Loading cart...</span>
          </div>
        ) : items.length > 0 ? (
          <>
            {/* Cart Items */}
            <div className="w-full bg-white/10 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden mb-6">
              {items.map((item) => (
                <div key={item.id} className="p-4 border-b border-white/10 flex flex-wrap md:flex-nowrap items-center justify-between">
                  <div className="w-full md:w-auto mb-2 md:mb-0">
                    <h3 className="text-white font-semibold">{item.product?.name}</h3>
                    <div className="text-white/70 text-sm mt-1">
                      {item.product?.price ? 
                        `${item.product.price} × ${item.quantity}` : 
                        `Unknown price × ${item.quantity}`}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-auto">
                    {/* Quantity controls */}
                    <div className="flex items-center">
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={processingItems[item.id]}
                        className="p-1 rounded-md bg-white/20 text-white hover:bg-white/30 transition-colors disabled:opacity-50"
                        aria-label="Decrease quantity"
                        title="Remove from cart"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="mx-2 text-white min-w-[25px] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={true}
                        className="p-1 rounded-md bg-white/20 text-white hover:bg-white/30 transition-colors disabled:opacity-50 cursor-not-allowed"
                        aria-label="Increase quantity"
                        title="Maximum quantity of 1 allowed per digital product"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-white font-medium min-w-[80px] text-right">
                      {item.product?.price ?
                        formatPrice(parseFloat(item.product.price.replace(',', '.').replace(/[^\d.-]/g, '')) * item.quantity) :
                        'N/A'
                      }
                    </div>
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={processingItems[item.id]}
                      className="text-white/60 hover:text-white transition-colors disabled:opacity-50"
                      aria-label="Remove item"
                    >
                      {processingItems[item.id] ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Cart Summary */}
            <div className="w-full bg-white/10 backdrop-blur-md rounded-lg border border-white/10 p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white/80">Subtotal</span>
                <span className="text-white font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-white/80">Shipping</span>
                <span className="text-white font-medium">Free</span>
              </div>
              <div className="border-t border-white/10 pt-4 mt-2 flex justify-between items-center">
                <span className="text-white font-semibold">Total</span>
                <span className="text-white font-bold">{formatPrice(subtotal)}</span>
              </div>
              <button className="w-full mt-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-md transition-all hover:bg-white hover:shadow-lg font-medium tracking-wide text-sm text-purple-700 border border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="text-center p-10 bg-white/10 backdrop-blur-md rounded-lg border border-white/10">
            <ShoppingCart className="h-16 w-16 text-white/40 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">Your cart is empty</h2>
            <p className="text-white/70 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link 
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-md transition-all hover:bg-white hover:shadow-lg font-medium tracking-wide text-sm text-purple-700 border border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              <ShoppingBag size={16} />
              Browse Shop
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 