"use client";

import { useState, useEffect } from "react";

export function useSimpleAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check for Supabase auth cookies - only runs client-side
    const checkAuthCookies = () => {
      const cookies = document.cookie.split(';');
      const hasAuthCookie = cookies.some(cookie => 
        cookie.trim().startsWith('sb-access-token=') || 
        cookie.trim().startsWith('sb-refresh-token=')
      );
      
      setIsAuthenticated(hasAuthCookie);
    };
    
    checkAuthCookies();
    
    // Listen for storage events (logout events from other tabs)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key?.includes('supabase') || event.key?.includes('sb-')) {
        checkAuthCookies();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    isAuthenticated,
    isLoading: isAuthenticated === null
  };
}