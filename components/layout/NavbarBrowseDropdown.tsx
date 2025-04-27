"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface BrowseDropdownProps {
  onSelect: () => void
}

export default function BrowseDropdown({ onSelect }: BrowseDropdownProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>("subjects") // Default to subjects when opened

  const categories = [
    {
      id: "subjects",
      label: "Browse by Subject",
      path: "/browse/subjects",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
          <path d="M21.41 11.58L12.41 2.58C12.05 2.22 11.55 2 11 2H4C2.9 2 2 2.9 2 4V11C2 11.55 2.22 12.05 2.59 12.42L11.59 21.42C11.95 21.78 12.45 22 13 22C13.55 22 14.05 21.78 14.41 21.41L21.41 14.41C21.78 14.05 22 13.55 22 13C22 12.45 21.77 11.94 21.41 11.58ZM6.5 8C5.67 8 5 7.33 5 6.5C5 5.67 5.67 5 6.5 5C7.33 5 8 5.67 8 6.5C8 7.33 7.33 8 6.5 8Z" />
        </svg>
      ),
      subcategories: [
        { id: "cs", label: "Computer Science", count: "1.2M+", path: "/browse/subjects/cs" },
        { id: "physics", label: "Physics", count: "980K+", path: "/browse/subjects/physics" },
        { id: "math", label: "Mathematics", count: "850K+", path: "/browse/subjects/math" },
        { id: "bio", label: "Biology", count: "750K+", path: "/browse/subjects/bio" },
        { id: "medicine", label: "Medicine", count: "690K+", path: "/browse/subjects/medicine" },
        { id: "engineering", label: "Engineering", count: "610K+", path: "/browse/subjects/engineering" },
      ]
    },
    {
      id: "authors",
      label: "Browse by Author",
      path: "/browse/authors",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
          <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" />
        </svg>
      ),
      subcategories: [
        { id: "notable", label: "Notable Researchers", count: "Featured", path: "/browse/authors/notable" },
        { id: "institution", label: "By Institution", count: "Categories", path: "/browse/authors/institution" },
        { id: "alpha", label: "Alphabetically", count: "A-Z", path: "/browse/authors/alpha" },
        { id: "h-index", label: "By H-Index", count: "Rankings", path: "/browse/authors/h-index" },
        { id: "collaborations", label: "Research Networks", count: "Teams", path: "/browse/authors/collaborations" },
      ]
    },
    {
      id: "years",
      label: "Browse by Year",
      path: "/browse/years",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
          <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM19 6H5V5H19V6Z" />
        </svg>
      ),
      subcategories: [
        { id: "recent", label: "Recent (2020-2024)", count: "Latest", path: "/browse/years/recent" },
        { id: "2010s", label: "2010-2019", count: "10 years", path: "/browse/years/2010s" },
        { id: "2000s", label: "2000-2009", count: "10 years", path: "/browse/years/2000s" },
        { id: "pre2000", label: "Pre-2000", count: "Archives", path: "/browse/years/pre2000" },
        { id: "historical", label: "Historical Papers", count: "Legacy", path: "/browse/years/historical" },
      ]
    },
    {
      id: "titles",
      label: "Browse by Title",
      path: "/browse/titles",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
          <path d="M21 5C19.89 4.65 18.67 4.5 17.5 4.5C15.55 4.5 13.45 4.9 12 6C10.55 4.9 8.45 4.5 6.5 4.5C4.55 4.5 2.45 4.9 1 6V20.65C1 20.9 1.25 21.15 1.5 21.15C1.6 21.15 1.65 21.1 1.75 21.1C3.1 20.45 5.05 20 6.5 20C8.45 20 10.55 20.4 12 21.5C13.35 20.65 15.8 20 17.5 20C19.15 20 20.85 20.3 22.25 21.05C22.35 21.1 22.4 21.1 22.5 21.1C22.75 21.1 23 20.85 23 20.6V6C22.4 5.55 21.75 5.25 21 5ZM21 18.5C19.9 18.15 18.7 18 17.5 18C15.8 18 13.35 18.65 12 19.5V8C13.35 7.15 15.8 6.5 17.5 6.5C18.7 6.5 19.9 6.65 21 7V18.5Z" />
        </svg>
      ),
      subcategories: [
        { id: "alphabet", label: "Alphabetical Index", count: "A-Z", path: "/browse/titles/alphabet" },
        { id: "popular", label: "Most Cited Papers", count: "Top 1000", path: "/browse/titles/popular" },
        { id: "keyword", label: "Keyword Search", count: "Advanced", path: "/browse/titles/keyword" },
        { id: "recent", label: "Recently Added", count: "New", path: "/browse/titles/recent" },
      ]
    },
    {
      id: "journals",
      label: "View all Journals",
      path: "/journals",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
          <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 10H9V17H7V10ZM11 7H13V17H11V7ZM15 13H17V17H15V13Z" />
        </svg>
      ),
      subcategories: [
        { id: "top", label: "Top Journals", count: "By Impact", path: "/browse/journals/top" },
        { id: "open", label: "Open Access", count: "Free", path: "/browse/journals/open" },
        { id: "field", label: "By Field", count: "Categories", path: "/browse/journals/field" },
        { id: "recent", label: "New Issues", count: "Latest", path: "/browse/journals/recent" },
        { id: "special", label: "Special Editions", count: "Curated", path: "/browse/journals/special" },
      ]
    },
  ]

  // Simplified animations for better performance
  const dropdownVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }
  
  const panelVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={dropdownVariants}
      transition={{ duration: 0.1 }}
      className="fixed inset-x-0 top-16 bg-background shadow-xl z-40 border-b border-muted"
    >
      <div className="container mx-auto px-4">
        <div className="flex pb-4">
          {/* Primary Navigation Column */}
          <div className="w-64 border-r border-muted/50 py-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.path}
                className={cn(
                  "w-full flex items-center px-4 py-3 text-sm hover:bg-muted/70 transition-colors rounded-l-lg hover:underline",
                  activeCategory === category.id ? "bg-muted/80" : ""
                )}
                onMouseEnter={() => setActiveCategory(category.id)}
                onClick={onSelect}
              >
                <span className="w-6 h-6 flex items-center justify-center mr-3">
                  {category.icon}
                </span>
                <span className="font-medium">{category.label}</span>
              </Link>
            ))}
            
            <div className="px-4 py-4 mt-2 border-t border-muted/50">
              <Link 
                href="/browse" 
                className="flex items-center justify-center w-full py-2.5 px-3 text-sm text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors hover:underline"
                onClick={onSelect}
              >
                <span className="font-medium">View All Categories</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="ml-2">
                  <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Secondary Detail Column */}
          <AnimatePresence mode="wait">
            {activeCategory && (
              <motion.div
                key={activeCategory}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={panelVariants}
                transition={{ duration: 0.1 }}
                className="flex-1 p-6"
              >
                {/* Header for active category */}
                <div className="mb-6 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    {categories.find(c => c.id === activeCategory)?.icon}
                  </div>
                  <div>
                    <Link 
                      href={categories.find(c => c.id === activeCategory)?.path || "/browse"}
                      className="font-serif font-medium text-xl hover:underline"
                      onClick={onSelect}
                    >
                      {categories.find(c => c.id === activeCategory)?.label}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      Discover academic research organized by {activeCategory}
                    </p>
                  </div>
                </div>
                
                {/* Subcategories grid */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {categories.find(c => c.id === activeCategory)?.subcategories.map((sub) => (
                    <Link
                      key={sub.id}
                      href={sub.path}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors group border border-muted/40"
                      onClick={onSelect}
                    >
                      <span className="font-medium group-hover:text-primary group-hover:underline transition-colors">
                        {sub.label}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary-foreground">
                        {sub.count}
                      </span>
                    </Link>
                  ))}
                </div>
                
                {/* Featured content */}
                <div className="flex">
                  {/* Featured spotlight */}
                  <div className="flex-1 mr-4">
                    <h4 className="text-sm font-medium mb-3">Featured in {activeCategory}</h4>
                    <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-xl">
                      {activeCategory === "authors" && (
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mr-4">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                              <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
                            </svg>
                          </div>
                          <div>
                            <Link 
                              href="/browse/authors/notable"
                              className="font-medium hover:underline"
                              onClick={onSelect}
                            >
                              Notable Researchers
                            </Link>
                            <div className="text-sm text-muted-foreground">Explore works by leading academics with significant contributions to their fields</div>
                          </div>
                        </div>
                      )}
                      
                      {activeCategory === "subjects" && (
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mr-4">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                              <path d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM9 4H11V9L10 8.25L9 9V4ZM18 20H6V4H7V13L10 10.75L13 13V4H18V20Z" />
                            </svg>
                          </div>
                          <div>
                            <Link 
                              href="/browse/subjects/cs"
                              className="font-medium hover:underline"
                              onClick={onSelect}
                            >
                              Trending in Computer Science
                            </Link>
                            <div className="text-sm text-muted-foreground">Large Language Models, Neural Networks, and the latest AI research developments</div>
                          </div>
                        </div>
                      )}
                      
                      {activeCategory === "years" && (
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mr-4">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                              <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" />
                            </svg>
                          </div>
                          <div>
                            <Link 
                              href="/browse/years/recent"
                              className="font-medium hover:underline"
                              onClick={onSelect}
                            >
                              Latest Research (2024)
                            </Link>
                            <div className="text-sm text-muted-foreground">Explore the most recent academic publications from the current year</div>
                          </div>
                        </div>
                      )}
                      
                      {activeCategory === "titles" && (
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mr-4">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                              <path d="M9.4 16.6L4.8 12L9.4 7.4L8 6L2 12L8 18L9.4 16.6ZM14.6 16.6L19.2 12L14.6 7.4L16 6L22 12L16 18L14.6 16.6Z" />
                            </svg>
                          </div>
                          <div>
                            <Link 
                              href="/browse/titles/popular"
                              className="font-medium hover:underline"
                              onClick={onSelect}
                            >
                              Most Cited Papers
                            </Link>
                            <div className="text-sm text-muted-foreground">Discover research papers with the highest impact factors and citation rates</div>
                          </div>
                        </div>
                      )}
                      
                      {activeCategory === "journals" && (
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mr-4">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                              <path d="M21 5C19.89 4.65 18.67 4.5 17.5 4.5C15.55 4.5 13.45 4.9 12 6C10.55 4.9 8.45 4.5 6.5 4.5C4.55 4.5 2.45 4.9 1 6V20.65C1 20.9 1.25 21.15 1.5 21.15C1.6 21.15 1.65 21.1 1.75 21.1C3.1 20.45 5.05 20 6.5 20C8.45 20 10.55 20.4 12 21.5C13.35 20.65 15.8 20 17.5 20C19.15 20 20.85 20.3 22.25 21.05C22.35 21.1 22.4 21.1 22.5 21.1C22.75 21.1 23 20.85 23 20.6V6C22.4 5.55 21.75 5.25 21 5ZM21 18.5C19.9 18.15 18.7 18 17.5 18C15.8 18 13.35 18.65 12 19.5V8C13.35 7.15 15.8 6.5 17.5 6.5C18.7 6.5 19.9 6.65 21 7V18.5Z" />
                            </svg>
                          </div>
                          <div>
                            <Link 
                              href="/browse/journals/top"
                              className="font-medium hover:underline"
                              onClick={onSelect}
                            >
                              Nature & Science
                            </Link>
                            <div className="text-sm text-muted-foreground">Explore top publications and their latest issues in scientific research</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Quick stats */}
                  <div className="w-64">
                    <h4 className="text-sm font-medium mb-3">Quick Stats</h4>
                    <div className="bg-muted/30 p-4 rounded-xl">
                      {activeCategory === "subjects" && (
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm text-muted-foreground">Total Papers</div>
                            <div className="text-2xl font-medium">4.2M+</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Subject Areas</div>
                            <div className="text-2xl font-medium">48</div>
                          </div>
                          <div className="pt-2 mt-2 border-t border-muted/50">
                            <Link 
                              href={categories.find(c => c.id === activeCategory)?.path || "/browse"} 
                              className="text-sm text-primary hover:underline flex items-center"
                              onClick={onSelect}
                            >
                              View all subjects
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                                <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      )}
                      
                      {activeCategory === "authors" && (
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm text-muted-foreground">Researchers</div>
                            <div className="text-2xl font-medium">1.8M+</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Institutions</div>
                            <div className="text-2xl font-medium">5,400+</div>
                          </div>
                          <div className="pt-2 mt-2 border-t border-muted/50">
                            <Link 
                              href={categories.find(c => c.id === activeCategory)?.path || "/browse"} 
                              className="text-sm text-primary hover:underline flex items-center"
                              onClick={onSelect}
                            >
                              Browse all authors
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                                <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      )}
                      
                      {activeCategory === "years" && (
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm text-muted-foreground">Timespan</div>
                            <div className="text-2xl font-medium">1991-2024</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">This Year</div>
                            <div className="text-2xl font-medium">48K+ papers</div>
                          </div>
                          <div className="pt-2 mt-2 border-t border-muted/50">
                            <Link 
                              href={categories.find(c => c.id === activeCategory)?.path || "/browse"} 
                              className="text-sm text-primary hover:underline flex items-center"
                              onClick={onSelect}
                            >
                              View timeline
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                                <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      )}
                      
                      {activeCategory === "titles" && (
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm text-muted-foreground">Total Titles</div>
                            <div className="text-2xl font-medium">4.2M+</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">New This Month</div>
                            <div className="text-2xl font-medium">14.2K+</div>
                          </div>
                          <div className="pt-2 mt-2 border-t border-muted/50">
                            <Link 
                              href={categories.find(c => c.id === activeCategory)?.path || "/browse"} 
                              className="text-sm text-primary hover:underline flex items-center"
                              onClick={onSelect}
                            >
                              View title index
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                                <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      )}
                      
                      {activeCategory === "journals" && (
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm text-muted-foreground">Journals</div>
                            <div className="text-2xl font-medium">12,400+</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Open Access</div>
                            <div className="text-2xl font-medium">4,800+</div>
                          </div>
                          <div className="pt-2 mt-2 border-t border-muted/50">
                            <Link 
                              href={categories.find(c => c.id === activeCategory)?.path || "/browse"} 
                              className="text-sm text-primary hover:underline flex items-center"
                              onClick={onSelect}
                            >
                              Browse all journals
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                                <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

