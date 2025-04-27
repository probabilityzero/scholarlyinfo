import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: "Info | Scholarly",
    template: "%s | Scholarly"
  },
  description: "Learn about Scholarly, our mission, and how we're transforming access to academic knowledge.",
  openGraph: {
    title: "Information | Scholarly",
    description: "Learn about Scholarly, our mission, and how we're transforming access to academic knowledge.",
    url: `${siteConfig.url}/info`,
    type: "website",
    images: [siteConfig.images.defaultOG],
  },
  twitter: {
    card: "summary_large_image",
    title: "Information | Scholarly",
    description: "Learn about Scholarly, our mission, and how we're transforming access to academic knowledge.",
    images: [siteConfig.images.defaultOG],
  },
  alternates: {
    canonical: `${siteConfig.url}/info`,
  }
};

export default function InfoLayout({ children }: { children: React.ReactNode }) {
  return children;
}