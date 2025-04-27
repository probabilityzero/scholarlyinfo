import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Update this utility function to correctly handle the "arxiv:" prefix
export function extractArxivId(id: string): string {
  // Check if the ID has the "arxiv:" prefix and remove it
  if (id.startsWith('arxiv:')) {
    return id.substring(6); // Remove "arxiv:" prefix
  }
  
  // Return the original ID if it doesn't have the prefix
  return id;
}
