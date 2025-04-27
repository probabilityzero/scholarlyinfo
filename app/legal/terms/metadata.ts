import { Metadata } from "next"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Learn about Scholarly's terms of service, user agreements, and policies for using our academic research platform.",
  openGraph: {
    title: "Terms of Service",
    description: "Learn about Scholarly's terms of service, user agreements, and policies for using our academic research platform.",
    url: `${siteConfig.url}/info/terms`,
    type: "website",
    images: [siteConfig.images.defaultOG],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service",
    description: "Learn about Scholarly's terms of service, user agreements, and policies for using our academic research platform.",
    images: [siteConfig.images.defaultOG],
  },
  alternates: {
    canonical: `${siteConfig.url}/info/terms`,
  }
}