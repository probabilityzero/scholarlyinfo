"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { IconGridDots } from "@tabler/icons-react"

interface AppCardProps {
  title: string
  description: string
  href: string
  color: string
  textColor: string
  current?: boolean
}

function AppCard({ title, description, href, color, textColor, current = false }: AppCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col p-2 px-3 rounded-md hover:bg-muted transition-colors duration-200",
        current && "bg-muted/50"
      )}
    >
      <div className={cn("w-8 h-8 rounded-md flex items-center justify-center mb-1", color)}>
        <span className={cn("font-serif text-lg font-semibold", textColor)}>
          {title.charAt(0)}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold">
          {title}{current && " (current)"}
        </span>
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
    </Link>
  )
}

export default function NavbarSuiteDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      y: -5,
      transformOrigin: "top right"
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      y: -5,
      transition: { 
        duration: 0.15,
        ease: [0.3, 0, 0.8, -0.15]
      }
    }
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={toggleDropdown}
        className={cn(
          "p-2 rounded-full transition-colors duration-200",
          isOpen ? "bg-muted" : "hover:bg-muted"
        )}
        aria-label="Scholarly Suite"
      >
        <IconGridDots size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}  
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
              style={{ pointerEvents: "auto" }}
            />
            
            <motion.div 
              className="absolute right-0 mt-2 w-[250px] rounded-lg shadow-xl border overflow-hidden z-50 bg-background" 
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-3 space-y-2">
                <AppCard
                  title="Scholarly"
                  description="Academic search engine"
                  href="https://scholarly.world"
                  color="bg-blue-50 dark:bg-blue-950"
                  textColor="text-blue-600 dark:text-blue-400"
                />
                <AppCard
                  title="ID"
                  description="Identity management"
                  href="https://id.scholarly.world"
                  color="bg-violet-50 dark:bg-violet-950"
                  textColor="text-violet-600 dark:text-violet-400"
                />
                <AppCard
                  title="Genomics"
                  description="Genome analysis"
                  href="https://genomics.scholarly.world"
                  color="bg-emerald-50 dark:bg-emerald-950"
                  textColor="text-emerald-600 dark:text-emerald-400"
                />
                <AppCard
                  title="Info"
                  description="About Scholarly"
                  href="https://info.scholarly.world"
                  color="bg-amber-50 dark:bg-amber-950"
                  textColor="text-amber-600 dark:text-amber-400"
                />
                
                <div className="border-t my-2"></div>
                
                <div className="flex justify-center pt-1">
                  <Link href="https://info.scholarly.world/apps" className="text-xs text-primary hover:underline">
                    View all Scholarly apps
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}