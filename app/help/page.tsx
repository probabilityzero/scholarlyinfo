import Image from "next/image"
import Link from "next/link"
import Breadcrumb from "@/components/ui/breadcrumb"
import { FAQSection, FAQItem } from "@/components/ui/faq-section"
import { 
  Search, 
  Book, 
  FileText, 
  Users, 
  Settings, 
  ArrowRight, 
  MessageCircle, 
  Mail, 
  Video, 
  BookOpen, 
  HelpCircle,
  CheckCircle
} from "lucide-react"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import "@/styles/support-page.css" // Import the CSS file we created

export const metadata: Metadata = {
  title: "Support Center",
  description: "Get help with Scholarly's research platform. Find answers to common questions, learn how to use advanced features, and get personalized assistance when you need it.",
  openGraph: {
    title: "Support Center",
    description: "Get help with Scholarly's research platform. Find answers to common questions, learn how to use advanced features, and get personalized assistance when you need it.",
    url: `${siteConfig.url}/help`,
    type: "website",
    images: [siteConfig.images.supportOG || siteConfig.images.defaultOG],
  },
  twitter: {
    card: "summary_large_image",
    title: "Support Center",
    description: "Get help with Scholarly's research platform. Find answers to common questions, learn how to use advanced features, and get personalized assistance when you need it.",
    images: [siteConfig.images.supportOG || siteConfig.images.defaultOG],
  },
  alternates: {
    canonical: `${siteConfig.url}/help`,
  }
}

// Support categories with their respective icons and descriptions
const supportCategories = [
  {
    title: "Getting Started",
    description: "New to Scholarly? Learn the basics of searching, saving, and reading papers.",
    icon: <Book className="h-6 w-6" />,
    href: "/support/getting-started",
    featured: true,
  },
  {
    title: "Search & Discovery",
    description: "Master advanced search techniques to find exactly what you're looking for.",
    icon: <Search className="h-6 w-6" />,
    href: "/support/search",
    featured: true,
  },
  {
    title: "Reading Experience",
    description: "Learn about our reader features, annotations, and accessibility options.",
    icon: <BookOpen className="h-6 w-6" />,
    href: "/support/reading",
    featured: false,
  },
  {
    title: "Account Management",
    description: "Manage your profile, preferences, and subscription settings.",
    icon: <Users className="h-6 w-6" />,
    href: "/support/account",
    featured: false,
  },
  {
    title: "Technical Issues",
    description: "Troubleshoot common problems and find technical solutions.",
    icon: <Settings className="h-6 w-6" />,
    href: "/support/technical",
    featured: false,
  },
  {
    title: "API Documentation",
    description: "Developer resources for integrating with Scholarly's data.",
    icon: <FileText className="h-6 w-6" />,
    href: "/support/api",
    featured: true,
  },
];

// Frequently asked questions
const popularFAQs: FAQItem[] = [
  {
    question: "How do I cite a paper I found on Scholarly?",
    answer: "Scholarly provides citation formatting in various styles (APA, MLA, Chicago, etc.) for every paper. Look for the 'Cite' button on any paper detail page, which allows you to copy the formatted citation or download it in BibTeX format."
  },
  {
    question: "Can I save papers to read offline?",
    answer: "Yes, Scholarly allows you to download PDF versions of papers for offline reading. Additionally, premium users can sync papers for offline access in our mobile app."
  },
  {
    question: "How can I follow specific research topics?",
    answer: "You can create custom alerts by saving searches or following specific categories. Scholarly will notify you when new papers matching your interests are published."
  },
  {
    question: "Is Scholarly accessible for users with disabilities?",
    answer: "Yes, we've designed Scholarly to be fully compliant with WCAG 2.1 AA standards. Our reader includes features like high-contrast mode, keyboard navigation, and screen reader support."
  }
];

// Support channels
const supportChannels = [
  {
    title: "Help Documentation",
    description: "Browse our comprehensive knowledge base with step-by-step guides.",
    icon: <HelpCircle className="h-10 w-10 text-indigo-600" />,
    buttonText: "View Documentation",
    href: "/docs",
  },
  {
    title: "Email Support",
    description: "Contact our support team directly for personalized assistance.",
    icon: <Mail className="h-10 w-10 text-emerald-600" />,
    buttonText: "Contact Support",
    href: "/info/contact",
  },
  {
    title: "Video Tutorials",
    description: "Watch quick tutorials to learn Scholarly's features visually.",
    icon: <Video className="h-10 w-10 text-rose-600" />,
    buttonText: "Watch Tutorials",
    href: "/tutorials",
  },
  {
    title: "Community Forum",
    description: "Connect with other users to share tips and get help.",
    icon: <MessageCircle className="h-10 w-10 text-amber-600" />,
    buttonText: "Join Discussion",
    href: "/network",
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background Pattern */}
      <div className="relative bg-gradient-to-b from-primary/5 via-primary/3 to-background overflow-hidden">
        <div className="absolute inset-0 pattern-dots-lg text-primary/5 opacity-30"></div>
        <div className="container px-4 mx-auto relative z-10">
          <Breadcrumb 
            items={[{ label: "Support", current: true }]} 
            className="mb-12"
          />
          
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              How can we help you?
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Find answers, explore tutorials, and get the support you need
            </p>
            
            {/* Large Search Box */}
            <div className="relative max-w-2xl mx-auto">
              <div className="flex items-center border-2 border-primary/30 focus-within:border-primary/60 rounded-full bg-background transition-colors overflow-hidden shadow-sm">
                <div className="pl-6">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search for help with..." 
                  className="w-full py-4 px-4 bg-transparent border-0 focus:outline-none focus:ring-0 text-lg"
                />
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-4 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container px-4 mx-auto py-16">
        {/* Featured Support Categories */}
        <section className="mb-24">
          <h2 className="text-3xl font-semibold mb-8 text-center">Support Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportCategories.map((category, index) => (
              <Link 
                key={index} 
                href={category.href}
                className={`relative group overflow-hidden rounded-xl bg-card border transition-all duration-300 hover:shadow-md ${
                  category.featured ? 'border-primary/20 shadow' : 'border-muted/70'
                }`}
              >
                <div className="p-8">
                  <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl mb-4 ${
                    category.featured ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <div className="flex items-center text-sm font-medium text-primary">
                    Learn more
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
                {category.featured && (
                  <div className="absolute top-3 right-3 bg-primary/10 text-primary text-xs font-semibold py-1 px-2 rounded-full">
                    Popular
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>
        
        {/* Quick Help Channels */}
        <section className="mb-24 bg-muted/30 rounded-3xl p-12">
          <h2 className="text-3xl font-semibold mb-12 text-center">Get Support Your Way</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportChannels.map((channel, index) => (
              <div key={index} className="bg-card rounded-xl p-8 border text-center hover:shadow-md transition-shadow">
                <div className="mx-auto mb-6">
                  {channel.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{channel.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{channel.description}</p>
                <Link 
                  href={channel.href}
                  className="inline-flex items-center justify-center w-full rounded-md bg-muted hover:bg-muted/80 py-2 text-sm font-medium transition-colors"
                >
                  {channel.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </section>
        
        {/* Popular FAQs - Using the reusable component */}
        <FAQSection 
          title="Frequently Asked Questions"
          subtitle="Find quick answers to common questions about Scholarly"
          items={popularFAQs}
          className="mb-24"
        />
        
        {/* Support Quality Promise */}
        <section className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Our Support Promise</h2>
            <p className="text-lg text-muted-foreground mb-6">
              We believe great research deserves great support. Our team is dedicated to making your experience with Scholarly seamless and productive.
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">Expert assistance from research specialists</p>
                  <p className="text-sm text-muted-foreground">Our support team combines technical expertise with academic research experience</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">Fast response times</p>
                  <p className="text-sm text-muted-foreground">We respond to all inquiries within 24 hours, with most receiving same-day assistance</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">Ongoing improvement</p>
                  <p className="text-sm text-muted-foreground">Your feedback directly shapes our product development and support resources</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image 
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Scholarly support team collaboration" 
              fill 
              className="object-cover object-center" 
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-8">
                <p className="text-white font-medium text-lg">
                  "Our mission is to make research accessible, and that includes making support accessible too."
                </p>
                <p className="text-white/80 mt-2">— Dr. Sarah Chen, Founder</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact CTA */}
        <section className="bg-primary/5 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-semibold mb-4">Still need help?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Our support team is ready to provide personalized assistance for any questions or challenges you're facing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/info/contact" 
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Contact Support
            </Link>
            <Link 
              href="/network" 
              className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Join the Discussion
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}