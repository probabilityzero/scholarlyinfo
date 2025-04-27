"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  ChevronDown,
  Search,
  ArrowLeft,
  Library,
  Download,
  HelpCircle
} from "lucide-react"
import Logo from "../ui/logo"
import NavbarSuiteDropdown from "./NavbarSuiteDropdown" 
import { useTheme } from "@/store/theme-provider"
import { useMediaQuery } from "@/hooks/use-media-query"
import SideMenu, { useSideMenu, SideMenuButton } from "./NavbarSideMenu"
import { cn } from "@/lib/utils"
import NavbarDownloadDropdown from "./NavbarDownloadDropdown" 

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDownloadOpen, setIsDownloadOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [lastSearchQuery, setLastSearchQuery] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)
  const downloadRef = useRef<HTMLDivElement>(null)
  const searchBarRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { theme, setTheme } = useTheme()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const isHomePage = pathname === "/"
  const isSearchPage = pathname === "/search"
  const isLargeDesktop = useMediaQuery("(min-width: 1024px)")

  const { isMenuOpen, toggleMenu, closeMenu } = useSideMenu()

  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)
  const [downloadOpenedByClick, setDownloadOpenedByClick] = useState(false)

  useEffect(() => {
    const q = searchParams.get("q")
    if (q) {
      setSearchQuery(q)
      setLastSearchQuery(q)
    }
  }, [searchParams])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => {
        const inputElement = searchContainerRef.current?.querySelector("input")
        if (inputElement) {
          inputElement.focus()
        }
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [isSearchOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isSearchOpen &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchOpen(false)
      }

      if (
        isFilterOpen &&
        filterRef.current &&
        !filterRef.current.contains(e.target as Node)
      ) {
        setIsFilterOpen(false)
      }

      if (
        isDownloadOpen &&
        downloadRef.current &&
        !downloadRef.current.contains(e.target as Node)
      ) {
        setIsDownloadOpen(false)
        setDownloadOpenedByClick(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isSearchOpen, isFilterOpen, isDownloadOpen])

  const handleDownloadMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }

    if (!downloadOpenedByClick) {
      setIsDownloadOpen(true)
    }
  }

  const handleDownloadMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsDownloadOpen(false)
      setDownloadOpenedByClick(false)
    }, 300)
    setHoverTimeout(timeout)
  }

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    const newState = !isDownloadOpen
    setIsDownloadOpen(newState)

    if (!newState) {
      setDownloadOpenedByClick(false)
    } else {
      setDownloadOpenedByClick(true)
    }
  }

  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
      }
    }
  }, [hoverTimeout])

  const toggleSearch = () => {
    if (!isSearchOpen) {
      setSearchQuery(lastSearchQuery)
    }
    setIsSearchOpen(!isSearchOpen)
    if (isMenuOpen) closeMenu()
    if (isFilterOpen) setIsFilterOpen(false)
  }

  const closeSearch = () => {
    setIsSearchOpen(false)
  }

  const handleBackAction = () => {
    if (isSearchPage) {
      router.back()
    } else {
      closeSearch()
    }
  }

  const toggleFilter = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFilterOpen(!isFilterOpen)
  }

  const closeFilter = () => {
    setIsFilterOpen(false)
  }

  const navbarClasses = `
    sticky top-0 z-50 w-full border-b border-muted
    ${isScrolled && !isMenuOpen
      ? "bg-background/95 backdrop-blur-sm duration-200 transition-all shadow-sm md:border-b md:border-muted"
      : "bg-background md:border-none"}
  `

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false
    return pathname.startsWith(path)
  }

  const linkClasses = (path: string) => `
    px-3 py-2 text-sm transition-colors font-medium hover:bg-muted rounded-md
    ${isActive(path) ? "text-primary" : ""}
  `

  const getCurrentSection = () => {
    if (pathname.startsWith("/about")) return "About"
    if (pathname.startsWith("/download")) return "Downloads"
    if (pathname.startsWith("/contact")) return "Contact"
    if (pathname.startsWith("/faq")) return "FAQ"
    if (pathname.startsWith("/careers")) return "Careers"
    return null
  }

  const currentSection = getCurrentSection()

  return (
    <header className={navbarClasses}>
      <div className="w-full">
        <div className="flex items-center justify-between px-2 md:px-4 h-14 md:h-16 relative">
          <div className="flex-shrink-0 flex items-center">
              <SideMenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

            {isDesktop ? (
              <Logo size="medium" withTagline={true} />
            ) : (
              <>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {currentSection ? (
                    <span className="font-semibold text-lg flex items-center">
                      {currentSection}
                    </span>
                  ) : (
                    <Logo size="small" withTagline={true} />
                  )}
                </div>
                <div className="w-8"></div>
              </>
            )}

            {isLargeDesktop && (
              <div className="flex ml-4">

                <div
                  ref={downloadRef}
                  className="relative"
                  onMouseLeave={handleDownloadMouseLeave}
                >
                  <div className="flex items-center rounded-md transition-colors font-medium hover:bg-muted">
                    <Link
                      href="/download"
                      className={`pl-3 py-2 text-sm ${
                        isActive("/download") ? "text-primary" : ""
                      }`}
                    >
                      Downloads
                    </Link>
                    <button
                      onClick={handleDownloadClick}
                      className="p-2 pl-1 rounded-lg transition-colors duration-200"
                      aria-label="Download options"
                      onMouseEnter={handleDownloadMouseEnter}
                    >
                      <div className="transform transition-transform duration-200">
                        {isDownloadOpen ? (
                          <ChevronDown
                            size={16}
                            className="transform rotate-180 transition-transform duration-200"
                          />
                        ) : (
                          <ChevronDown
                            size={16}
                            className="transition-transform duration-200"
                          />
                        )}
                      </div>
                    </button>
                  </div>

                  {isDownloadOpen && (
                    <>
                      <div
                        className="fixed inset-0 top-16 bg-background/30 backdrop-blur-sm z-40 transition-opacity duration-200 ease-in-out"
                        onClick={() => {
                          setIsDownloadOpen(false)
                          setDownloadOpenedByClick(false)
                        }}
                      ></div>

                      <div
                        className="absolute left-0 top-full z-50"
                        onMouseEnter={handleDownloadMouseEnter}
                        onMouseLeave={handleDownloadMouseLeave}
                      >
                        <NavbarDownloadDropdown
                          onSelect={() => {
                            setIsDownloadOpen(false)
                            setDownloadOpenedByClick(false)
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>

                <Link href="/faq" className={linkClasses("/faq")}>
                  FAQs
                </Link>
              </div>
            )}
          </div>

          <div className="flex-shrink-0 flex items-center space-x-2">

            <NavbarSuiteDropdown />
          </div>
        </div>
      </div>

      <SideMenu
        isMenuOpen={isMenuOpen}
        closeMenu={closeMenu}
        theme={theme}
        setTheme={setTheme}
        isDesktop={isDesktop}
      />
    </header>
  )
}