import type { Paper } from "@/lib/providers/types";
import { extractAllIdentifiers } from "@/lib/identifiers";

/**
 * Convert an arXiv entry to the common Paper type
 */
export function convertArxivEntryToPaper(entry: any): Paper {
  // Define a type for the author object
  interface Author {
    name: string;
  }

  const paper: Paper = {
    id: entry.id,
    title: entry.title,
    abstract: entry.summary,
    authors: Array.isArray(entry.author) 
      ? entry.author.map((a: Author) => a.name) 
      : [entry.author.name],
    publishedDate: entry.published,
    lastUpdatedDate: entry.updated,
    pdfUrl: entry.id.replace('abs', 'pdf') + '.pdf',
    providerId: "arxiv",
    rawId: entry.id.split('/').pop() || entry.id,
    metadata: {
      // Add category to metadata since it's not in the Paper type
      category: entry["arxiv:primary_category"] ? entry["arxiv:primary_category"]["@_term"] : "",
    },
  };

  // Extract any identifiers from the entry
  const identifiers = extractAllIdentifiers(entry);
  if (identifiers.length > 0) {
    paper.metadata.identifiers = identifiers;
  }

  return paper;
}

/**
 * Convert multiple arXiv entries to Papers
 */
export function convertArxivEntriesToPapers(entries: any[]): Paper[] {
  return entries.map(convertArxivEntryToPaper);
}

// Add additional converter functions for other providers as needed