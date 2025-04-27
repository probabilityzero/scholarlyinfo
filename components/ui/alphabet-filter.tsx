"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface AlphabetFilterProps {
  onSelect: (letter: string) => void
  activeStyle?: string
  inactiveStyle?: string
  className?: string
  activeLetter?: string
}

export function AlphabetFilter({
  onSelect,
  activeStyle = "bg-primary text-primary-foreground",
  inactiveStyle = "bg-secondary/20 text-secondary-foreground hover:bg-secondary/30",
  className,
  activeLetter
}: AlphabetFilterProps) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
  return (
    <div className={cn("flex flex-wrap", className)}>
      {alphabet.map((letter) => {
        const isActive = letter === activeLetter;
        return (
          <button
            key={letter}
            onClick={() => onSelect(letter)}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors",
              isActive ? activeStyle : inactiveStyle
            )}
            aria-pressed={isActive}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}