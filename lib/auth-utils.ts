"use client";

import { createClientSupabaseClient } from "./supabase/client";

// Cache control
const SESSION_CACHE_KEY = "scholarly_session_cache";
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes
let lastAuthRequest = 0;
const REQUEST_THROTTLE = 1000; // 1 second minimum between auth requests

// Get session with caching to prevent excessive API calls
export async function getSession() {
  const supabase = createClientSupabaseClient();
  const now = Date.now();
  
  // Throttle requests to prevent rate limiting
  if (now - lastAuthRequest < REQUEST_THROTTLE) {
    // Try to use cached data instead
    const cachedData = getCachedSession();
    if (cachedData) {
      return { data: { session: cachedData }, error: null };
    }
    
    // If no cache, wait before proceeding
    await new Promise(resolve => setTimeout(resolve, REQUEST_THROTTLE));
  }
  
  lastAuthRequest = Date.now();
  
  try {
    const { data, error } = await supabase.auth.getSession();
    
    // Cache valid session data
    if (!error && data.session) {
      cacheSession(data.session);
    } else if (error) {
      // Clear invalid cache
      clearCachedSession();
    }
    
    return { data, error };
  } catch (err) {
    console.error("Error fetching session:", err);
    return { data: { session: null }, error: err };
  }
}

// Cache the session data
function cacheSession(session: any) {
  try {
    const cacheData = {
      session,
      expires: Date.now() + CACHE_EXPIRY
    };
    localStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(cacheData));
  } catch (e) {
    console.error("Failed to cache session:", e);
  }
}

// Get cached session if valid
function getCachedSession(): any | null {
  try {
    const cached = localStorage.getItem(SESSION_CACHE_KEY);
    if (!cached) return null;
    
    const { session, expires } = JSON.parse(cached);
    if (Date.now() > expires) {
      clearCachedSession();
      return null;
    }
    
    return session;
  } catch (e) {
    clearCachedSession();
    return null;
  }
}

// Clear cached session
function clearCachedSession() {
  try {
    localStorage.removeItem(SESSION_CACHE_KEY);
  } catch (e) {
    console.error("Failed to clear session cache:", e);
  }
}

// Sign in with throttling to prevent rate limits
export async function signIn(email: string, password: string) {
  const supabase = createClientSupabaseClient();
  const now = Date.now();
  
  // Throttle requests
  if (now - lastAuthRequest < REQUEST_THROTTLE) {
    await new Promise(resolve => setTimeout(resolve, REQUEST_THROTTLE));
  }
  
  lastAuthRequest = Date.now();
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (!error && data.session) {
      cacheSession(data.session);
    }
    
    return { data, error };
  } catch (err) {
    console.error("Sign in error:", err);
    return { data: { session: null, user: null }, error: err };
  }
}

// Sign out with proper cache clearing
export async function signOut() {
  const supabase = createClientSupabaseClient();
  clearCachedSession();
  
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (err) {
    console.error("Sign out error:", err);
    return { error: err };
  }
}