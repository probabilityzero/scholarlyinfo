// Define types for the bioRxiv API responses
export interface BiorxivResponse {
  collection: BiorxivPaper[]
  messages: BiorxivMessage[]
}

export interface BiorxivPaper {
  doi: string
  title: string
  authors: string
  author_corresponding: string
  author_corresponding_institution: string
  date: string
  version: string
  type: string
  license: string
  category: string
  jatsxml: string
  abstract: string
  published?: string
  server: string
}

export interface BiorxivMessage {
  status: string
  total: number
  cursor: number
  count: number
  interval?: string
}

export interface BiorxivPublishedResponse {
  collection: BiorxivPublishedPaper[]
  messages: BiorxivMessage[]
}

export interface BiorxivPublishedPaper {
  biorxiv_doi: string
  published_doi: string
  preprint_title: string
  preprint_category: string
  preprint_date: string
  published_date: string
  published_journal?: string
  preprint_authors: string
  preprint_author_corresponding?: string
  preprint_author_corresponding_institution?: string
  preprint_abstract?: string
  preprint_platform?: string
}

// Base URL for bioRxiv API
const API_BASE_URL = "https://api.biorxiv.org"

// Function to fetch details from bioRxiv
export async function getBiorxivDetails(
  server: "biorxiv" | "medrxiv" = "biorxiv",
  interval = "30d",
  cursor = 0,
): Promise<BiorxivResponse> {
  try {
    const url = `${API_BASE_URL}/details/${server}/${interval}/${cursor}/json`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`bioRxiv API error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching from bioRxiv API:", error)
    throw error
  }
}

// Function to fetch a single paper by DOI
export async function getBiorxivPaperByDoi(
  server: "biorxiv" | "medrxiv" = "biorxiv",
  doi: string,
): Promise<BiorxivResponse> {
  try {
    const url = `${API_BASE_URL}/details/${server}/${doi}/na/json`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`bioRxiv API error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching bioRxiv paper with DOI ${doi}:`, error)
    throw error
  }
}

// Function to fetch published papers
export async function getBiorxivPublished(
  server: "biorxiv" | "medrxiv" = "biorxiv",
  interval = "30d",
  cursor = 0,
): Promise<BiorxivPublishedResponse> {
  try {
    const url = `${API_BASE_URL}/pubs/${server}/${interval}/${cursor}/json`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`bioRxiv API error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching published papers from bioRxiv API:", error)
    throw error
  }
}

// Function to search bioRxiv papers
export async function searchBiorxiv(query: string, server: "biorxiv" | "medrxiv" = "biorxiv"): Promise<BiorxivPaper[]> {
  try {
    // bioRxiv doesn't have a direct search API, so we'll fetch recent papers and filter
    const response = await getBiorxivDetails(server, "365d", 0)

    // Filter papers based on query
    const lowerQuery = query.toLowerCase()
    return response.collection.filter(
      (paper) =>
        paper.title.toLowerCase().includes(lowerQuery) ||
        paper.authors.toLowerCase().includes(lowerQuery) ||
        paper.abstract.toLowerCase().includes(lowerQuery) ||
        paper.category.toLowerCase().includes(lowerQuery),
    )
  } catch (error) {
    console.error(`Error searching bioRxiv for "${query}":`, error)
    throw error
  }
}

// Function to get latest bioRxiv papers
export async function getLatestBiorxivPapers(
  server: "biorxiv" | "medrxiv" = "biorxiv",
  limit = 10,
): Promise<BiorxivPaper[]> {
  try {
    const response = await getBiorxivDetails(server, "30d", 0)
    return response.collection.slice(0, limit)
  } catch (error) {
    console.error("Error fetching latest bioRxiv papers:", error)
    throw error
  }
}

// Function to get bioRxiv papers by category
export async function getBiorxivPapersByCategory(
  category: string,
  server: "biorxiv" | "medrxiv" = "biorxiv",
): Promise<BiorxivPaper[]> {
  try {
    const response = await getBiorxivDetails(server, "365d", 0)
    return response.collection.filter((paper) => paper.category.toLowerCase() === category.toLowerCase())
  } catch (error) {
    console.error(`Error fetching bioRxiv papers for category ${category}:`, error)
    throw error
  }
}

// bioRxiv categories
export const biorxivCategories = [
  { id: "animal-behavior-and-cognition", name: "Animal Behavior and Cognition" },
  { id: "biochemistry", name: "Biochemistry" },
  { id: "bioengineering", name: "Bioengineering" },
  { id: "bioinformatics", name: "Bioinformatics" },
  { id: "biophysics", name: "Biophysics" },
  { id: "cancer-biology", name: "Cancer Biology" },
  { id: "cell-biology", name: "Cell Biology" },
  { id: "clinical-trials", name: "Clinical Trials" },
  { id: "developmental-biology", name: "Developmental Biology" },
  { id: "ecology", name: "Ecology" },
  { id: "epidemiology", name: "Epidemiology" },
  { id: "evolutionary-biology", name: "Evolutionary Biology" },
  { id: "genetics", name: "Genetics" },
  { id: "genomics", name: "Genomics" },
  { id: "immunology", name: "Immunology" },
  { id: "microbiology", name: "Microbiology" },
  { id: "molecular-biology", name: "Molecular Biology" },
  { id: "neuroscience", name: "Neuroscience" },
  { id: "paleontology", name: "Paleontology" },
  { id: "pathology", name: "Pathology" },
  { id: "pharmacology-and-toxicology", name: "Pharmacology and Toxicology" },
  { id: "physiology", name: "Physiology" },
  { id: "plant-biology", name: "Plant Biology" },
  { id: "scientific-communication-and-education", name: "Scientific Communication and Education" },
  { id: "synthetic-biology", name: "Synthetic Biology" },
  { id: "systems-biology", name: "Systems Biology" },
  { id: "zoology", name: "Zoology" },
]

