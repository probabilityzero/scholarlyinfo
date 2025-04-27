"use client";

import { useEffect, useRef, memo } from "react";

interface MathJaxProps {
  content: string;
  className?: string;
  delay?: number;
}

declare global {
  interface Window {
    MathJax?: any; // Use a more flexible type since MathJax's API structure varies
  }
}

// Using memo to prevent unnecessary re-renders
function MathJaxComponent({ content, className = "", delay = 0 }: MathJaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<string>(content);

  useEffect(() => {
    // Update the ref when content changes
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Set initial content
    container.innerHTML = contentRef.current;

    // Function to render MathJax
    const renderMathJax = async () => {
      if (!window.MathJax) {
        console.warn("MathJax not available yet");
        return;
      }
      
      try {
        // Wait for MathJax to be fully initialized if needed
        if (window.MathJax.startup && window.MathJax.startup.promise) {
          await window.MathJax.startup.promise;
        }
        
        // Different versions of MathJax have different APIs
        if (typeof window.MathJax.typesetPromise === 'function') {
          // MathJax v3
          await window.MathJax.typesetPromise([container]);
        } else if (typeof window.MathJax.Hub?.Queue === 'function') {
          // MathJax v2
          window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, container]);
        } else if (typeof window.MathJax.typeset === 'function') {
          // Alternative MathJax v3 API
          window.MathJax.typeset([container]);
        } else {
          console.warn("MathJax API not found. Please ensure MathJax is properly loaded.");
        }
      } catch (err) {
        console.error("MathJax processing error:", err);
      }
    };

    // Add a small delay if specified - helps with sequential processing
    const timeoutId = setTimeout(() => {
      renderMathJax();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return <div ref={containerRef} className={className} />;
}

// Export memoized version to prevent unnecessary re-renders
export default memo(MathJaxComponent);