"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  Twitter, 
  Github, 
  Linkedin,
  MessageSquare,
  Loader2,
  Check,
  Youtube,
  FileText,
  Users,
  Headphones
} from "lucide-react"
import Breadcrumb from "@/components/ui/breadcrumb"
import { siteConfig } from "@/config/site"
import { FAQSection, FAQItem } from "@/components/ui/faq-section"

// Define FAQ items
const faqItems: FAQItem[] = [
  {
    question: "How can I report a paper with incorrect metadata?",
    answer: "You can report papers with incorrect metadata by using our inquiry form. Please include the paper ID and describe the issue in detail so our team can address it promptly."
  },
  {
    question: "Do you offer API access to Scholarly?",
    answer: "Yes, we provide API access for developers and researchers. Please submit an inquiry with details about your use case, and our team will get back to you with information about our API services."
  },
  {
    question: "How can I suggest a new feature?",
    answer: "We welcome feature suggestions! Please use the inquiry form and select 'Feature Suggestion' from the dropdown menu. Describe your idea in detail, including how it would improve your research experience."
  },
  {
    question: "Can I contribute to the development of Scholarly?",
    answer: "Absolutely! Scholarly is a collaborative project. Visit our GitHub repository to see current issues, submit pull requests, or join discussions about the platform's development."
  }
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: "", email: "", subject: "General Inquiry", message: "" })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Wave Pattern */}
      <div className="relative bg-gradient-to-b from-primary/5 to-background overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path 
              d="M0,800 C200,1000 800,600 1000,800 L1000,0 L0,0 Z" 
              fill="url(#paint0_linear)" 
              className="animate-wave"
            />
            <defs>
              <linearGradient id="paint0_linear" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.05" />
                <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.1" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.05" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumb 
            items={[
              { label: "Info", href: "/info" },
              { label: "Contact", current: true }
            ]} 
            className="mb-12"
          />
          
          <div className="text-center max-w-3xl mx-auto py-6">
            <h1 className="text-4xl md:text-5xl font-bold my-6">Contact Information</h1>
            <p className="text-xl text-muted-foreground">
              For inquiries, support requests, and academic collaborations
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <h2 className="text-2xl font-semibold mb-6">Correspondence Details</h2>
              
              
              <div className="relative h-[200px] w-full rounded-lg overflow-hidden border shadow-sm">
                <Image 
                  src="https://images.unsplash.com/photo-1736117703416-f260ee174bac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Academic building" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="space-y-6 my-10">
                
              <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Mailing Address</h3>
                    <p className="text-muted-foreground">
                      Scholarly Foundation<br />
                      123 Academic Way<br />
                      Cambridge, MA 02142
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Academic Inquiries</h3>
                    <a 
                      href="mailto:inquiries@scholarly.world" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      inquiries@scholarly.world
                    </a>
                  </div>
                </div>
                
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Institutional Relations</h3>
                    <a 
                      href="mailto:partnerships@scholarly.world" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      partnerships@scholarly.world
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Inquiry Form */}
          <div className="lg:col-span-3">
            <div className="px-8 ">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <MessageSquare className="mr-2 h-6 w-6 text-primary" />
                Submit an Inquiry
              </h2>
              
              {isSubmitted ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mr-4">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-800 dark:text-green-300">
                      Inquiry Received
                    </h3>
                  </div>
                  <p className="text-green-700 dark:text-green-400 mb-6">
                    Thank you for contacting Scholarly. Your inquiry has been submitted to our team, and we will respond within 2-3 business days.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-md bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium">
                        Institutional Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-md bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="name@institution.edu"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                      Inquiry Category
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-md bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="API Access Request">API Access Request</option>
                      <option value="Feature Suggestion">Feature Suggestion</option>
                      <option value="Metadata Correction">Metadata Correction</option>
                      <option value="Institutional Partnership">Institutional Partnership</option>
                      <option value="Research Collaboration">Research Collaboration</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium">
                      Inquiry Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Please provide specific details about your inquiry. For technical issues or metadata corrections, include relevant IDs or URLs."
                      className="w-full p-3 border rounded-md bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  
                  <div className="pt-2 justify-self-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 inline-flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Inquiry
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
        
      {/* FAQ Section - now using the reusable component */}
      <FAQSection items={faqItems} />

      {/* Add CSS for the wave animation */}
      <style jsx global>{`
        @keyframes wave {
          0% { transform: translateX(0) translateY(0) scaleY(1); }
          50% { transform: translateX(-25px) translateY(10px) scaleY(0.9); }
          100% { transform: translateX(0) translateY(0) scaleY(1); }
        }
        .animate-wave {
          animation: wave 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

