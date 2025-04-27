"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  itemClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  maxContentHeight?: string;
}

export function FAQSection({
  title = "Frequently Asked Questions",
  subtitle = "Find quick answers to common questions about Scholarly",
  items,
  className,
  titleClassName,
  subtitleClassName,
  itemClassName,
  headerClassName,
  contentClassName,
  maxContentHeight = "max-h-40",
}: FAQSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={cn("my-8", className)}>
      {(title || subtitle) && (
        <div className="text-center py-8">
          {title && (
            <h2 className={cn("text-3xl font-bold", titleClassName)}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className={cn("text-muted-foreground mt-4", subtitleClassName)}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        {items.map((item, index) => (
          <div key={index} className={cn("border-b last:border-b-0", itemClassName)}>
            <button
              onClick={() => handleToggle(index)}
              className={cn(
                "flex justify-between items-center w-full py-5 px-4 text-left font-medium focus:outline-none",
                headerClassName
              )}
              aria-expanded={activeIndex === index}
              aria-controls={`faq-content-${index}`}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  activeIndex === index ? "rotate-180" : ""
                )}
                aria-hidden="true"
              />
            </button>
            <div
              id={`faq-content-${index}`}
              className={cn(
                "overflow-hidden transition-all duration-300",
                activeIndex === index ? maxContentHeight : "max-h-0"
              )}
            >
              <div className={cn("p-4 pt-0 text-muted-foreground", contentClassName)}>
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}