"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Apple, Laptop, Smartphone, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MdAndroid } from 'react-icons/md';
import Breadcrumb from '@/components/ui/breadcrumb';
import { useMediaQuery } from '@/hooks/use-media-query';

export default function AppDownloadPage() {
  const [activeTab, setActiveTab] = useState<string>("mobile");
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Set default tab based on device
  useEffect(() => {
    setActiveTab(isMobile ? "mobile" : "desktop");
  }, [isMobile]);

  const breadcrumbItems = [
    { label: 'Info', href: '/info' },
    { label: 'Apps', current: true }
  ];

  return (
    <div className="container max-w-7xl mx-auto p-4 md:py-0">
      <Breadcrumb items={breadcrumbItems} />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
        <TabsList className="grid grid-cols-2 w-full max-w-sm mx-auto mb-8">
          <TabsTrigger value="mobile" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            <span>Mobile</span>
          </TabsTrigger>
          <TabsTrigger value="desktop" className="flex items-center gap-2">
            <Laptop className="h-4 w-4" />
            <span>Desktop</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Mobile App Content */}
        <TabsContent value="mobile" className="mt-0">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold mb-4">Scholarly Mobile</h1>
              <p className="text-lg mb-6">
                Take your research with you anywhere. Access your library, read papers, manage citations, 
                and stay productive on the go.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button className="flex-1 py-6" variant={"outline"}>
                    <Apple className="mr-2 h-5 w-5" />
                    App Store
                  </Button>
                  <Button className="flex-1 py-6" variant={"outline"}>
                    <MdAndroid className="mr-2 h-5 w-5" />
                    Google Play
                  </Button>
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  Available for iOS 14+ and Android 8.0+
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <h2 className="text-xl font-semibold">Key Features</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Full access to your research library</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>PDF reader with annotation tools</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Citation management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Offline access to saved papers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>AI research assistant</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-[500px]">
                <div className="absolute inset-0 rounded-3xl overflow-hidden border-8 border-gray-800 bg-gray-900">
                  <div className="absolute top-0 inset-x-0 h-6 bg-gray-800 flex items-center justify-center">
                    <div className="w-16 h-1.5 rounded-full bg-gray-700"></div>
                  </div>
                  <div className="pt-6 h-full bg-background">
                    {/* Mock app screenshot here */}
                    <div className="p-4 text-center text-sm text-muted-foreground flex items-center justify-center h-full">
                      [Mobile App Preview]
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Desktop App Content */}
        <TabsContent value="desktop" className="mt-0">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold mb-4">Scholarly Desktop</h1>
              <p className="text-lg mb-6">
                Power up your research workflow with our feature-rich desktop application. 
                Enhanced citation management, advanced PDF tools, and deep integration with your favorite tools.
              </p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <Button variant="outline" className="py-6 flex-col h-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-8 w-8 mb-2">
                      <path fill="currentColor" d="M14.25 0h-12.5A1.75 1.75 0 0 0 0 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0 0 16 14.25v-12.5A1.75 1.75 0 0 0 14.25 0ZM1.5 1.75a.25.25 0 0 1 .25-.25h12.5a.25.25 0 0 1 .25.25v12.5a.25.25 0 0 1-.25.25h-12.5a.25.25 0 0 1-.25-.25Z"/>
                      <path fill="currentColor" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-.5 1h1v3h-1Zm0 4h1v1h-1Z"/>
                    </svg>
                    <span>Windows</span>
                  </Button>
                  <Button variant="outline" className="py-6 flex-col h-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-8 w-8 mb-2">
                      <path fill="currentColor" d="M8.44.27a.94.94 0 0 0-.87 0c-.688.32-2.394 1.147-4.768 2.3C1.077 3.183.001 3.64 0 3.64v8.72s1.08.458 2.802 1.07c2.124.9 4.484 2.106 4.64 2.185a.937.937 0 0 0 .209.06c.066.013.43.02.62.02a.94.94 0 0 0 .27-.08c.157-.079 2.516-1.285 4.64-2.185C14.919 12.818 16 12.36 16 12.36V3.64s-1.077-.459-2.802-1.07c-2.374-1.153-4.08-1.98-4.768-2.3a.944.944 0 0 0-.198-.055 1.045 1.045 0 0 0-.082-.006c-.01 0-.021.006-.03.006a.944.944 0 0 0-.181.055ZM8 1.58c.3.004.594.165.832.271.494.22 1.903.87 3.329 1.585 1.209.605 2.232 1.142 2.747 1.421a.949.949 0 0 1 .096.053l-.01.005v5.72c0 .01-.004.018-.006.027v.88a.247.247 0 0 1-.026.045c-.289.16-1.633.879-3.159 1.605-1.436.682-2.813 1.316-3.526 1.634a.831.831 0 0 1-.83.027c-.713-.318-2.09-.952-3.526-1.633-1.526-.726-2.87-1.446-3.16-1.605a.247.247 0 0 1-.025-.045v-.88c-.002-.01-.006-.017-.006-.027v-5.72L1.996 4.91c.515-.279 1.538-.816 2.747-1.421 1.426-.714 2.835-1.364 3.33-1.585.237-.106.531-.267.832-.271.3.004.594.165.831.27.494.222 1.904.872 3.33 1.586 1.209.605 2.232 1.142 2.747 1.421a.949.949 0 0 1 .096.053l-.01.005v5.72c0 .01-.004.018-.006.027v.88a.247.247 0 0 1-.026.045c-.29.16-1.634.879-3.16 1.605-1.435.682-2.812 1.316-3.526 1.634a.831.831 0 0 1-.83.027c-.713-.318-2.09-.952-3.526-1.633-1.526-.726-2.87-1.446-3.16-1.605a.247.247 0 0 1-.024-.045v-.88c-.003-.01-.006-.017-.006-.027v-5.72L1.996 4.91c.515-.279 1.538-.816 2.747-1.421 1.426-.714 2.835-1.364 3.33-1.585.236-.106.53-.267.83-.271ZM8 1.602c.292.004.582.163.818.267.491.22 1.886.865 3.304 1.574 1.2.602 2.214 1.132 2.725 1.41l-.603.302s-1.098.559-2.335 1.153C10.585 5.93 8.292 7.2 8.018 7.337a1.245 1.245 0 0 1-.231.08c-.054.014-.222.022-.316.022a1.255 1.255 0 0 1-.547-.102C6.65 7.2 4.356 5.93 3.033 5.308 1.795 4.714.698 4.155.698 4.155l-.603-.302c.51-.279 1.526-.808 2.725-1.41 1.418-.71 2.813-1.355 3.304-1.574.236-.104.526-.263.817-.267Z"/>
                    </svg>
                    <span>macOS</span>
                  </Button>
                  <Button variant="outline" className="py-6 flex-col h-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-8 w-8 mb-2">
                      <path fill="currentColor" d="M8.343.23a8.228 8.228 0 0 0-1.077-.04c-3.125.097-5.909 2.02-7.194 4.844a8.212 8.212 0 0 0-.202 7.833c1.25 2.5 3.765 4.285 6.535 4.606.9.097 1.81.057 2.7-.117a8.476 8.476 0 0 0 3.642-1.78 8.344 8.344 0 0 0 2.8-3.788A8.204 8.204 0 0 0 14.76 4.73a8.27 8.27 0 0 0-6.418-4.5ZM1.6 10.94a7.372 7.372 0 0 1-.28-1.664.653.653 0 0 1 .28-.041h12.588a.57.57 0 0 1 .294.04 7.56 7.56 0 0 1-1.069 3.574 7.48 7.48 0 0 1-2.55 2.442.542.542 0 0 1-.35-.156H5.379a.624.624 0 0 1-.337.156 7.433 7.433 0 0 1-3.442-4.351Zm11.78-4.691c.097-.42.143-.866.143-1.313a7.17 7.17 0 0 0-.255-1.883 7.51 7.51 0 0 0-5.046-5.242.555.555 0 0 0-.48.116.646.646 0 0 0-.14.337v7.105c0 .078.042.156.11.22a.596.596 0 0 0 .392.152h4.824c.172 0 .34-.063.467-.183a.625.625 0 0 0-.015-.309Z"/>
                    </svg>
                    <span>Linux</span>
                  </Button>
                </div>
                
                <div className="text-center text-sm text-muted-foreground mt-2">
                  Available for Windows 10+, macOS 11+, and major Linux distributions
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <h2 className="text-xl font-semibold">Desktop Features</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Advanced citation management and export</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>PDF annotation with AI-powered notes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Integration with Word, LaTeX, and other writing tools</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Offline library with full-text search</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Multi-document comparison and analysis</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="aspect-video bg-card rounded-lg overflow-hidden border shadow-md">
                  <div className="absolute top-0 left-0 right-0 h-6 bg-card border-b flex items-center px-2 z-10">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="h-full bg-card relative overflow-hidden">
                    {/* Image with negative top margin to crop from the top */}
                    <div className="relative w-full h-full">
                      <img 
                        src="https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-151c-61f7-9685-1db98a840722/raw?se=2025-04-18T12%3A05%3A45Z&sp=r&sv=2024-08-04&sr=b&scid=8d503df6-4240-5c59-89ad-88e478178b26&skoid=ae70be19-8043-4428-a990-27c58b478304&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-17T20%3A25%3A01Z&ske=2025-04-18T20%3A25%3A01Z&sks=b&skv=2024-08-04&sig=vfylBEEU7SjmFuVK6EjjsFObcJxxo3g9XsRH3oxDt8M%3D"
                        alt="Scholarly Desktop Application" 
                        className="object-cover w-full h-full mt-[-40px]"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-center">
                  <Button size="lg" className="gap-2">
                    <Download className="h-5 w-5" />
                    Download for {isMobile ? "Desktop" : "Your Device"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}