"use client"

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { 
  User, 
  Moon, 
  Sun, 
  Globe, 
  HelpCircle, 
  LogOut, 
  Settings,
  Compass,
  Library,
  MessageSquareWarning,
  BookOpen,
  Earth,
  ChevronDown,
  ListTree,
  AlignLeft,
  Loader2,
  UserRound,
  Menu,
  X,
  Keyboard
} from 'lucide-react'
import ThemeToggle from '../ui/toggle-theme'
import { MenuItem, MenuSection, MenuDivider } from '../ui/menu-item'
import { cn } from '@/lib/utils'
import { MdPerson } from 'react-icons/md'
import { JoinPrompt } from './JoinPrompt'
import { useSimpleAuth } from "@/hooks/use-auth"
import { IconMenu2 } from '@tabler/icons-react'
import KeyboardShortcutsModal from "../KeyboardShortcutsModal"

interface SideMenuProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  isDesktop: boolean;
}

export const useSideMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return {
    isMenuOpen,
    setIsMenuOpen,
    toggleMenu,
    closeMenu
  }
}

export const SideMenuButton = ({ isMenuOpen, toggleMenu }: { isMenuOpen: boolean, toggleMenu: () => void }) => {
  return (
    <button
      onClick={toggleMenu}
      className="p-2 mr-3 lg:mr-4 md:mb-1 rounded-full hover:bg-muted transition-colors duration-200"
      aria-label="Open menu"
    >
      {isMenuOpen ? <X size={22} /> : <IconMenu2 size={22} stroke={1.5} />}
    </button>
  )
}

const SideMenu: React.FC<SideMenuProps> = ({
  isMenuOpen,
  closeMenu,
  theme,
  setTheme,
  isDesktop,
}) => {
  const { isAuthenticated, isLoading } = useSimpleAuth()
  const menuRef = useRef<HTMLDivElement>(null)
  const [isBrowseExpanded, setIsBrowseExpanded] = useState(false)
  const router = useRouter()
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false)
  
  const [userInfo, setUserInfo] = useState({
    fullName: "Scholarly User",
    email: "",
    avatarUrl: ""
  })
  
  useEffect(() => {
    if (isAuthenticated) {
      try {
        const cachedUser = localStorage.getItem('scholarly_user_info')
        if (cachedUser) {
          setUserInfo(JSON.parse(cachedUser))
        }
      } catch (e) {
        console.log('Error getting cached user info')
      }
    }
  }, [isAuthenticated])

  const handleSignOut = () => {
    const accountUrl = process.env.NEXT_PUBLIC_ACCOUNT_URL || "https://id.scholarly.world"
    const returnUrl = encodeURIComponent(window.location.href)
    localStorage.removeItem('scholarly_user_info')
    window.location.href = `${accountUrl}/auth?signout?redirectTo=${returnUrl}`
    closeMenu()
  }

  useEffect(() => {
    if (isMenuOpen && !isDesktop) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen, isDesktop])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu()
      }
    }

    if (isMenuOpen && !isDesktop) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen, closeMenu, isDesktop])

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    if (isMenuOpen && !isDesktop) {
      document.addEventListener('keydown', handleEscKey)
    }
    return () => document.removeEventListener('keydown', handleEscKey)
  }, [isMenuOpen, closeMenu, isDesktop])

  const toggleBrowseMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsBrowseExpanded(!isBrowseExpanded)
  }

  const handleShortcutsClick = () => {
    setIsShortcutsModalOpen(true)
    closeMenu()
  }

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }
  
  return (
    <>
      <div 
        className={`
          fixed inset-0 bg-background/80 z-50 
          transition-all duration-300 ease-out
          ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
        `}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <div
        ref={menuRef}
        onClick={handleMenuClick}
        className={`
          fixed top-0 left-0 bottom-0 w-[280px] z-50 
          bg-background border-r shadow-lg
          overflow-y-auto no-scrollbar
          transform transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
          ${!isMenuOpen && isDesktop ? 'invisible' : 'visible'}
        `}
        style={{ 
          scrollbarWidth: 'none',
          transitionTimingFunction: 'cubic-bezier(0.20, 0.00, 0.00, 1.00)'
        }}
      >
        <div className="p-4">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="h-5 w-5 rounded-full animate-pulse bg-muted"></div>
            </div>
          ) : isAuthenticated ? (
            <>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center text-primary">
                  {userInfo.avatarUrl ? (
                    <Image 
                      src={userInfo.avatarUrl} 
                      alt={userInfo.fullName} 
                      width={40} 
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <MdPerson size={20} />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{userInfo.fullName}</p>
                  <p className="text-xs text-muted-foreground">{userInfo.email}</p>
                </div>
              </div>
              
              <MenuSection>
                <MenuItem 
                  href="" 
                  icon={UserRound} 
                  label="My Account" 
                  variant="side"
                  onClick={closeMenu}
                />
                <MenuItem 
                  href="/library" 
                  icon={Library} 
                  label="My Library" 
                  variant="side"
                  onClick={closeMenu}
                />
                <MenuItem 
                  icon={LogOut} 
                  label="Sign Out" 
                  onClick={handleSignOut} 
                  variant="side"
                />
              </MenuSection>
              </>
          ) : (
            <JoinPrompt 
              onItemClick={closeMenu} 
              includeMotion={false}
              className="-m-4"
              includeDivider={false}
            />
          )}
        </div>

        <MenuDivider />

        <div className="md:block hidden">
          <MenuSection title="Navigation">
            <MenuItem
              href="/explore"
              icon={Compass}
              label="Explore"
              onClick={closeMenu}
              variant="side"
            />
            
            <div className="relative">
              <div className="flex">
                
                <MenuItem
                  href="/browse"
                  label="Browse"
                  onClick={() => {
                      closeMenu();
                  }}
                  variant="side"
                  className="pl-10"
                />
                
                <button 
                  onClick={toggleBrowseMenu}
                  className="absolute left-0 flex items-center justify-center h-9 w-10 text-muted-foreground hover:text-foreground"
                  aria-label="Toggle browse menu"
                >
                  {isBrowseExpanded ? 
                    <ListTree className="h-5 w-5" /> : 
                    <AlignLeft className="h-5 w-5" />
                  }
                </button>
              </div>
              
              <div 
                className={cn(
                  "pl-8 overflow-hidden transition-all duration-200",
                  isBrowseExpanded ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <MenuItem
                  href="/browse/authors"
                  label="By Author"
                  onClick={closeMenu}
                  variant="side"
                  className="py-1"
                />
                <MenuItem
                  href="/browse/subjects"
                  label="By Subject"
                  onClick={closeMenu}
                  variant="side"
                  className="py-1"
                />
                <MenuItem
                  href="/browse/titles"
                  label="By Title"
                  onClick={closeMenu}
                  variant="side"
                  className="py-1"
                />
                <MenuItem
                  href="/browse/years"
                  label="By Year"
                  onClick={closeMenu}
                  variant="side"
                  className="py-1"
                />
              </div>
            </div>
            
            <MenuItem
              href="/network"
              icon={Earth}
              label="Network"
              onClick={closeMenu}
              variant="side"
            />
            <MenuItem
              href="/journals"
              icon={BookOpen}
              label="Journals"
              onClick={closeMenu}
              variant="side"
            />
          </MenuSection>
          <MenuDivider />
        </div>
        
        <div>
          <MenuSection title="Preference">
            <div className="flex justify-between items-center">
              <MenuItem
                icon={Moon}
                label='Appearance'
                className='hover:bg-transparent'
                variant='side'
              />
              <ThemeToggle />
            </div>     
            <MenuItem
              href="/settings"
              icon={Settings}
              label="Settings"
              onClick={closeMenu}
              variant="side"
            />
            <MenuItem
              href="/language"
              icon={Globe}
              label="Language"
              onClick={closeMenu}
              variant="side"
            />
            
            <div className="md:block hidden">
              <MenuItem
                icon={Keyboard}
                label="Keyboard Shortcuts"
                onClick={handleShortcutsClick}
                variant="side"
              />
            </div>
          </MenuSection>
          
          <MenuDivider />

          <MenuSection>
            <MenuItem
              href="/info/help"
              icon={HelpCircle}
              label="Help"
              onClick={closeMenu}
              variant="side"
            />
            <MenuItem
              href="/info/feedback"
              icon={MessageSquareWarning}
              label="Send Feedback"
              onClick={closeMenu}
              variant="side"
            />
          </MenuSection>
        </div>
      </div>
      
      <KeyboardShortcutsModal 
        isOpen={isShortcutsModalOpen} 
        onClose={() => setIsShortcutsModalOpen(false)} 
      />
    </>
  );
}

export default SideMenu