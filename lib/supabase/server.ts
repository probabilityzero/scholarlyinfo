// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getSupabaseCookieOptions } from './config'

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  const cookieOptions = getSupabaseCookieOptions()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options) {
          try {
            cookieStore.set(name, value, { 
              ...cookieOptions,
              ...options 
            })
          } catch (error) {
          }
        },
        remove(name, options) {
          try {
            cookieStore.set(name, '', { 
              ...cookieOptions,
              ...options,
              maxAge: 0 
            })
          } catch (error) {
          }
        }
      }
    }
  )
}