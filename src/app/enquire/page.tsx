"use client";

import Image from "next/image";
import { useState } from "react";
import { Home as HomeIcon, ShoppingBag, ShoppingCart, LogIn, Send, User, Mail, Phone, MessageSquare } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

export default function Enquire() {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const navItems = [
    { name: 'Home', url: '/', icon: HomeIcon },
    { name: 'Shop', url: '/shop', icon: ShoppingBag },
    { name: 'Cart', url: '/cart', icon: ShoppingCart },
    { name: 'Log In', url: '/login', icon: LogIn }
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<null | "success" | "error">(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("error");
      return;
    }

    // In a real implementation, you would send this data to your backend
    console.log("Form submitted:", formData);
    setFormStatus("success");
    
    // Reset form after successful submission
    if (formStatus === "success") {
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
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
      
      {/* Enquire Content */}
      <div className="pt-24 pb-24 md:pt-32 md:pb-0 flex flex-col items-center z-20 w-full max-w-3xl px-4 sm:px-6">
        <div className="relative h-20 w-48 select-none pointer-events-none mb-4 filter brightness-100 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
          <Image
            src="/images/Main Logo white.png"
            alt="BAMBU Logo"
            fill
            className="object-contain"
            priority
            draggable="false"
            onDragStart={handleContextMenu}
            unoptimized
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-6 tracking-wider text-center">
          Enquire Now
        </h1>
        
        <p className="text-white/80 text-center mb-8 max-w-xl">
          Fill out the form below and we'll get back to you as soon as possible. We're excited to hear from you!
        </p>
        
        <div className="w-full bg-white/10 backdrop-blur-md rounded-lg border border-white/10 p-6 md:p-8">
          {formStatus === "success" ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                <Send className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-3">Message Sent!</h2>
              <p className="text-white/70 mb-6">
                Thank you for reaching out. We'll get back to you shortly.
              </p>
              <button
                onClick={() => setFormStatus(null)}
                className="inline-flex items-center justify-center bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-md transition-all hover:bg-white hover:shadow-lg font-medium tracking-wide text-sm text-purple-700 border border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {formStatus === "error" && (
                <div className="p-3 bg-red-400/20 border border-red-400/30 rounded text-white mb-4">
                  Please fill out all required fields.
                </div>
              )}
              
              <div>
                <label htmlFor="name" className="block text-white/80 text-sm font-medium mb-1">
                  Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-white/40" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/30"
                    placeholder="Your name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-1">
                  Email <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/40" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/30"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-white/80 text-sm font-medium mb-1">
                  Phone Number <span className="text-white/50">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-white/40" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/30"
                    placeholder="Your phone number"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white/80 text-sm font-medium mb-1">
                  Message <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <MessageSquare className="h-5 w-5 text-white/40" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="block w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/30"
                    placeholder="How can we help you?"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-white/90 backdrop-blur-md px-6 py-3 rounded-md transition-all hover:bg-white hover:shadow-lg font-medium tracking-wide text-sm text-purple-700 border border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.3)] flex items-center justify-center"
              >
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 