"use client"

import React from "react"
import { ArrowUpDown, ListFilter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { type PaperListingDisplayMode } from "@/components/PaperListing"

// Define the sorting types clearly in one place
export type SortField = "submittedDate" | "lastUpdatedDate" | "relevance"
export type SortOrder = "ascending" | "descending"
export type DateFilter = "all-time" | "last-week" | "last-month" | "last-year"

const sortFieldLabels = {
  submittedDate: "Date Submitted",
  lastUpdatedDate: "Last Updated",
  relevance: "Relevance"
}

const dateFilterLabels = {
  "all-time": "All Time",
  "last-week": "Past Week",
  "last-month": "Past Month",
  "last-year": "Past Year"
}

interface FilterControlsProps {
  sortField: SortField
  onSortFieldChange: (value: SortField) => void
  sortOrder: SortOrder
  onSortOrderChange: (value: SortOrder) => void
  dateFilter?: DateFilter
  onDateFilterChange?: (value: DateFilter) => void
  viewMode: PaperListingDisplayMode
  onViewModeChange: (mode: PaperListingDisplayMode) => void
  showDateFilter?: boolean
  className?: string
}

export default function FilterControls({
  sortField,
  onSortFieldChange,
  sortOrder,
  onSortOrderChange,
  dateFilter = "all-time",
  onDateFilterChange,
  viewMode,
  onViewModeChange,
  showDateFilter = true,
  className = ""
}: FilterControlsProps) {
  // Active sort label for the dropdown trigger
  const activeSortLabel = sortFieldLabels[sortField]
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Sort Dropdown */}
      <DropdownMenu>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center h-8 px-3 gap-1.5 text-sm font-normal"
                >
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="hidden md:inline">{activeSortLabel}</span>
                  <ArrowUpDown className={`h-3 w-3 opacity-60 ${sortOrder === "ascending" ? "rotate-180" : ""}`} />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              Sort and filter papers
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenuContent align="end" className="w-56">
          {/* Sort field section */}
          <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
            Sort by
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup value={sortField} onValueChange={(value) => onSortFieldChange(value as SortField)}>
            {Object.entries(sortFieldLabels).map(([value, label]) => (
              <DropdownMenuRadioItem 
                key={value} 
                value={value}
                className="text-sm"
              >
                {label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
          
          <DropdownMenuSeparator />
          
          {/* Sort order section */}
          <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
            Order
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup value={sortOrder} onValueChange={(value) => onSortOrderChange(value as SortOrder)}>
            <DropdownMenuRadioItem value="descending" className="text-sm">
              Newest first
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="ascending" className="text-sm">
              Oldest first
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          
          {/* Date filter section - only show if enabled */}
          {showDateFilter && onDateFilterChange && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
                Time period
              </DropdownMenuLabel>
              <DropdownMenuRadioGroup value={dateFilter} onValueChange={(value) => onDateFilterChange(value as DateFilter)}>
                {Object.entries(dateFilterLabels).map(([value, label]) => (
                  <DropdownMenuRadioItem 
                    key={value} 
                    value={value}
                    className="text-sm"
                  >
                    {label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View mode toggle */}
      <TooltipProvider delayDuration={300}>
        <div className="hidden sm:flex items-center rounded-md border">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={viewMode === "compact" ? "subtle" : "ghost"}
                size="icon"
                className="h-8 w-8 rounded-r-none border-r border-r-border"
                onClick={() => onViewModeChange("compact")}
                aria-label="Grid view"
              >
                <Grid className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              Grid view
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={viewMode === "standard" ? "subtle" : "ghost"}
                size="icon"
                className="h-8 w-8 rounded-l-none"
                onClick={() => onViewModeChange("standard")}
                aria-label="List view"
              >
                <List className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs rounded-lg">
              List view
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  )
}