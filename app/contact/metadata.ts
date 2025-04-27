import { Metadata } from "next"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Have questions about our platform? Contact the Scholarly team for support, feedback, or partnership opportunities.",
  openGraph: {
    title: "Contact Us",
    description: "Have questions about our platform? Contact the Scholarly team for support, feedback, or partnership opportunities.",
    url: `${siteConfig.url}/info/contact`,
    type: "website",
    images: [siteConfig.images.defaultOG],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us",
    description: "Have questions about our platform? Contact the Scholarly team for support, feedback, or partnership opportunities.",
    images: [siteConfig.images.defaultOG],
  },
  alternates: {
    canonical: `${siteConfig.url}/info/contact`,
  }
}