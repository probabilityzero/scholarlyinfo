import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Download Scholarly Apps",
  description: "Download Scholarly for desktop and mobile devices to enhance your research experience with advanced features and offline access.",
  openGraph: {
    title: "Download Scholarly Apps",
    description: "Download Scholarly for desktop and mobile devices to enhance your research experience with advanced features and offline access.",
    url: `${siteConfig.url}/info/download`,
    type: "website",
    images: [siteConfig.images.defaultOG],
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Scholarly Apps",
    description: "Download Scholarly for desktop and mobile devices to enhance your research experience with advanced features and offline access.",
    images: [siteConfig.images.defaultOG],
  },
  alternates: {
    canonical: `${siteConfig.url}/info/download`,
  }
};

export default function DownloadLayout({ children }: { children: React.ReactNode }) {
  return children;
}