"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ShoppingBag, ShoppingCart, Maximize, Home as HomeIcon, LogIn, X, Download, FileImage, FileText, CreditCard, Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

export default function HaramainPhotoPackPage() {
  const router = useRouter();
  
  // Product details
  const product = {
    id: 2,
    name: "Haramain Photo Pack (30)",
    price: "82,00",
    category: "Haramain Packages",
    images: [
      "/images/Haramain Photo Pack (30) 1.webp",
      "/images/Haramain Photo Pack (30) 2.webp",
      "/images/Haramain Photo Pack (30) 3.webp",
    ],
    description: "After working with various businesses over the years whose sole focus is on taking pilgrims for Umrah we noticed that a lot of those brands lack quality visual and photographic content of the two blessed cities of Makkah and Madinah for use on their social media and promotional material.\n\nSo we've compiled some of our best shots, taken during our frequent travels to Saudi Arabia over the past 9 years which others can now utilise for digital content – social media posts, carousels, websites, device wallpapers, presentation slides e-books, trip posters or background imagery for reminders and quotes.",
    features: [
      {
        icon: FileImage,
        title: "30 Premium Images",
        description: "Bespoke photos of Makkah and Madinah landmarks"
      },
      {
        icon: Download,
        title: "One-time Purchase",
        description: "Full ownership of all images"
      },
      {
        icon: FileText,
        title: "Commercial License",
        description: "Licensed for personal or commercial use"
      },
      {
        icon: CreditCard,
        title: "Royalty-free Usage",
        description: "Unlimited and lifetime usage without attribution"
      }
    ],
    termsOfUsage: "By purchasing and using this Haramain Photo Pack, you agree to the following terms:\n\nUsage Rights: You are granted non-exclusive, non-transferable rights to use the photos in this package for personal or commercial purposes.\n\nPermitted Uses: These photos can be used for websites, social media, presentations, advertisements, and other promotional purposes. Please note these are not suitable for printing.\n\nProhibited Uses: Redistribution, resale, or distribution of the photos as standalone items or as part of another stock photo package is strictly prohibited. The photos cannot be used in any manner that is defamatory, obscene, or unlawful from a culturally or Islamic perspective.\n\nAttribution: While attribution is not required, it is appreciated. If feasible, please credit the photos to Bambu Design Co. The link for anyone who may be interested in making a purchase can be found by clicking here.\n\nModification: While all images are sized at 1080×1350, you may modify the photos to suit your purposes, such as resizing, cropping, or adding text overlays, as long as such modifications do not violate the prohibited uses mentioned above. Be creative.\n\nOwnership: Ownership and copyright of the photos remain with Bambu Design Co. Purchasing this package grants you only the specified usage rights outlined in these terms.\n\nLiability: The creator shall not be liable for any damages, including but not limited to direct, indirect, incidental, special, or consequential damages arising from the use or inability to use the photos in this package.\n\nRefunds: Refunds are not available once the digital download of the stock photo package has been completed.\n\nBy downloading and using these photos, you acknowledge that you have read, understood, and agreed to these terms of usage.\n\nFor any inquiries or special permissions beyond these terms, please contact hello@bambudesign.co"
  };

  // Image state and refs
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [fullscreenActive, setFullscreenActive] = useState(false);
  const [fullscreenZoomed, setFullscreenZoomed] = useState(false);
  const [zoomCenter, setZoomCenter] = useState({ x: 50, y: 50 });
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const { addItem, isLoading: isCartLoading, items } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Check if product is already in cart
  const isProductInCart = items.some(item => item.product_id === product.id);

  // Handle mouse move for zoom effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };

  // Handle click on image to enter fullscreen
  const handleImageClick = () => {
    setFullscreenActive(true);
  };

  // Handle click in fullscreen mode
  const handleFullscreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!fullscreenRef.current || !imageContainerRef.current) return;
    
    // Check if click is outside the image
    const imageRect = imageContainerRef.current.getBoundingClientRect();
    const isOutsideImage = 
      e.clientX < imageRect.left || 
      e.clientX > imageRect.right || 
      e.clientY < imageRect.top || 
      e.clientY > imageRect.bottom;
    
    if (isOutsideImage) {
      // Close fullscreen if clicking outside
      setFullscreenActive(false);
      setFullscreenZoomed(false);
      return;
    }

    // Calculate zoom center based on click position
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    
    // Calculate exact coordinates within image
    let x = ((e.clientX - left) / width) * 100;
    let y = ((e.clientY - top) / height) * 100;
    
    // Make sure the zoom center stays within safe margins to prevent zooming outside image boundaries
    x = Math.max(25, Math.min(75, x));
    y = Math.max(25, Math.min(75, y));
    
    setZoomCenter({ x, y });
    
    // Toggle zoom state
    setFullscreenZoomed(!fullscreenZoomed);
  };

  // Close fullscreen when ESC key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && fullscreenActive) {
        setFullscreenActive(false);
        setFullscreenZoomed(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenActive]);

  // Prevent body scroll when fullscreen is active
  useEffect(() => {
    if (fullscreenActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [fullscreenActive]);

  const navItems = [
    { name: 'Home', url: '/', icon: HomeIcon },
    { name: 'Shop', url: '/shop', icon: ShoppingBag },
    { name: 'Cart', url: '/cart', icon: ShoppingCart },
    { name: 'Log In', url: '/login', icon: LogIn }
  ];

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const addToCart = async () => {
    if (isAddingToCart || isProductInCart) return;
    
    setIsAddingToCart(true);
    try {
      await addItem(product.id, 1);
      setIsAddedToCart(true);
      
      // Reset the added state after 2 seconds
      setTimeout(() => {
        setIsAddedToCart(false);
      }, 2000);
      
      toast?.("Item added to cart", {
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast?.("Failed to add item", {
        description: "There was an error adding this item to your cart. Please try again.",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

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
      
      {/* Product Detail Content */}
      <div className="pt-24 pb-24 md:pt-32 md:pb-0 flex flex-col items-center z-20 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="w-full mb-8 flex items-center">
          <Link 
            href="/shop"
            className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Back to shop</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
          {/* Product Images Section */}
          <div className="space-y-4">
            {/* Main Image with Zoom Effect */}
            <div 
              className="relative aspect-square overflow-hidden rounded-md border border-white/10 bg-black/20 cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onClick={handleImageClick}
            >
              <Image
                src={activeImage}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-100"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={95}
              />
              
              {/* Zoom indicator */}
              <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white">
                <Maximize size={16} />
              </div>
              
              {/* Zoom overlay */}
              {showZoom && (
                <div 
                  className="absolute inset-0 bg-no-repeat bg-cover pointer-events-none"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundSize: '200%',
                  }}
                />
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${
                    activeImage === img ? 'border-purple-500' : 'border-white/20'
                  } transition-all hover:border-purple-400`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            
            {/* Preview Text */}
            <div className="text-white/60 text-sm border-t border-white/10 pt-4 mt-2">
              <p className="whitespace-pre-line">
                {product.termsOfUsage}
              </p>
            </div>
          </div>
          
          {/* Product Information */}
          <div className="text-white space-y-4">
            <p className="text-purple-300 text-sm">{product.category}</p>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold">{product.price} €</p>
            
            <div className="pt-4 border-t border-white/10">
              <p className="mb-4 text-white/80 whitespace-pre-line">
                {product.description}
              </p>
              <div className="mt-6">
                <Button 
                  onClick={addToCart} 
                  className="w-full py-6 text-white bg-primary hover:bg-primary/90 rounded-full transition-all duration-300"
                  disabled={isCartLoading || isAddingToCart || isProductInCart}
                >
                  {isAddingToCart ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : isAddedToCart ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Added to Cart
                    </>
                  ) : isProductInCart ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Already in Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="pt-6 mt-6 border-t border-white/10">
              <h2 className="text-xl font-semibold mb-4">What's Included</h2>
              <div className="grid grid-cols-1 gap-4">
                {product.features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex gap-3">
                      <div className="bg-purple-500/20 p-2 rounded-md h-fit">
                        <Icon size={18} className="text-purple-300" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{feature.title}</h3>
                        <p className="text-sm text-white/70">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="pt-6 mt-6 border-t border-white/10">
              <h2 className="text-xl font-semibold mb-4">Image Collection Details</h2>
              <ul className="list-disc list-inside text-white/80 space-y-2">
                <li>30 bespoke photos consisting of key landmarks of Makkah and Madinah</li>
                <li>Including the Ka'bah, The Clock Tower, Masjid an-Nabawi, and more</li>
                <li>An authentic representation of Makkah and Madinah</li>
                <li>Ideal for social media posts, websites, and digital content</li>
                <li>All photos sized at 1080×1350</li>
              </ul>
              
              <div className="mt-6 bg-purple-500/10 p-4 rounded-md">
                <h3 className="font-medium text-white mb-2">Compare with Other Packs</h3>
                <div className="flex gap-3 mt-3">
                  <Link 
                    href="/shop/haramain-60" 
                    className="text-sm text-purple-300 hover:text-purple-200 underline"
                  >
                    60 Image Pack (152€)
                  </Link>
                  <Link 
                    href="/shop/haramain-90" 
                    className="text-sm text-purple-300 hover:text-purple-200 underline"
                  >
                    90 Image Pack (210€)
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Viewer */}
      {fullscreenActive && (
        <div 
          ref={fullscreenRef}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-default"
          onClick={handleFullscreenClick}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white z-10"
            onClick={(e) => {
              e.stopPropagation();
              setFullscreenActive(false);
              setFullscreenZoomed(false);
            }}
          >
            <X size={24} />
          </button>
          
          {/* Extra container specifically to detect mouse leaving the image area */}
          <div className="relative w-[90vw] h-[90vh]">
            <div 
              ref={imageContainerRef}
              className="relative w-full h-full overflow-hidden"
              style={{ 
                cursor: fullscreenZoomed ? 'zoom-out' : 'zoom-in' 
              }}
              onMouseMove={(e) => {
                // Get the image element inside the container
                const imgElement = e.currentTarget.querySelector('img');
                if (!imgElement) return;
                
                // Get actual image boundaries within container
                const imgRect = imgElement.getBoundingClientRect();
                const isOutside = 
                  e.clientX < imgRect.left || 
                  e.clientX > imgRect.right || 
                  e.clientY < imgRect.top || 
                  e.clientY > imgRect.bottom;
                
                // Apply appropriate cursor style based on whether cursor is over the actual image
                e.currentTarget.style.cursor = isOutside ? 'default' : fullscreenZoomed ? 'zoom-out' : 'zoom-in';
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={activeImage}
                  alt={product.name}
                  width={1200}
                  height={800}
                  className={`object-contain transition-transform duration-150 ${
                    fullscreenZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  style={{
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    ...(fullscreenZoomed ? { transformOrigin: `${zoomCenter.x}% ${zoomCenter.y}%` } : {})
                  }}
                  sizes="(max-width: 1200px) 90vw, 1200px"
                  quality={100}
                />
              </div>
            </div>
          </div>
          
          {/* Thumbnail navigation in fullscreen mode */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage(img);
                  setFullscreenZoomed(false);
                }}
                className={`relative w-16 h-16 rounded-md overflow-hidden border-2 ${
                  activeImage === img ? 'border-purple-500' : 'border-white/20'
                } transition-all hover:border-purple-400`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 