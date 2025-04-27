"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MenuDivider } from "../ui/menu-item"
import { useSearchParams } from "next/navigation"

interface JoinPromptProps {
  onItemClick?: () => void
  includeMotion?: boolean
  includeDivider?: boolean
  className?: string
}

export function JoinPrompt({
  onItemClick,
  includeMotion = true,
  includeDivider = true,
  className = "",
}: JoinPromptProps) {
  const searchParams = useSearchParams()
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
  const returnUrl = encodeURIComponent(currentUrl)
  
  // Get the base account URL from environment variable
  const accountUrl = process.env.NEXT_PUBLIC_ACCOUNT_URL || 'https://id.scholarly.world'
  
  // Create sign in and register URLs with return URL param
  const signInUrl = `${accountUrl}/auth?signin?redirectTo=${returnUrl}`
  const registerUrl = `${accountUrl}/auth?signup?redirectTo=${returnUrl}`
  
  const Content = () => (
    <div className={`p-4 ${className}`}>
      <div className="mb-4">
        <h3 className="text-xl font-medium mb-1">Welcome to Scholarly</h3>
        <p className="text-xs text-muted-foreground">
          Sign in to save papers and personalize your experience
        </p>
      </div>
      
      <div className="flex flex-col space-y-2">
        <Link
          href={signInUrl}
          className="w-full py-2 bg-primary text-primary-foreground rounded-md text-center font-medium text-sm hover:bg-primary/90 transition-colors"
          onClick={onItemClick}
        >
          Sign In
        </Link>
        <Link
          href={registerUrl}
          className="w-full py-2 border border-primary text-primary rounded-md text-center font-medium text-sm hover:bg-primary/10 transition-colors"
          onClick={onItemClick}
        >
          Create Account
        </Link>
      </div>
      
      {includeDivider && <MenuDivider />}
    </div>
  )

  if (!includeMotion) {
    return <Content />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.05 }}
    >
      <Content />
    </motion.div>
  )
}