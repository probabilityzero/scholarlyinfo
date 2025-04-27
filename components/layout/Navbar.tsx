"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  ChevronDown,
  Search,
  ArrowLeft,
  Library,
} from "lucide-react"
import Logo from "../ui/logo"
import BrowseDropdown from "./NavbarBrowseDropdown"
import NavbarSuiteDropdown from "./NavbarSuiteDropdown" 
import { useTheme } from "@/store/theme-provider"
import { useMediaQuery } from "@/hooks/use-media-query"
import SideMenu, { useSideMenu, SideMenuButton } from "./NavbarSideMenu"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isBrowseOpen, setIsBrowseOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [lastSearchQuery, setLastSearchQuery] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)
  const browseRef = useRef<HTMLDivElement>(null)
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
  const [browseOpenedByClick, setBrowseOpenedByClick] = useState(false)

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
        isBrowseOpen &&
        browseRef.current &&
        !browseRef.current.contains(e.target as Node)
      ) {
        setIsBrowseOpen(false)
        setBrowseOpenedByClick(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isSearchOpen, isFilterOpen, isBrowseOpen])

  const handleBrowseMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }

    if (!browseOpenedByClick) {
      setIsBrowseOpen(true)
    }
  }

  const handleBrowseMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsBrowseOpen(false)
      setBrowseOpenedByClick(false)
    }, 300)
    setHoverTimeout(timeout)
  }

  const handleBrowseClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    const newState = !isBrowseOpen
    setIsBrowseOpen(newState)

    if (!newState) {
      setBrowseOpenedByClick(false)
    } else {
      setBrowseOpenedByClick(true)
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
    if (pathname.startsWith("/explore")) return "Explore"
    if (pathname.startsWith("/browse")) return "Browse"
    if (pathname.startsWith("/journals")) return "Journals"
    if (pathname.startsWith("/library")) return "My Library"
    if (pathname.startsWith("/search")) return "Search"
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
              <Logo size="medium" />
            ) : (
              <>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {currentSection ? (
                    <span className="font-semibold text-lg flex items-center">
                      {currentSection}
                    </span>
                  ) : (
                    <Logo size="medium" />
                  )}
                </div>
                <div className="w-8"></div>
              </>
            )}

            {isLargeDesktop && (
              <div className="flex ml-4">
                <Link href="/explore" className={linkClasses("/explore")}>
                  Explore
                </Link>

                <div
                  ref={browseRef}
                  className="relative"
                  onMouseLeave={handleBrowseMouseLeave}
                >
                  <div className="flex items-center rounded-md transition-colors font-medium hover:bg-muted">
                    <Link
                      href="/browse"
                      className={`pl-3 py-2 text-sm ${
                        isActive("/browse") ||
                        isActive("browse/subjects") ||
                        isActive("browse/titles") ||
                        isActive("/browse/years")
                          ? "text-primary"
                          : ""
                      }`}
                    >
                      Browse
                    </Link>
                    <button
                      onClick={handleBrowseClick}
                      className="p-2 pl-1 rounded-lg transition-colors duration-200"
                      aria-label="Browse options"
                      onMouseEnter={handleBrowseMouseEnter}
                    >
                      <div className="transform transition-transform duration-200">
                        {isBrowseOpen ? (
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

                  {isBrowseOpen && (
                    <>
                      <div
                        className="fixed inset-0 top-16 bg-background/30 backdrop-blur-sm z-40 transition-opacity duration-200 ease-in-out"
                        onClick={() => {
                          setIsBrowseOpen(false)
                          setBrowseOpenedByClick(false)
                        }}
                      ></div>

                      <div
                        className="absolute left-0 top-full z-50"
                        onMouseEnter={handleBrowseMouseEnter}
                        onMouseLeave={handleBrowseMouseLeave}
                      >
                        <BrowseDropdown
                          onSelect={() => {
                            setIsBrowseOpen(false)
                            setBrowseOpenedByClick(false)
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>

                <Link href="/journals" className={linkClasses("/journals")}>
                  Journals
                </Link>
              </div>
            )}
          </div>

          <div className="flex-shrink-0 flex items-center space-x-2">
            {!isDesktop && (
              <button
                onClick={toggleSearch}
                className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
                aria-label="Search"
              >
                <Search size={22} />
              </button>
            )}

            <NavbarSuiteDropdown />

            
            {isDesktop && (
              isLargeDesktop ? (
                <Link href="/library" className={linkClasses("/library")}>
                  My Library
                </Link>
              ) : (
                <Link
                  href="/library"
                  className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
                  aria-label="My Library"
                >
                  <Library size={22} />
                </Link>
              )
            )}
          </div>
        </div>

        {!isDesktop && ((isSearchOpen && !isSearchPage) || isSearchPage) && (
          <>
            {isSearchOpen && !isSearchPage && (
              <div
                className="fixed inset-0 top-0 bg-black/60 z-40 transition-opacity duration-300 ease-in-out"
                onClick={() => setIsSearchOpen(false)}
              ></div>
            )}
            <div
              ref={searchContainerRef}
              className="absolute top-0 left-0 right-0 z-40 h-14 bg-background border-t border-b flex items-center pl-0.5 pr-3 transform transition-all duration-300 ease-in-out"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center w-full">
                  <button
                    onClick={isSearchPage ? handleBackAction : closeSearch}
                    className="p-2 rounded-full hover:bg-muted transition-colors duration-200 mr-1"
                    aria-label={isSearchPage ? "Back" : "Close search"}
                  >
                    <ArrowLeft size={20} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
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