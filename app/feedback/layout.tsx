import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Feedback | Scholarly",
  description: "Share your thoughts and suggestions to help us improve Scholarly.",
  openGraph: {
    title: "Feedback | Scholarly",
    description: "Share your thoughts and suggestions to help us improve Scholarly.",
    url: `${siteConfig.url}/info/feedback`,
    type: "website",
    images: [siteConfig.images.defaultOG],
  },
  twitter: {
    card: "summary_large_image",
    title: "Feedback | Scholarly",
    description: "Share your thoughts and suggestions to help us improve Scholarly.",
    images: [siteConfig.images.defaultOG],
  },
  alternates: {
    canonical: `${siteConfig.url}/info/feedback`,
  }
};

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  return children;
}