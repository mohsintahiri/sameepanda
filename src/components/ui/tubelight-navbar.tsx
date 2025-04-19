"use client"

import React, { useEffect, useState, useCallback, memo } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

// Memoized NavItem component for better performance
const NavItemButton = memo(({ 
  item, 
  isActive, 
  onClick 
}: { 
  item: NavItem, 
  isActive: boolean, 
  onClick: () => void 
}) => {
  const Icon = item.icon
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-all duration-50",
        "text-gray-600 hover:text-purple-700 focus:outline-none",
        isActive && "bg-purple-100 text-purple-700",
      )}
      type="button"
      aria-label={`Navigate to ${item.name}`}
    >
      <span className="hidden md:inline">{item.name}</span>
      <span className="md:hidden">
        <Icon size={18} strokeWidth={1.75} />
      </span>
      
      {isActive && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute inset-0 w-full bg-purple-50 rounded-full -z-10"
          transition={{ duration: 0.15, type: "tween" }}
        >
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-purple-500 rounded-t-full" />
        </motion.div>
      )}
    </button>
  )
})

NavItemButton.displayName = 'NavItemButton'

export function NavBar({ items, className }: NavBarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  
  // Optimized active item detection with improved route matching
  const getActiveItem = useCallback(() => {
    const currentPath = pathname || "/"
    const activeItem = items.find(item => {
      if (item.url === "/" && currentPath === "/") {
        return true
      }
      return currentPath !== "/" && item.url !== "/" && currentPath.startsWith(item.url)
    })
    
    return activeItem?.name || items[0].name
  }, [items, pathname])
  
  const [activeTab, setActiveTab] = useState(() => getActiveItem())
  
  // Update active tab only when the pathname changes
  useEffect(() => {
    setActiveTab(getActiveItem())
  }, [pathname, getActiveItem])

  // Debounced resize handler
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    
    // Use passive event listener for better performance
    window.addEventListener("resize", handleResize, { passive: true })
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Memoized click handler to prevent unnecessary re-renders
  const createHandleClick = useCallback((url: string, name: string) => () => {
    if (activeTab !== name) {
      setActiveTab(name)
      router.push(url)
    }
  }, [activeTab, router])

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-30 mb-6 sm:pt-6 pointer-events-none",
        className,
      )}
    >
      <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-white/20 shadow-lg py-1 px-1 rounded-full pointer-events-auto">
        {items.map((item) => (
          <NavItemButton
            key={item.name}
            item={item}
            isActive={activeTab === item.name}
            onClick={createHandleClick(item.url, item.name)}
          />
        ))}
      </div>
    </div>
  )
} 