// Paper provider interface definition
export interface PaperProvider {
  id: string;
  name: string;
  baseUrl: string;
  icon?: string;
  fetchPaper(id: string): Promise<Paper | null>;
  searchPapers(query: SearchQuery): Promise<SearchResult>;
}

// Identifier interface
export interface Identifier {
  type: string;
  value: string;
}

// Paper model
export interface Paper {
  id: string;
  rawId: string;
  providerId: string;
  title: string;
  authors: Author[];
  abstract: string;
  publishedDate: string;
  lastUpdatedDate?: string;
  pdfUrl: string;
  htmlUrl?: string;
  categories?: string[];
  primaryCategory?: string;
  doi?: string;
  comments?: string;
  journalRef?: string;
  links?: Record<string, string>;
  metadata: {
    identifiers?: Identifier[];
    [key: string]: any;
  };
}

// Author model
export interface Author {
  name: string;
  affiliation?: string;
  email?: string;
  orcid?: string;
}

// Search parameters
export interface SearchQuery {
  query?: string;
  title?: string;
  author?: string;
  abstract?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: "relevance" | "lastUpdatedDate" | "submittedDate";
  sortOrder?: "ascending" | "descending";
  page?: number;
  maxResults?: number;
}

// Search results
export interface SearchResult {
  papers: Paper[];
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
  providerId: string;
}