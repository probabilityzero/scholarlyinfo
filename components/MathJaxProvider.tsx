"use client";

import { useEffect, ReactNode } from "react";
import Script from "next/script";

export default function MathJaxProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <Script
        id="mathjax-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.MathJax = {
              tex: {
                inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
                processEscapes: true,
                processEnvironments: true
              },
              options: {
                enableMenu: false,
                skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
                ignoreHtmlClass: 'tex2jax_ignore',
                processHtmlClass: 'tex2jax_process'
              }
            };
          `,
        }}
      />
      
      <Script
        id="mathjax-script"
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"
        strategy="lazyOnload"
        onLoad={() => {
          console.log("MathJax loaded successfully");
        }}
        onError={(e) => {
          console.error("MathJax failed to load", e);
        }}
      />

      {children}
    </>
  );
}