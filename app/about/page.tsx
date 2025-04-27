import Image from "next/image"
import Link from "next/link"
import Breadcrumb from "@/components/ui/breadcrumb"
import { CheckCircle, Globe, Users, BookOpen, Sparkles, GitMerge } from "lucide-react"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "About Scholarly | Our Mission and Story",
  description: "Scholarly is revolutionizing access to academic research with an intuitive platform for discovering, reading, and staying updated with scientific publications from arXiv and beyond.",
  openGraph: {
    title: "About Scholarly | Our Mission and Story",
    description: "Scholarly is revolutionizing access to academic research with an intuitive platform for discovering, reading, and staying updated with scientific publications from arXiv and beyond.",
    url: `${siteConfig.url}/info/about`,
    type: "website",
    images: [siteConfig.images.aboutOG || siteConfig.images.defaultOG],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Scholarly | Our Mission and Story",
    description: "Scholarly is revolutionizing access to academic research with an intuitive platform for discovering, reading, and staying updated with scientific publications from arXiv and beyond.",
    images: [siteConfig.images.aboutOG || siteConfig.images.defaultOG],
  },
  alternates: {
    canonical: `${siteConfig.url}/info/about`,
  }
}

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Founder & CEO",
    bio: "Former quantum physics researcher with a passion for democratizing scientific knowledge.",
    image: "/images/team/sarah-chen.jpg",
  },
  {
    name: "Marcus Williams",
    role: "Lead Developer",
    bio: "Full-stack engineer focused on building accessible and performant research platforms.",
    image: "/images/team/marcus-williams.jpg",
  },
  {
    name: "Dr. Aisha Patel",
    role: "Research Director",
    bio: "Computational biologist with expertise in AI-powered research discovery.",
    image: "/images/team/aisha-patel.jpg",
  },
];

const milestones = [
  {
    year: "2021",
    event: "Project inception as a personal tool for browsing arXiv papers",
  },
  {
    year: "2022",
    event: "Beta release with basic search functionality and mobile support",
  },
  {
    year: "2023",
    event: "Full platform launch with advanced search, categorization, and personalization",
  },
  {
    year: "2024",
    event: "Expanded to include multiple repositories and enhanced discovery algorithms",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <Breadcrumb 
          items={[
            { label: "Info", href: "/info" },
            { label: "About", current: true }
          ]} 
        />
        
        {/* Hero Section */}
        <section className="relative py-20 rounded-3xl mb-10 mt-14 overflow-hidden bg-gradient-to-r from-primary/10 to-/10">
          <div className="absolute inset-0 opacity-50">
            <Image 
              src="https://images.unsplash.com/photo-1622798023168-76a8f3b1f24e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="" 
              fill 
              quality={100}
              className="object-cover"
              style={{ objectPosition: "buttom" }}
              sizes="100vw"
              priority
            />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Transforming Access to <span className="text-primary">Academic Knowledge</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to make the world's scientific research accessible, discoverable, and understandable for everyone.
            </p>
          </div>
        </section>
        
        {/* Mission Statement */}
        <section className="my-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1742403949587-42a767b9ea5b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Our mission to democratize academic research"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We believe that scientific knowledge should be accessible to everyone, regardless of their institutional affiliation or technical background.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                We're building a platform that transforms how people discover and engage with academic research, making the complex world of scientific publications more navigable and approachable.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <p>Making research accessible to everyone, everywhere</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <p>Building tools that enhance discovery and understanding</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <p>Fostering connections between researchers and ideas</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features/What We Do */}
        <section className="my-20">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <Globe className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Global Access</h3>
              <p className="text-muted-foreground">
                Connect with millions of research papers from arXiv, bioRxiv, and other leading repositories all in one place.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <Sparkles className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Intelligent Search</h3>
              <p className="text-muted-foreground">
                Our advanced search algorithms understand the nuances of academic content to deliver the most relevant results.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <BookOpen className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Enhanced Reading</h3>
              <p className="text-muted-foreground">
                A clean, distraction-free reading experience optimized for both technical papers and casual browsing.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <GitMerge className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Citation Graphs</h3>
              <p className="text-muted-foreground">
                Visualize the connections between papers to trace the evolution of ideas and discover related research.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <Users className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Community Features</h3>
              <p className="text-muted-foreground">
                Follow researchers, share interesting papers, and join discussions about cutting-edge research.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <BookOpen className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Personalization</h3>
              <p className="text-muted-foreground">
                Receive recommendations tailored to your interests and research needs.
              </p>
            </div>
          </div>
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold">Scholarly combines powerful technology with thoughtful design to create the best possible research discovery experience.
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            </p>
          </div>
        </section>
        
        {/* Timeline/History */}
        <section className="my-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Our Journey</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              From a simple idea to a comprehensive research platform
            </p>
          </div>
          
          <div className="relative border-l border-primary/20 pl-10 ml-4 md:ml-10 space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-14 bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center">
                  <span className="text-xs font-bold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{milestone.year}</h3>
                  <p className="mt-2 text-muted-foreground">{milestone.event}</p>
                </div>
              </div>
            ))}
            
            <div className="relative">
              <div className="absolute -left-14 bg-primary/20 text-primary rounded-full h-8 w-8 flex items-center justify-center">
                <span className="text-xs font-bold">→</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">The Future</h3>
                <p className="mt-2 text-muted-foreground">
                  Continuing to innovate at the intersection of research discovery and knowledge sharing
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        {/* <section className="my-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Dedicated researchers, engineers, and designers working to transform academic research discovery
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border">
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <p className="mt-2 text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section> */}
        
        {/* Data Sources Section */}
        <section className="my-20">
          <div className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-bold mb-4">Our Data Sources</h2>
            <p className="text-muted-foreground mb-6">
              Scholarly aggregates research papers from multiple trusted academic sources:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">arXiv</p>
                  <p className="text-sm text-muted-foreground">
                    An open-access repository of electronic preprints and postprints approved for posting after moderation
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">bioRxiv</p>
                  <p className="text-sm text-muted-foreground">
                    A preprint server for biology operated by Cold Spring Harbor Laboratory
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Other repositories</p>
                  <p className="text-sm text-muted-foreground">
                    We're continuously adding more sources to provide the most comprehensive collection of research papers
                  </p>
                </div>
              </li>
            </ul>
            <p className="mt-6 text-sm">
              All content remains the property of the original authors and repositories. Scholarly simply provides an enhanced interface for discovery and reading.
            </p>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="my-20 bg-primary/5 rounded-3xl p-10 md:p-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Whether you're a researcher, student, or simply curious about science, Scholarly is for you. Start exploring the world of academic knowledge today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/search" 
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Start Searching
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

