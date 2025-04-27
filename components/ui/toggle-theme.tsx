"use client"

import { MdDesktopWindows, MdLightMode, MdNightlight } from "react-icons/md"
import { useTheme } from "@/store/theme-provider"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center border border-gray-600 bg-[#444444] dark:bg-[#161616] rounded-full p-1 py-0 space-x-1">
      <button
        onClick={() => setTheme("system")}
        className={`p-1 ${theme === "system" ? "text-white" : "text-gray-400 hover:text-white"}`}
        aria-label="System Theme"
      >
        <MdDesktopWindows size={16} />
      </button>
      <button
        onClick={() => setTheme("light")}
        className={`p-1 ${theme === "light" ? "text-white" : "text-gray-400 hover:text-white"}`}
        aria-label="Light Theme"
      >
        <MdLightMode size={16} />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-1 ${theme === "dark" ? "text-white" : "text-gray-400 hover:text-white"}`}
        aria-label="Dark Theme"
      >
        <MdNightlight size={16} />
      </button>
    </div>
  )
}

