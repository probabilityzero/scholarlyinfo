"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Search,
  Home,
  BookOpen,
  ArrowLeft,
  HelpCircle,
  FileSearch
} from "lucide-react";
import { useState, useEffect } from "react";

export default function NotFound() {
  const pathname = usePathname();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Generate path suggestions based on the current path
  useEffect(() => {
    const generateSuggestions = () => {
      const pathParts = pathname.split("/").filter(Boolean);
      const suggestedPaths: string[] = [];

      if (pathParts.length > 0) {
        // Suggest parent path
        if (pathParts.length > 1) {
          suggestedPaths.push("/" + pathParts.slice(0, -1).join("/"));
        }
        
        // Suggest common variants
        if (pathParts[0] === "browse") {
          suggestedPaths.push("/browse/subjects");
          suggestedPaths.push("/browse/titles");
          suggestedPaths.push("/browse/years");
        } else if (pathParts[0] === "paper" || pathParts[0] === "papers") {
          suggestedPaths.push("/browse/papers");
          suggestedPaths.push("/library");
        } else if (pathParts[0] === "author" || pathParts[0] === "authors") {
          suggestedPaths.push("/browse/authors");
        } else if (pathParts[0] === "journal" || pathParts[0] === "journals") {
          suggestedPaths.push("/journals");
        }
      }

      // Always include these common pages
      if (!suggestedPaths.includes("/browse")) {
        suggestedPaths.push("/browse");
      }
      
      if (suggestedPaths.length < 3) {
        if (!suggestedPaths.includes("/")) {
          suggestedPaths.push("/");
        }
      }

      setSuggestions(suggestedPaths.slice(0, 3));
    };

    generateSuggestions();
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-[80vh] items-center justify-center">
      <div className="container max-w-3xl px-6 py-16 text-center">
        {/* Animated SVG Illustration */}
        <div className="mb-8 relative">
          <div className="relative mx-auto w-48 h-48">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse bg-primary/10 rounded-full h-36 w-36"></div>
            </div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <FileSearch size={80} className="text-primary opacity-80" />
            </div>
            <div className="absolute top-0 right-0">
              <div className="relative">
                <div className="absolute inset-0 animate-ping bg-primary/20 rounded-full h-12 w-12 delay-300 duration-700"></div>
                <div className="relative bg-background border border-border rounded-full h-12 w-12 flex items-center justify-center">
                  <HelpCircle size={20} className="text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 404 Message */}
        <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
          The page you're looking for doesn't exist or has been moved to a different location.
        </p>

        {/* Path Display */}
        <div className="bg-muted/50 rounded-lg py-2 px-4 mb-8 overflow-x-auto">
          <code className="text-sm font-mono break-all">{pathname}</code>
        </div>

        {/* Suggested Links */}
        <div className="space-y-6 mb-10">
          <h3 className="text-lg font-medium">Suggested Pages</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {suggestions.map((suggestion, index) => (
              <Link href={suggestion} key={index}>
                <Button variant="outline" size="sm" className="gap-1.5">
                  {suggestion === "/" ? (
                    <Home size={16} />
                  ) : suggestion === "/browse" || suggestion.startsWith("/browse/") ? (
                    <BookOpen size={16} />
                  ) : (
                    <ArrowLeft size={16} />
                  )}
                  {suggestion === "/" ? "Home" : suggestion.replace(/^\//, '')}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/browse">
            <Button size="lg" className="w-full sm:w-auto">
              <BookOpen className="mr-2 h-5 w-5" />
              Browse Papers
            </Button>
          </Link>
          
          <Link href="/">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Home className="mr-2 h-5 w-5" />
              Go to Homepage
            </Button>
          </Link>
        </div>

        {/* Search Box */}
        <div className="mt-12 max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="search"
              className="block w-full p-4 pl-10 border rounded-lg bg-card focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="Search for papers, authors, or topics..."
            />
            <Button className="absolute right-2.5 bottom-2.5">
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}