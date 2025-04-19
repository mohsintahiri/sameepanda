"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ShoppingBag, ShoppingCart, Maximize, Home as HomeIcon, LogIn, X, CalendarClock, BrainCircuit, Settings, ClipboardList } from "lucide-react";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/ui/tubelight-navbar";

export default function BrandConsultationPage() {
  const router = useRouter();
  
  // Product details
  const product = {
    id: 1,
    name: "1 Hour Brand Consultation",
    price: "500,00",
    category: "Consultation Services",
    image: "/images/1 Hour Brand Consultation.webp",
    description: `We're excited to explore your project during our consultation call and discuss how we can elevate your brand. 
    \n\n
    This is a session lasting up to 60 minutes where we aim to provide insightful feedback on your brand, your company logos, website, social media and more. Our audit is then compiled into a document with guidelines for you to implement.`,
    features: [
      {
        icon: CalendarClock,
        title: "60 Minutes 1:1 Session",
        description: "Dedicated time with one of our senior brand strategists"
      },
      {
        icon: ClipboardList,
        title: "Personalised Brand Audit",
        description: "Document with detailed guidelines for implementation"
      },
      {
        icon: BrainCircuit,
        title: "Call Recording",
        description: "Access the recorded session for future reference"
      },
      {
        icon: Settings,
        title: "Zoom Meeting Link",
        description: "Sent via e-mail once your appointment has been confirmed"
      }
    ]
  };

  // Image state and refs
  const [fullscreenActive, setFullscreenActive] = useState(false);
  const [fullscreenZoomed, setFullscreenZoomed] = useState(false);
  const [zoomCenter, setZoomCenter] = useState({ x: 50, y: 50 });
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

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
            <div 
              className="relative aspect-square overflow-hidden rounded-md border border-white/10 bg-black/20 cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onClick={handleImageClick}
            >
              <Image
                src={product.image}
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
                    backgroundImage: `url(${product.image})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundSize: '200%',
                  }}
                />
              )}
            </div>
          </div>
          
          {/* Product Information */}
          <div className="text-white space-y-4">
            <p className="text-purple-300 text-sm">{product.category}</p>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold">{product.price} €</p>
            
            <div className="pt-4 border-t border-white/10">
              <p className="mb-4 text-white/80">
                {product.description}
              </p>
              <Link
                href="https://calendly.com/bambu-brand/60min-consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white/90 text-purple-700 px-6 py-3 rounded-md font-semibold hover:bg-white transition-colors"
              >
                Book Now
              </Link>
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
              <h2 className="text-xl font-semibold mb-4">Why Choose Our Consultation</h2>
              <p className="text-white/80 mb-3">
                In today's competitive market, a strong brand identity is essential for standing out. Our consultation services provide expert guidance specifically tailored to your business needs, helping you align your visual identity with your business goals.
              </p>
              <p className="text-white/80 mb-3">
                This session is perfect for businesses looking to refine their brand strategy, startups establishing their market presence, or established companies seeking a brand refresh.
              </p>
              <p className="text-white/80 font-medium">
                Looking forward to speaking to you and growing together!
              </p>
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
          <div 
            className="relative w-[90vw] h-[90vh]"
            onMouseOut={() => {
              // This ensures cursor returns to default when mouse leaves this container in any direction
              if (imageContainerRef.current) {
                imageContainerRef.current.style.cursor = 'default';
              }
            }}
          >
            <div 
              ref={imageContainerRef}
              className="relative w-full h-full overflow-hidden"
              onMouseEnter={(e) => {
                // Set cursor to zoom-in or zoom-out when entering the image area
                e.currentTarget.style.cursor = fullscreenZoomed ? 'zoom-out' : 'zoom-in';
              }}
              onMouseLeave={(e) => {
                // Set cursor to default when leaving the image area
                e.currentTarget.style.cursor = 'default';
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
                  src={product.image}
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
        </div>
      )}
    </div>
  );
} 