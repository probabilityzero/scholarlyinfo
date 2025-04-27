"use client"

import React from 'react';
import Link from 'next/link';
import { 
  Info, Users, PhoneCall, Download, HeartHandshake, 
  FileText, BadgeHelp, Building, ChevronRight, ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MdContactPage, MdVolunteerActivism, MdBusinessCenter } from 'react-icons/md';

export default function InfoHubPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Scholarly Information</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Learn more about our platform, mission, and how to get involved
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {/* About Card */}
        <Card className="bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Info className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-2">About Us</h2>
            <p className="text-muted-foreground mb-6">
              Learn about our mission to transform academic research access and discovery
            </p>
            <Link href="/info/about" passHref>
              <Button variant="outline" className="w-full justify-between">
                Read About Scholarly
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        {/* Contact Card */}
        <Card className="bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <PhoneCall className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-2">Contact Us</h2>
            <p className="text-muted-foreground mb-6">
              Get in touch with our team for support, feedback, or partnership inquiries
            </p>
            <Link href="/info/contact" passHref>
              <Button variant="outline" className="w-full justify-between">
                Contact Scholarly
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        {/* Apps & Downloads Card */}
        <Card className="bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Download className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-2">Apps & Downloads</h2>
            <p className="text-muted-foreground mb-6">
              Get our mobile and desktop apps for enhanced research experience
            </p>
            <Link href="/info/download" passHref>
              <Button variant="outline" className="w-full justify-between">
                Download Apps
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        {/* Support Us Card */}
        <Card className="bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <HeartHandshake className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-2">Support Us</h2>
            <p className="text-muted-foreground mb-6">
              Help us democratize access to research through donations and contributions
            </p>
            <Link href="/info/contribute" passHref>
              <Button variant="outline" className="w-full justify-between">
                Support Scholarly
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        {/* Careers Card */}
        <Card className="bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Building className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-2">Careers</h2>
            <p className="text-muted-foreground mb-6">
              Join our team and help shape the future of research discovery
            </p>
            <Link href="/info/careers" passHref>
              <Button variant="outline" className="w-full justify-between">
                View Openings
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        {/* Legal Card */}
        <Card className="bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-2">Legal</h2>
            <p className="text-muted-foreground mb-6">
              View our terms of service, privacy policy, and legal information
            </p>
            <div className="flex flex-col gap-2">
              <Link href="/info/legal/terms" passHref>
                <Button variant="outline" size="sm" className="w-full justify-between">
                  Terms of Service
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link href="/info/legal/privacy" passHref>
                <Button variant="outline" size="sm" className="w-full justify-between">
                  Privacy Policy
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Links Section */}
      <div className="bg-card rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <BadgeHelp className="h-5 w-5 text-primary flex-shrink-0" />
            <Link href="/info/faq" className="text-muted-foreground hover:text-primary transition-colors">
              Frequently Asked Questions
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-primary flex-shrink-0" />
            <Link href="/info/academic-partners" className="text-muted-foreground hover:text-primary transition-colors">
              Academic Partners
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <ExternalLink className="h-5 w-5 text-primary flex-shrink-0" />
            <a href="https://blog.scholarly.world" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              Scholarly Blog
            </a>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-primary/5 rounded-3xl p-10 md:p-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Explore Research?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Start discovering millions of academic papers from leading repositories
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/search" passHref>
            <Button className="min-w-[180px]">
              Start Searching
            </Button>
          </Link>
          <Link href="/library" passHref>
            <Button variant="outline" className="min-w-[180px]">
              My Library
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}