// lib/supabase/config.ts
export function getSupabaseCookieOptions() {
  const primaryDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'scholarly.world';
  
  if (process.env.NODE_ENV === 'development') {
    return {
      sameSite: 'lax' as const,
      secure: false,
      path: '/',
    };
  }
  
  return {
    sameSite: 'lax' as const,
    secure: true,
    path: '/',
    domain: `.${primaryDomain}`, 
  };
}