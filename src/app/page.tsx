"use client";

import Link from "next/link";
import Image from "next/image";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { Home, ShoppingBag, ShoppingCart, User, LogIn, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define navigation items once, outside component to prevent re-creation
const navItems = [
  {
    name: "Home",
    url: "/",
    icon: Home,
  },
  {
    name: "Shop",
    url: "/shop",
    icon: ShoppingBag,
  },
  {
    name: "Cart",
    url: "/cart",
    icon: ShoppingCart,
  },
  {
    name: "Log in",
    url: "/login",
    icon: LogIn,
  }
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image with minimal blur for better performance */}
      <Image
        src="/images/Web Gradient copy.png"
        alt="Background"
        fill
        priority
        sizes="100vw"
        fetchPriority="high"
        className="object-cover blur-[3px]"
        style={{ 
          willChange: "transform",
          transform: "translateZ(0)" // Hardware acceleration
        }}
      />

      {/* Dark overlay with minimal backdrop blur */}
      <div 
        className="absolute inset-0 bg-black/10 backdrop-blur-[0px] z-10"
        style={{ willChange: "opacity", transform: "translateZ(0)" }}
      />

      {/* Content Container */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        {/* Logo with optimized rendering */}
        <div className="mb-6 w-full max-w-md">
          <Image
            src="/images/Main Logo white.png"
            alt="Bambu Logo"
            width={350}
            height={256}
            priority
            className="w-full brightness-100 drop-shadow-[0_0_7px_rgba(255,255,255,0.2)]"
            style={{ willChange: "filter", transform: "translateZ(0)" }}
          />
        </div>

        {/* Button with compact design, bigger icon and glowing border */}
        <Link href="https://docs.google.com/forms/d/e/1FAIpQLSdzkfohbieLEJT4QebnnylaXOqfxhNXSxvClkJw-Dj3vnzxjA/viewform" target="_blank" rel="noopener noreferrer">
          <Button
            variant="secondary"
            className="bg-white text-purple-600 font-semibold text-lg px-6 py-2 h-auto rounded-md 
            border border-white/70 transition-all duration-300 ease-out flex items-center gap-2
            shadow-[0_0_6px_rgba(255,255,255,0.6),inset_0_0_0_1px_rgba(255,255,255,0.5)]
            hover:shadow-[0_0_15px_rgba(255,255,255,0.7),inset_0_0_0_1px_rgba(255,255,255,0.7)] 
            hover:scale-105 hover:text-purple-700 hover:border-white"
            style={{ willChange: "transform, box-shadow", transform: "translateZ(0)" }}
          >
            <Mail size={20} strokeWidth={2.5} className="text-purple-600" aria-hidden="true" />
            ENQUIRE NOW
          </Button>
        </Link>
      </div>

      {/* Navigation Bar */}
      <NavBar items={navItems} />
    </main>
  );
}
