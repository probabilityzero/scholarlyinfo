"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronRight, 
  GraduationCap, 
  Code, 
  LineChart, 
  Lightbulb, 
  Globe, 
  Users 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Breadcrumb from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <Breadcrumb 
          items={[
            { label: "Info", href: "/info" },
            { label: "Careers", current: true }
          ]} 
        />
        
        {/* Hero Section */}
        <section className="relative py-20 rounded-3xl mb-10 mt-14 overflow-hidden bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="absolute inset-0 opacity-40">
            <Image 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Team collaborating" 
              fill 
              quality={90}
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Join Our <span className="text-primary">Mission</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Help us build the future of academic knowledge discovery and democratize access to research
            </p>
            <Button size="lg" asChild>
              <a href="#openings">View Open Positions</a>
            </Button>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="my-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              At Scholarly, we're guided by core principles that drive everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Open Access</h3>
                <p className="text-muted-foreground">
                  We believe knowledge should be freely accessible to everyone, regardless of institutional affiliation or financial resources.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We embrace new technologies and ideas to transform how researchers discover, access, and understand academic content.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We foster an inclusive environment where diverse perspectives are valued and collaboration drives progress.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="my-20 bg-card rounded-3xl p-10 md:p-16 border">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Why Join Scholarly</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer competitive benefits and a supportive environment to help you thrive
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Remote-First Culture</h3>
              <p className="text-muted-foreground">Work from anywhere in the world with flexible hours</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Competitive Compensation</h3>
              <p className="text-muted-foreground">Salary, equity, and comprehensive benefits package</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Learning Budget</h3>
              <p className="text-muted-foreground">Annual stipend for books, courses, and conferences</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Health & Wellness</h3>
              <p className="text-muted-foreground">Medical, dental, and mental health benefits</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Work-Life Balance</h3>
              <p className="text-muted-foreground">Generous PTO, parental leave, and no-meeting days</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Team Retreats</h3>
              <p className="text-muted-foreground">Annual global gatherings to connect and collaborate</p>
            </div>
          </div>
        </section>
        
        {/* Open Positions Section */}
        <section id="openings" className="my-20 scroll-mt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our team and help shape the future of academic research
            </p>
          </div>
          
          <div className="space-y-4">
            <JobCard 
              title="Full Stack Engineer" 
              department="Engineering"
              location="Remote (Global)"
              badges={["Full-time", "Senior"]}
              description="Build and improve our core platform with React, Next.js, and Node.js. Help us scale our search infrastructure and enhance user experience."
            />
            
            <JobCard 
              title="ML Research Engineer" 
              department="AI & ML"
              location="Remote (Europe/US)"
              badges={["Full-time", "Mid-Senior"]}
              description="Apply machine learning techniques to improve academic search, recommendation systems, and natural language processing for research papers."
            />
            
            <JobCard 
              title="UX/UI Designer" 
              department="Product"
              location="Remote (Global)"
              badges={["Full-time", "Mid-level"]}
              description="Create intuitive, accessible interfaces for researchers and students. Collaborate with product and engineering to bring designs to life."
            />
            
            <JobCard 
              title="Content Operations Specialist" 
              department="Content"
              location="Remote (Global)"
              badges={["Full-time", "Junior-Mid"]}
              description="Work with academic publishers and repositories to expand our content library and ensure quality metadata and accessibility."
            />
            
            <JobCard 
              title="Growth Marketing Manager" 
              department="Marketing"
              location="Remote (US/Canada)"
              badges={["Full-time", "Mid-level"]}
              description="Drive user acquisition and engagement strategies through content marketing, SEO, and community-building initiatives."
            />
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-muted-foreground mb-6">Don't see a role that fits your skills?</p>
            <Button variant="outline" asChild>
              <a href="mailto:careers@scholarly.world">Send us your resume</a>
            </Button>
          </div>
        </section>
        
        {/* Team Culture Section */}
        <section className="my-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Scholarly team collaboration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Team Culture</h2>
              <p className="text-lg mb-6 text-muted-foreground">
                We're a passionate group of individuals from diverse backgrounds united by a shared mission to transform academic research.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Collaborative environment where all voices are heard and valued</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Focus on impact and outcomes rather than hours worked</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Continuous learning and professional development opportunities</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Transparent communication and decision-making processes</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Application Process */}
        <section className="my-20 bg-primary/5 rounded-3xl p-10 md:p-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Our Application Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've designed a straightforward process to get to know you better
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border rounded-xl p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Application Review</h3>
              <p className="text-muted-foreground">
                Submit your resume and a brief introduction. We'll review and contact promising candidates within 1-2 weeks.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Interviews</h3>
              <p className="text-muted-foreground">
                Meet with team members for role-specific discussions and a chance to learn more about Scholarly.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Welcome Aboard</h3>
              <p className="text-muted-foreground">
                Receive an offer and join our global team with a comprehensive onboarding experience.
              </p>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="my-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join our mission to democratize access to academic knowledge and transform how research is discovered
          </p>
          <Button size="lg" asChild>
            <a href="#openings">Explore Opportunities</a>
          </Button>
        </section>
      </div>
    </div>
  );
}

// Job Card Component
function JobCard({ 
  title, 
  department, 
  location, 
  badges, 
  description 
}: { 
  title: string; 
  department: string; 
  location: string; 
  badges: string[]; 
  description: string; 
}) {
  return (
    <div className="border rounded-xl p-6 hover:border-primary/50 transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex items-center text-muted-foreground mt-1">
            <span>{department}</span>
            <span className="mx-2">•</span>
            <span>{location}</span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {badges.map((badge, index) => (
            <Badge key={index} variant="outline">{badge}</Badge>
          ))}
        </div>
      </div>
      <p className="mb-4 text-muted-foreground">{description}</p>
      <Button variant="outline" className="w-full sm:w-auto" asChild>
        <Link href={`/info/careers/${title.toLowerCase().replace(/\s+/g, '-')}`}>
          Apply Now <ChevronRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}