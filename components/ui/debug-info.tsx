// components/ui/debug-info.tsx
"use client"

import { useState, useEffect } from "react"
import { createClientSupabaseClient } from "@/lib/supabase/client"

export function DebugInfo() {
  const [info, setInfo] = useState<any>({
    loading: true,
    error: null,
    hostname: "",
    pathname: "",
    session: null
  })
  
  useEffect(() => {
    async function checkSession() {
      try {
        const supabase = createClientSupabaseClient()
        const { data, error } = await supabase.auth.getSession()
        
        setInfo({
          loading: false,
          error: error?.message,
          hostname: window.location.hostname,
          pathname: window.location.pathname,
          hasSession: !!data.session,
          user: data.session?.user?.email
        })
      } catch (err: any) {
        setInfo({
          loading: false,
          error: err.message,
          hostname: window.location.hostname,
          pathname: window.location.pathname,
          hasSession: false
        })
      }
    }
    
    checkSession()
  }, [])
  
  if (process.env.NODE_ENV === 'production') return null
  
  return (
    <div className="fixed bottom-4 right-4 z-50 p-4 bg-black/80 text-white rounded-lg text-xs max-w-xs overflow-auto">
      <h3 className="font-bold mb-2">Debug Info</h3>
      <pre>{JSON.stringify(info, null, 2)}</pre>
    </div>
  )
}