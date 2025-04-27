"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { 
  Download, 
  Apple, 
} from "lucide-react"
import { FaApple, FaWindows, FaLinux, FaAndroid, FaChrome, FaFirefox } from "react-icons/fa"

interface DownloadDropdownProps {
  onSelect: () => void
}

export default function NavbarDownloadDropdown({ onSelect }: DownloadDropdownProps) {
  // Simplified animations for better performance
  const dropdownVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={dropdownVariants}
      transition={{ duration: 0.1 }}
      className="mt-1 bg-card border border-border rounded-lg shadow-lg py-2 w-[300px]"
    >
      <div className="p-3">
        <h3 className="font-medium text-sm mb-3">Desktop Apps</h3>
        <div className="grid grid-cols-2 gap-2">
          <Link 
            href="/download/mac"
            className="flex items-center p-2 rounded-md hover:bg-muted transition-colors"
            onClick={onSelect}
          >
            <div className="h-8 w-8 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
              <FaApple className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-medium">macOS</div>
              <div className="text-xs text-muted-foreground">Intel & Apple Silicon</div>
            </div>
          </Link>
          
          <Link 
            href="/download/windows"
            className="flex items-center p-2 rounded-md hover:bg-muted transition-colors"
            onClick={onSelect}
          >
            <div className="h-8 w-8 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
              <FaWindows className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-medium">Windows</div>
              <div className="text-xs text-muted-foreground">64-bit installer</div>
            </div>
          </Link>
          
          <Link 
            href="/download/linux"
            className="flex items-center p-2 rounded-md hover:bg-muted transition-colors"
            onClick={onSelect}
          >
            <div className="h-8 w-8 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
              <FaLinux className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-medium">Linux</div>
              <div className="text-xs text-muted-foreground">deb & rpm packages</div>
            </div>
          </Link>
        </div>
        
        <h3 className="font-medium text-sm mt-4 mb-3">Mobile Apps</h3>
        <div className="grid grid-cols-2 gap-2">
          <Link 
            href="/download/ios"
            className="flex items-center p-2 rounded-md hover:bg-muted transition-colors"
            onClick={onSelect}
          >
            <div className="h-8 w-8 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
              <FaApple className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-medium">iOS</div>
              <div className="text-xs text-muted-foreground">App Store</div>
            </div>
          </Link>
          
          <Link 
            href="/download/android"
            className="flex items-center p-2 rounded-md hover:bg-muted transition-colors"
            onClick={onSelect}
          >
            <div className="h-8 w-8 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
              <FaAndroid className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-medium">Android</div>
              <div className="text-xs text-muted-foreground">Google Play</div>
            </div>
          </Link>
        </div>
        
        <h3 className="font-medium text-sm mt-4 mb-3">Browser Extensions</h3>
        <div className="grid grid-cols-2 gap-2">
          <Link 
            href="/download/chrome"
            className="flex items-center p-2 rounded-md hover:bg-muted transition-colors"
            onClick={onSelect}
          >
            <div className="h-8 w-8 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
              <FaChrome className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-medium">Chrome</div>
              <div className="text-xs text-muted-foreground">Extension</div>
            </div>
          </Link>
          
          <Link 
            href="/download/firefox"
            className="flex items-center p-2 rounded-md hover:bg-muted transition-colors"
            onClick={onSelect}
          >
            <div className="h-8 w-8 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
              <FaFirefox className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-medium">Firefox</div>
              <div className="text-xs text-muted-foreground">Add-on</div>
            </div>
          </Link>
        </div>
        
        <div className="mt-4 pt-3 border-t border-border">
          <Link 
            href="/download"
            className="flex items-center justify-center text-primary hover:underline text-sm"
            onClick={onSelect}
          >
            <Download className="h-4 w-4 mr-2" />
            View All Download Options
          </Link>
        </div>
      </div>
    </motion.div>
  )
}