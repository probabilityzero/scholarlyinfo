import { XMLParser } from "fast-xml-parser"
import { Paper, Author, PaperProvider, SearchQuery, SearchResult } from "./types";

const API_BASE_URL = "https://export.arxiv.org/api/query"

// Define types for the API response
export interface ArxivResponse {
  feed: {
    entry: ArxivEntry[] | ArxivEntry
    "opensearch:totalResults": number
    "opensearch:startIndex": number
    "opensearch:itemsPerPage": number
  }
}

export interface ArxivEntry {
  id: string
  title: string
  summary: string
  published: string
  updated: string
  author: ArxivAuthor[] | ArxivAuthor
  category: ArxivCategory[] | ArxivCategory
  "arxiv:primary_category"?: ArxivCategory
  "arxiv:comment"?: string
  "arxiv:journal_ref"?: string
  "arxiv:doi"?: string
  link: ArxivLink[] | ArxivLink
}

export interface ArxivAuthor {
  name: string
  "arxiv:affiliation"?: string
}

export interface ArxivCategory {
  "@_term": string
  "@_scheme": string
}

export interface ArxivLink {
  "@_href": string
  "@_rel": string
  "@_title"?: string
  "@_type"?: string
}

export interface SearchParams {
  query?: string
  title?: string
  author?: string
  abstract?: string
  category?: string
  categories?: string[]
  searchQuery?: string
  idList?: string
  dateFrom?: string
  dateTo?: string
  start?: number
  maxResults?: number
  sortBy?: "relevance" | "lastUpdatedDate" | "submittedDate"
  sortOrder?: "ascending" | "descending"
  page?: number
}

// Helper function to build search_query parameter
export function buildSearchQuery(params: SearchParams): string {
  const parts: string[] = []

  if (params.query) parts.push(`all:${encodeURIComponent(params.query)}`)
  if (params.title) parts.push(`ti:${encodeURIComponent(params.title)}`)
  if (params.author) parts.push(`au:${encodeURIComponent(params.author)}`)
  if (params.abstract) parts.push(`abs:${encodeURIComponent(params.abstract)}`)
  
  // Handle single category or multiple categories
  if (params.category) {
    parts.push(`cat:${encodeURIComponent(params.category)}`)
  } else if (params.categories && params.categories.length > 0) {
    const categoryQuery = params.categories.map(cat => `cat:${encodeURIComponent(cat)}`).join("+OR+")
    if (categoryQuery) {
      // Only add parentheses if we have other parts
      parts.push(parts.length > 0 ? `(${categoryQuery})` : categoryQuery)
    }
  }

  // Handle date range if provided
  if (params.dateFrom || params.dateTo) {
    const dateFrom = params.dateFrom || "0000-00-00"
    const dateTo = params.dateTo || "9999-99-99"
    parts.push(`submittedDate:[${dateFrom} TO ${dateTo}]`)
  }

  return parts.join("+AND+")
}

// Main function to search arXiv
export async function searchArxiv(params: SearchParams): Promise<ArxivResponse> {
  const searchParams = new URLSearchParams()

  if (params.searchQuery) {
    searchParams.append("search_query", params.searchQuery)
  } else {
    const query = buildSearchQuery(params)
    if (query) {
      searchParams.append("search_query", query)
    }
  }

  if (params.idList) searchParams.append("id_list", params.idList)
  
  if (params.page !== undefined) {
    const start = ((params.page - 1) * (params.maxResults || 10))
    searchParams.append("start", start.toString())
  } else if (params.start !== undefined) {
    searchParams.append("start", params.start.toString())
  }
  
  if (params.maxResults !== undefined) searchParams.append("max_results", params.maxResults.toString())
  if (params.sortBy) searchParams.append("sortBy", params.sortBy)
  if (params.sortOrder) searchParams.append("sortOrder", params.sortOrder)

  // Make the API request
  const url = `${API_BASE_URL}?${searchParams.toString()}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`ArXiv API error: ${response.status} ${response.statusText}`)
    }

    const xmlData = await response.text()

    // Parse XML to JSON
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      isArray: (name) => ["entry", "author", "link", "category"].includes(name),
      removeNSPrefix: true,
    })

    const result = parser.parse(xmlData) as ArxivResponse

    // Handle case where there's only one entry
    if (result.feed.entry && !Array.isArray(result.feed.entry)) {
      result.feed.entry = [result.feed.entry]
    }

    return result
  } catch (error) {
    console.error("Error fetching from arXiv API:", error)
    throw error
  }
}

export async function getPaperById(id: string): Promise<ArxivEntry | null> {
  try {
    const response = await searchArxiv({ idList: id })

    if (Array.isArray(response.feed.entry) && response.feed.entry.length > 0) {
      return response.feed.entry[0]
    }

    return null
  } catch (error) {
    console.error(`Error fetching paper with ID ${id}:`, error)
    throw error
  }
}

export function convertArxivEntryToPaper(entry: ArxivEntry): Paper {
  const rawId = extractArxivId(entry.id);
  const formattedId = `arxiv:${rawId}`;
  
  const authorsList: Author[] = Array.isArray(entry.author) 
    ? entry.author.map((author: ArxivAuthor) => ({
        name: author.name,
        affiliation: author["arxiv:affiliation"]
      }))
    : entry.author 
      ? [{ name: entry.author.name, affiliation: entry.author["arxiv:affiliation"] }]
      : [];
  
  // Get PDF URL from links
  let pdfUrl = "";
  const links: { [key: string]: string } = {};
  
  if (entry.link) {
    const linksArray = Array.isArray(entry.link) ? entry.link : [entry.link];
    
    for (const link of linksArray) {
      if (link["@_title"] === "pdf") {
        pdfUrl = link["@_href"];
        links.pdf = link["@_href"];
      } else if (link["@_rel"] === "alternate") {
        links.html = link["@_href"];
      }
    }
  }
  
  // Get categories
  const categories = Array.isArray(entry.category)
    ? entry.category.map((cat: ArxivCategory) => cat["@_term"])
    : entry.category
      ? [entry.category["@_term"]]
      : [];
      
  // Get primary category
  const primaryCategory = entry["arxiv:primary_category"]
    ? entry["arxiv:primary_category"]["@_term"]
    : categories.length > 0
      ? categories[0]
      : undefined;
      
  // Build metadata object
  const metadata: Record<string, any> = {
    journal_ref: entry["arxiv:journal_ref"],
    doi: entry["arxiv:doi"],
    comment: entry["arxiv:comment"],
    categories: categories,
    primary_category: primaryCategory,
    version: extractVersionFromId(entry.id)
  };

  return {
    id: formattedId,
    rawId,
    providerId: "arxiv",
    title: entry.title,
    authors: authorsList,
    abstract: entry.summary,
    publishedDate: entry.published,
    lastUpdatedDate: entry.updated,
    pdfUrl: pdfUrl || `https://arxiv.org/pdf/${rawId}.pdf`,
    htmlUrl: links.html || `https://arxiv.org/abs/${rawId}`,
    categories,
    primaryCategory,
    doi: entry["arxiv:doi"],
    comments: entry["arxiv:comment"],
    journalRef: entry["arxiv:journal_ref"],
    links,
    metadata  // Add the metadata property
  };
}

// Helper function to extract version info from arXiv ID
function extractVersionFromId(id: string): string | undefined {
  const versionMatch = id.match(/v(\d+)$/);
  return versionMatch ? versionMatch[1] : undefined;
}

// Function to get latest papers
export async function getLatestPapers(category?: string, maxResults = 10): Promise<ArxivEntry[]> {
  try {
    // Create a date range for the last 7 days
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(endDate.getDate() - 7)

    // Format dates as YYYY-MM-DD
    const formatDate = (date: Date) => {
      return date.toISOString().split("T")[0]
    }

    let searchQuery = `submittedDate:[${formatDate(startDate)} TO ${formatDate(endDate)}]`

    if (category) {
      searchQuery += `+AND+cat:${category}`
    }

    const response = await searchArxiv({
      searchQuery,
      sortBy: "submittedDate",
      sortOrder: "descending",
      maxResults,
    })

    if (Array.isArray(response.feed.entry)) {
      return response.feed.entry
    }

    return response.feed.entry ? [response.feed.entry] : []
  } catch (error) {
    console.error("Error fetching latest papers:", error)
    throw error
  }
}

// Function to get papers by subject
export async function getPapersBySubject(
  subject: string,
  start = 0,
  maxResults = 10,
  sortBy: "relevance" | "lastUpdatedDate" | "submittedDate" = "submittedDate",
  sortOrder: "ascending" | "descending" = "descending"
): Promise<{
  papers: ArxivEntry[]
  total: number
  start: number
  itemsPerPage: number
}> {
  try {
    const response = await searchArxiv({
      searchQuery: `cat:${subject}`,
      sortBy,
      sortOrder,
      start,
      maxResults,
    })

    // Ensure we have valid values for totalResults, startIndex, and itemsPerPage
    const totalResults = response.feed["opensearch:totalResults"]
      ? Number.parseInt(response.feed["opensearch:totalResults"].toString())
      : 0

    const startIndex = response.feed["opensearch:startIndex"]
      ? Number.parseInt(response.feed["opensearch:startIndex"].toString())
      : 0

    const itemsPerPage = response.feed["opensearch:itemsPerPage"]
      ? Number.parseInt(response.feed["opensearch:itemsPerPage"].toString())
      : 10

    return {
      papers: Array.isArray(response.feed.entry)
        ? response.feed.entry
        : response.feed.entry
          ? [response.feed.entry]
          : [],
      total: totalResults,
      start: startIndex,
      itemsPerPage: itemsPerPage,
    }
  } catch (error) {
    console.error(`Error fetching papers for subject ${subject}:`, error)
    // Return empty result on error
    return {
      papers: [],
      total: 0,
      start: 0,
      itemsPerPage: 10,
    }
  }
}

/**
 * Extracts the arXiv ID from the full arXiv URL or identifier
 */
export function extractArxivId(id: string): string {
  // If it's a URL like http://arxiv.org/abs/2101.12345 or https://arxiv.org/abs/2101.12345v1
  if (id.includes('arxiv.org/abs/')) {
    const match = id.match(/arxiv\.org\/abs\/([^\/]+?)(?:v\d+)?$/i);
    if (match && match[1]) return match[1];
  }
  
  // If it's in the format 'http://arxiv.org/abs/category/2101.12345v1'
  if (id.includes('/abs/')) {
    const match = id.match(/\/abs\/(?:.*?\/)?([\d\.]+)(?:v\d+)?$/i);
    if (match && match[1]) return match[1];
  }

  // If it's a bare ID like 2101.12345 or 2101.12345v1
  const bareMatch = id.match(/([\d\.]+)(?:v\d+)?$/i);
  if (bareMatch && bareMatch[1]) return bareMatch[1];
  
  // If it's in the format 'arxiv:2101.12345v1'
  if (id.startsWith('arxiv:')) {
    const prefixMatch = id.match(/^arxiv:([\d\.]+)(?:v\d+)?$/i);
    if (prefixMatch && prefixMatch[1]) return prefixMatch[1];
  }
  
  // Fallback - return the original but trim any version suffix
  return id.replace(/v\d+$/, '');
}

// Helper function to format authors
export function formatAuthors(authors: ArxivAuthor[] | ArxivAuthor): string {
  if (!authors) return ""

  const authorArray = Array.isArray(authors) ? authors : [authors]
  return authorArray.map((author) => author.name).join(", ")
}

// Helper function to get PDF URL
export function getPdfUrl(links: ArxivLink[] | ArxivLink): string | null {
  if (!links) return null

  const linksArray = Array.isArray(links) ? links : [links]
  const pdfLink = linksArray.find((link) => link["@_title"] === "pdf")

  return pdfLink ? pdfLink["@_href"] : null
}

// Helper function to get DOI
export function getDoi(paper: ArxivEntry): string | null {
  return paper["arxiv:doi"] || null
}

// Function to fetch papers by one or more categories
export async function fetchArxivPapers({
  categories,
  search,
  sortBy = "submittedDate",
  sortOrder = "descending",
  page = 1,
  maxResults = 20,
  title,
  author,
  abstract,
  dateFrom,
  dateTo
}: {
  categories?: string[]
  search?: string
  sortBy?: "relevance" | "lastUpdatedDate" | "submittedDate"
  sortOrder?: "ascending" | "descending"
  page?: number
  maxResults?: number
  title?: string
  author?: string
  abstract?: string
  dateFrom?: string
  dateTo?: string
}): Promise<{
  entries: ArxivEntry[]
  totalResults: number
  startIndex: number
  itemsPerPage: number
}> {
  try {
    // Build search params
    const searchParams: SearchParams = {
      sortBy,
      sortOrder,
      start: ((page - 1) * maxResults),
      maxResults
    };

    if (search && search.trim()) searchParams.query = search;
    if (title && title.trim()) searchParams.title = title;
    if (author && author.trim()) searchParams.author = author;
    if (abstract && abstract.trim()) searchParams.abstract = abstract;
    if (categories && categories.length > 0) searchParams.categories = categories;
    if (dateFrom) searchParams.dateFrom = dateFrom;
    if (dateTo) searchParams.dateTo = dateTo;
    
    // Handle the case of a search with no other parameters
    if (!searchParams.query && !searchParams.title && !searchParams.author && 
        !searchParams.abstract && (!searchParams.categories || searchParams.categories.length === 0) &&
        !searchParams.dateFrom && !searchParams.dateTo) {
      // Default to a recent papers search
      searchParams.sortBy = "submittedDate";
      searchParams.sortOrder = "descending";
    }
    
    // Fetch from API
    const response = await searchArxiv(searchParams);
    
    // Extract entries, handling the case where there's only one entry
    const entries = Array.isArray(response.feed.entry)
      ? response.feed.entry
      : response.feed.entry
        ? [response.feed.entry]
        : [];

    // Parse metadata
    const totalResults = response.feed["opensearch:totalResults"]
      ? Number.parseInt(response.feed["opensearch:totalResults"].toString())
      : 0;
      
    const actualStartIndex = response.feed["opensearch:startIndex"]
      ? Number.parseInt(response.feed["opensearch:startIndex"].toString())
      : 0;
      
    const itemsPerPage = response.feed["opensearch:itemsPerPage"]
      ? Number.parseInt(response.feed["opensearch:itemsPerPage"].toString())
      : maxResults;
    
    return {
      entries,
      totalResults,
      startIndex: actualStartIndex,
      itemsPerPage
    };
  } catch (error) {
    console.error("Error fetching papers:", error);
    return {
      entries: [],
      totalResults: 0,
      startIndex: 0,
      itemsPerPage: maxResults
    };
  }
}

// Search papers with improved formatting
export async function searchPapers(searchQuery: SearchParams, providerId = "arxiv"): Promise<{
  papers: Paper[]
  totalResults: number
  startIndex: number
  itemsPerPage: number
  providerId: string
}> {
  try {
    if (providerId !== "arxiv") {
      throw new Error(`Provider ${providerId} not supported in this function`);
    }
    
    const result = await fetchArxivPapers({
      search: searchQuery.query,
      title: searchQuery.title,
      author: searchQuery.author,
      abstract: searchQuery.abstract,
      categories: searchQuery.category ? [searchQuery.category] : undefined,
      dateFrom: searchQuery.dateFrom,
      dateTo: searchQuery.dateTo,
      sortBy: searchQuery.sortBy || "relevance",
      sortOrder: searchQuery.sortOrder || "descending",
      page: searchQuery.page || 1,
      maxResults: searchQuery.maxResults || 20
    });
    
    // Convert to unified Paper format
    const papers = result.entries.map(convertArxivEntryToPaper);
    
    return {
      papers,
      totalResults: result.totalResults,
      startIndex: result.startIndex,
      itemsPerPage: result.itemsPerPage,
      providerId: "arxiv"
    };
  } catch (error) {
    console.error(`Error searching papers from arXiv:`, error);
    return {
      papers: [],
      totalResults: 0,
      startIndex: 0,
      itemsPerPage: 20,
      providerId: "arxiv"
    };
  }
}

// Create an ArxivProvider implementation of the PaperProvider interface
export const ArxivProvider: PaperProvider = {
  id: "arxiv",
  name: "arXiv",
  icon: "archive", // assuming this is a valid icon name in your system
  baseUrl: "https://arxiv.org",
  
  fetchPaper: async (id: string): Promise<Paper | null> => {
    try {
      // Extract the raw arXiv ID without prefixes
      const rawId = id.startsWith("arxiv:") ? id.substring(6) : id;
      const entry = await getPaperById(rawId);
      
      if (!entry) return null;
      
      return convertArxivEntryToPaper(entry);
    } catch (error) {
      console.error("Error fetching paper from arXiv:", error);
      return null;
    }
  },
  
  searchPapers: async (query: SearchQuery): Promise<SearchResult> => {
    const { 
      category, 
      author, 
      title, 
      abstract, 
      dateFrom, 
      dateTo, 
      page = 1, 
      maxResults = 20,
      sortBy = "relevance",
      sortOrder = "descending"
    } = query;
    
    try {
      const result = await fetchArxivPapers({
        categories: category ? [category] : undefined,
        author,
        title,
        abstract,
        dateFrom,
        dateTo,
        page,
        maxResults,
        sortBy: sortBy as any,
        sortOrder: sortOrder as any
      });
      
      // Convert arXiv entries to standardized Paper format
      const papers = result.entries.map(entry => convertArxivEntryToPaper(entry));
      
      return {
        papers,
        totalResults: result.totalResults,
        startIndex: result.startIndex,
        itemsPerPage: result.itemsPerPage,
        providerId: "arxiv"
      };
    } catch (error) {
      console.error("Error searching papers in arXiv:", error);
      return {
        papers: [],
        totalResults: 0,
        startIndex: 0,
        itemsPerPage: query.maxResults || 10,
        providerId: "arxiv"
      };
    }
  }
};
