import { Paper } from "./providers/types";

// Cache settings
const CACHE_PREFIX = "scholarly-paper-";
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds

interface CacheEntry {
  timestamp: number;
  data: Paper;
}

/**
 * Get all possible ID formats for a paper
 * This helps improve cache hit rates by checking multiple formats
 */
export function getPaperIdVariants(paper: Paper): string[] {
  const variants = [paper.id];
  
  // Add raw ID without provider prefix
  if (paper.rawId && !variants.includes(paper.rawId)) {
    variants.push(paper.rawId);
  }
  
  // Add with explicit provider prefix
  if (paper.providerId && paper.rawId) {
    const prefixedId = `${paper.providerId}:${paper.rawId}`;
    if (!variants.includes(prefixedId)) {
      variants.push(prefixedId);
    }
  }
  
  return variants;
}

/**
 * Cache a paper in local storage
 */
export function cachePaper(paper: Paper, expiryHours: number = 24): void {
  if (!paper || !paper.id) return;
  
  try {
    // Get all existing cached papers
    const cachedPapers = localStorage.getItem('scholarly-papers-cache');
    const cache = cachedPapers ? JSON.parse(cachedPapers) : {};
    
    // Calculate expiry time
    const expiryTime = Date.now() + expiryHours * 60 * 60 * 1000;
    
    // Get all ID variants for better cache hits
    const idVariants = getPaperIdVariants(paper);
    
    // Cache the paper with all its ID variants
    idVariants.forEach(id => {
      cache[id] = {
        paper,
        expires: expiryTime
      };
    });
    
    // Save updated cache
    localStorage.setItem('scholarly-papers-cache', JSON.stringify(cache));
  } catch (error) {
    console.error('Error caching paper:', error);
  }
}

/**
 * Get a paper from cache by ID
 */
export function getCachedPaper(id: string): Paper | null {
  if (!id) return null;
  
  try {
    // Try to get from cache
    const cachedPapers = localStorage.getItem('scholarly-papers-cache');
    if (!cachedPapers) return null;
    
    const cache = JSON.parse(cachedPapers);
    
    // Check if this ID is in cache and not expired
    if (cache[id] && cache[id].expires > Date.now()) {
      return cache[id].paper;
    }
    
    // If not found directly, try with variants
    // For example, if id is "1234.5678", try "arxiv:1234.5678"
    const possibleVariants = [
      id,
      id.startsWith('arxiv:') ? id.replace('arxiv:', '') : `arxiv:${id}`
    ];
    
    for (const variant of possibleVariants) {
      if (cache[variant] && cache[variant].expires > Date.now()) {
        return cache[variant].paper;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error getting paper from cache:', error);
    return null;
  }
}

/**
 * Batch caches multiple papers
 */
export function cachePapers(papers: Paper[]): void {
  papers.forEach(cachePaper);
}

/**
 * Cleans expired or corrupted entries from the cache
 */
export function cleanCache(): void {
  try {
    const now = Date.now();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(CACHE_PREFIX)) {
        try {
          const cached: CacheEntry = JSON.parse(localStorage.getItem(key) || "{}");
          if (now - cached.timestamp > CACHE_EXPIRY) {
            localStorage.removeItem(key);
          }
        } catch (e) {
          // Remove corrupted entries
          localStorage.removeItem(key);
        }
      }
    }
  } catch (error) {
    console.warn("Error cleaning paper cache:", error);
  }
}