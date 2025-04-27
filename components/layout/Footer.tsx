"use client"

import Link from "next/link"
import ThemeToggle from "../ui/toggle-theme"
import Logo from "../ui/logo"

// Enable static site generation
export const dynamic = "force-static"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-[#1a1a1a] text-gray-50 border-t border-gray-700 pt-8 pb-4 mt-16 hidden md:block">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-10 mb-12">
          {/* Column 1: Logo and about */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-6">
              <Logo size="medium" withTagline={true} />
            </div>
          </div>

          {/* Column 2: Browse Categories */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Browse</h3>
            <ul className="space-y-3 text-[15px] text-gray-300">
              <li>
                <Link href="/browse/subjects" className="hover:text-white hover:underline transition-colors">
                  Subject Areas
                </Link>
              </li>
              <li>
                <Link href="/browse/titles" className="hover:text-white hover:underline transition-colors">
                  Paper Titles
                </Link>
              </li>
              <li>
                <Link href="/browse/years" className="hover:text-white hover:underline transition-colors">
                  Publication Years
                </Link>
              </li>
              <li>
                <Link href="/browse/authors" className="hover:text-white hover:underline transition-colors">
                  Authors
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-[15px] text-gray-300">
              <li>
                <Link href="/explore" className="hover:text-white hover:underline transition-colors">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/network" className="hover:text-white hover:underline transition-colors">
                  Network
                </Link>
              </li>
              <li>
                <Link href="/journals" className="hover:text-white hover:underline transition-colors">
                  Journals
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white hover:underline transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: About Scholarly */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-3 text-[15px] text-gray-300">
              <li>
                <Link href="/info/about" className="hover:text-white hover:underline transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="/info/contact" className="hover:text-white hover:underline transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/info/career" className="hover:text-white hover:underline transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/info/contribute" className="hover:text-white hover:underline transition-colors">
                  Contribute
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section with theme toggle, copyright and legal links */}
        <div className="border-t border-gray-800 pt-4 mt-4">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between">
            <p className="text-xs text-gray-400 mt-4 md:mt-0">
              &copy; {currentYear} Scholarly. All rights reserved. Not affiliated with listed publishers.
            </p>
            
            <div className="flex items-center space-x-8">
              <ul className="flex space-x-6 text-xs text-gray-400">
                <li>
                  <Link href="/info/terms" className="hover:text-white hover:underline transition-colors">
                    Terms 
                  </Link>
                </li>
                <li>
                  <Link href="/info/privacy" className="hover:text-white hover:underline transition-colors">
                    Privacy 
                  </Link>
                </li>
                <li>
                  <Link href="/info/cookies" className="hover:text-white hover:underline transition-colors">
                    Cookies
                  </Link>
                </li>
              </ul>
              
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

