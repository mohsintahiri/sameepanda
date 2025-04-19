"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center py-12">
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
      
      <div className="z-10 mb-8">
        <Link href="/">
          <Image
            src="/images/Main Logo white.png"
            alt="BAMBU Logo"
            width={180}
            height={56}
            className="brightness-100 drop-shadow-[0_0_7px_rgba(255,255,255,0.2)]"
            priority
          />
        </Link>
      </div>
      
      <div className="z-10 w-full max-w-md px-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Login Coming Soon</h1>
            <p className="text-white/60 mt-2">Authentication is currently being rebuilt.</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-white block">Email</label>
              <Input 
                type="email" 
                placeholder="name@example.com" 
                className="bg-white/5 border-white/10 text-white placeholder-white/60"
                disabled
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-white block">Password</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="bg-white/5 border-white/10 text-white placeholder-white/60"
                disabled
              />
            </div>
            
            <Button
              disabled
              className="w-full bg-white/30 text-white/70 cursor-not-allowed"
            >
              Login Disabled
            </Button>
            
            <div className="text-center text-white/60 text-sm">
              <Link href="/" className="hover:text-white transition-colors">
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 