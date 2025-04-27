import { ArxivProvider, searchPapers as searchArxivPapers } from "./arxiv";
import { extractIdentifier, formatIdentifier, IdentifierType } from "@/lib/identifiers";

// Import types
import type { PaperProvider, Paper, SearchQuery, SearchResult } from "./types";
// Import SearchParams from arxiv or define it here if it doesn't exist in types.ts
import type { SearchParams } from "./arxiv";  // Add this import

// Registry of all available providers
const providers: { [key: string]: PaperProvider } = {
  arxiv: ArxivProvider,
  // Add more providers here in the future (e.g., biorxiv, medrxiv, etc.)
};

// Get provider for a specific identifier
export function getProviderForIdentifier(id: string): PaperProvider | null {
  const identifierInfo = extractIdentifier(id);
  
  if (!identifierInfo) {
    // Default to arXiv if no identifier type detected
    return providers.arxiv;
  }
  
  // Map identifier types to provider IDs
  const typeToProvider: { [key in IdentifierType]?: string } = {
    [IdentifierType.ARXIV]: "arxiv",
    [IdentifierType.BIORXIV]: "biorxiv",
    [IdentifierType.MEDRXIV]: "medrxiv",
    // Add more mappings as they're implemented
  };
  
  const providerId = typeToProvider[identifierInfo.type];
  return providerId ? providers[providerId] || null : null;
}

// Get paper from any provider based on ID
export async function getPaper(id: string): Promise<Paper | null> {
  const provider = getProviderForIdentifier(id);
  
  if (!provider) {
    console.error(`No provider found for ID: ${id}`);
    return null;
  }
  
  return provider.fetchPaper(id);
}

// Main search function that delegates to the appropriate provider
export async function searchPapers(searchQuery: SearchParams, providerId = "arxiv"): Promise<SearchResult> {
  console.log("searchPapers called with:", { searchQuery, providerId });
  
  try {
    if (providerId === "arxiv") {
      const result = await searchArxivPapers(searchQuery, providerId);
      return result;
    }
    
    // Fallback to arXiv if provider not supported
    return await searchArxivPapers(searchQuery, "arxiv");
  } catch (error) {
    console.error(`Error in searchPapers:`, error);
    return {
      papers: [],
      totalResults: 0,
      startIndex: 0,
      itemsPerPage: searchQuery.maxResults || 10,
      providerId: "arxiv"
    };
  }
}

// List all available providers - modified to return just the necessary info
export function getProviders(): Array<{ id: string; name: string; description?: string; icon?: string }> {
  return Object.values(providers).map(provider => ({
    id: provider.id,
    name: provider.name,
    // description: provider.description,
    icon: provider.icon
  }));
}

// Export types and providers properly
export type { PaperProvider, Paper, SearchQuery, SearchResult, SearchParams };  // Add SearchParams to exports
export { ArxivProvider };