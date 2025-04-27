// lib/supabase/client.ts
"use client"

import { createBrowserClient } from '@supabase/ssr'
import { getSupabaseCookieOptions } from './config'

export function createClientSupabaseClient() {
  const cookieOptions = getSupabaseCookieOptions()
  
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return document.cookie
            .split('; ')
            .find((row) => row.startsWith(`${name}=`))
            ?.split('=')[1]
        },
        set(name, value, options) {
          document.cookie = `${name}=${value}; ${Object.entries({
            ...cookieOptions,
            ...options,
          })
            .map(([key, value]) => `${key}=${value}`)
            .join('; ')}`
        },
        remove(name, options) {
          document.cookie = `${name}=; max-age=0; ${Object.entries({
            ...cookieOptions,
            ...options,
          })
            .map(([key, value]) => `${key}=${value}`)
            .join('; ')}`
        },
      },
    }
  )
}