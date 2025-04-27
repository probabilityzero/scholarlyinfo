import type React from "react"
import type { Metadata } from "next"
import { Inter, EB_Garamond, Crimson_Text } from "next/font/google"
import "../styles/globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import MobileNavBar from "@/components/layout/MobileNavBar" 
import { ThemeProvider } from "@/store/theme-provider"
import Providers from "./providers"
import Script from "next/script"
import { UserProvider } from "@/context/user-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
})

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-abstract",
})

export const metadata: Metadata = {
  title: {
    default: "Scholarly",
    template: "%s | Scholarly"
  },
  description: "Explore millions of academic articles and papers.",
  generator: 'Scholarly',
  applicationName: 'Scholarly',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://raw.githubusercontent.com/probabilityzero/cloudstorage/main/S-rounded-vintage-100.png" />
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
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.variable} ${garamond.variable} ${crimsonText.variable} font-sans`}>
        <Providers>
          <ThemeProvider defaultTheme="system" storageKey="scholarly-theme">
            <UserProvider>
              <div className="flex min-h-dvh flex-col pb-14 md:pb-0">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <MobileNavBar />
              </div>
            </UserProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}