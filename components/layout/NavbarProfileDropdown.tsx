"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSimpleAuth } from "@/hooks/use-auth"

const NavbarProfileDropdown: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false)
  const { isAuthenticated, isLoading } = useSimpleAuth()
  const profileRef = useRef<HTMLDivElement>(null)
  
  const [userInfo, setUserInfo] = useState({
    fullName: "Scholarly User",
    email: "",
    avatarUrl: ""
  })
  
  useEffect(() => {
    if (isAuthenticated) {
      try {
        const cachedUser = localStorage.getItem('scholarly_user_info')
        if (cachedUser) {
          setUserInfo(JSON.parse(cachedUser))
        }
      } catch (e) {
        console.log('Error getting cached user info')
      }
    }
  }, [isAuthenticated])
  
  const toggleProfile = () => {
    setIsProfileOpen(prev => !prev)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current && 
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleItemClick = () => {
    setIsProfileOpen(false)
  }

  const handleSignOut = () => {
    const accountUrl = process.env.NEXT_PUBLIC_ACCOUNT_URL || "https://id.scholarly.world"
    const returnUrl = encodeURIComponent(window.location.href)
    
    window.location.href = `${accountUrl}/auth?signout?redirectTo=${returnUrl}`
    setIsProfileOpen(false)
  }

  const handleShortcutsClick = () => {
    setIsProfileOpen(false)
    setIsShortcutsModalOpen(true)
  }

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
    <>
      <div ref={profileRef} className="relative">
        
        <AnimatePresence>
          {isProfileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-40"
                onClick={() => setIsProfileOpen(false)}
                style={{ pointerEvents: "auto" }}
              />
              
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default NavbarProfileDropdown
