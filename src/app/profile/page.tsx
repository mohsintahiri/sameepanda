"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { Home, ShoppingBag, ShoppingCart } from "lucide-react";

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
  }
];

export default function ProfilePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center">
      {/* Background image */}
      <div className="fixed inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/images/Web Gradient copy.png" 
          alt="Background gradient"
          fill
          priority
          className="object-cover blur-[3px] opacity-100"
          style={{ objectPosition: 'center center' }}
          draggable="false"
          unoptimized
        />
        {/* Darkening overlay */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[0px]"></div>
      </div>
      
      {/* Navbar */}
      <NavBar items={navItems} />
      
      <div className="pt-24 pb-24 md:pt-32 md:pb-0 flex flex-col items-center z-20 w-full max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="w-full bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Profile Coming Soon</h1>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                disabled
              >
                Sign Out
              </Button>
            </div>
          </div>
          
          <div className="space-y-4 text-white/60 text-center py-8">
            <p>User profiles functionality is currently being rebuilt.</p>
            <p>Please check back later.</p>
            
            <div className="pt-4">
              <Link href="/">
                <Button className="bg-white/90 text-purple-700 hover:bg-white">
                  Return to Homepage
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 