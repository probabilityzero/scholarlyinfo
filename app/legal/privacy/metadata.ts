import { Metadata } from "next"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Scholarly's privacy policy outlines how we collect, use, and protect your data while using our academic research platform.",
  openGraph: {
    title: "Privacy Policy",
    description: "Scholarly's privacy policy outlines how we collect, use, and protect your data while using our academic research platform.",
    url: `${siteConfig.url}/info/privacy`,
    type: "website",
    images: [siteConfig.images.defaultOG],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy",
    description: "Scholarly's privacy policy outlines how we collect, use, and protect your data while using our academic research platform.",
    images: [siteConfig.images.defaultOG],
  },
  alternates: {
    canonical: `${siteConfig.url}/info/privacy`,
  }
}