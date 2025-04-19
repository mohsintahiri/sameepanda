"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ShoppingBag, ShoppingCart, Maximize, Home as HomeIcon, LogIn, X } from "lucide-react";
// Remove import from shop page
// import { products } from "../page";
import { useParams, useRouter } from "next/navigation";
import { NavBar } from "@/components/ui/tubelight-navbar";

// Define products locally
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

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  
  // Find the product based on slug
  const product = products.find(p => p.slug === slug);
  
  // If product not found, show error
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl text-white mb-4">Product not found</h1>
        <Link 
          href="/shop"
          className="flex items-center text-purple-400 hover:text-purple-300"
        >
          <ChevronLeft size={16} />
          <span>Back to shop</span>
        </Link>
      </div>
    );
  }

  // Set up image gallery functionality
  const [activeImage, setActiveImage] = useState(product.image);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [fullscreenActive, setFullscreenActive] = useState(false);
  const [fullscreenZoomed, setFullscreenZoomed] = useState(false);
  const [zoomCenter, setZoomCenter] = useState({ x: 50, y: 50 });
  
  // Refs for fullscreen functionality
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  // All images for the product
  const allImages = [product.image, ...(product.additionalImages || [])];

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
    // This constrains the zoom center to stay between 25% and 75% of the image dimensions
    // which ensures that at 2x zoom (200%), we won't see outside the image edges
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
            {allImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {allImages.map((img, index) => (
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
            )}
          </div>
          
          {/* Product Information */}
          <div className="text-white space-y-4">
            <p className="text-purple-300 text-sm">{product.category}</p>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold">{product.price} €</p>
            
            <div className="pt-4 border-t border-white/10">
              {product.id === 1 ? (
                <>
                  <p className="mb-4 text-white/80">
                    Book a professional consultation session to discuss your brand strategy and visual identity. Our experts will provide valuable insights tailored to your business needs.
                  </p>
                  <Link
                    href="/enquire"
                    className="inline-flex items-center justify-center bg-white/90 text-purple-700 px-6 py-3 rounded-md font-semibold hover:bg-white transition-colors"
                  >
                    Book Now
                  </Link>
                </>
              ) : (
                <>
                  <p className="mb-4 text-white/80">
                    Professional photo pack containing {product.name.includes("30") ? "30" : product.name.includes("60") ? "60" : "90"} high-quality images of the Haramain. Perfect for publications, websites, and social media.
                  </p>
                  <button
                    className="inline-flex items-center justify-center bg-white/90 text-purple-700 px-6 py-3 rounded-md font-semibold hover:bg-white transition-colors"
                  >
                    <ShoppingCart className="mr-2" size={18} />
                    Add to Cart
                  </button>
                </>
              )}
            </div>
            
            <div className="pt-6 mt-6 border-t border-white/10">
              <h2 className="text-xl font-semibold mb-2">Product Details</h2>
              {product.id === 1 ? (
                <ul className="list-disc list-inside text-white/80 space-y-1">
                  <li>1 hour professional brand consultation</li>
                  <li>Expert insights on visual identity</li>
                  <li>Strategic recommendations</li>
                  <li>Follow-up implementation plan</li>
                </ul>
              ) : (
                <ul className="list-disc list-inside text-white/80 space-y-1">
                  <li>{product.name.includes("30") ? "30" : product.name.includes("60") ? "60" : "90"} high-resolution images</li>
                  <li>Professional quality photographs</li>
                  <li>Commercial usage license</li>
                  <li>Digital download format</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Viewer */}
      {fullscreenActive && (
        <div 
          ref={fullscreenRef}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
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
          
          <div 
            ref={imageContainerRef}
            className="relative w-[90vw] h-[90vh] overflow-hidden cursor-zoom-in"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                className={`object-contain transition-transform duration-150 ${
                  fullscreenZoomed ? 'scale-150' : 'scale-100'
                }`}
                style={
                  fullscreenZoomed 
                    ? { transformOrigin: `${zoomCenter.x}% ${zoomCenter.y}%` }
                    : {}
                }
                sizes="100vw"
                quality={100}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 