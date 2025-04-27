/**
 * Academic Paper Identifiers Library
 * 
 * A comprehensive utility for extracting, validating, normalizing, and generating
 * URLs for various academic and research paper identifiers including DOIs, arXiv IDs,
 * PubMed IDs, and specialized repository identifiers.
 * 
 * This library handles different formats and variations of identifiers, extracting
 * them from text or URLs and converting them to standardized formats.
 */

export enum IdentifierType {
  // Core academic identifiers
  ARXIV = "arxiv",
  DOI = "doi",
  PMID = "pmid",
  PMCID = "pmcid",
  ISBN = "isbn",
  ISSN = "issn",
  ORCID = "orcid",
  
  // Repository and index identifiers
  SEMANTIC_SCHOLAR = "semanticscholar",
  DBLP = "dblp",
  WOS = "wos", // Web of Science
  SCOPUS = "scopus",
  ACL = "acl", // Association for Computational Linguistics
  MAG = "mag", // Microsoft Academic Graph
  
  // Preprint server identifiers
  BIORXIV = "biorxiv",
  MEDRXIV = "medrxiv",
  CHEMRXIV = "chemrxiv",
  EARTHARXIV = "eartharxiv",
  SOCARXIV = "socarxiv",
  PSYARXIV = "psyarxiv",
  LAWARXIV = "lawarxiv",
  PREPRINTS = "preprints", // Preprints.org
  
  // Other academic repositories
  REPEC = "repec", // Research Papers in Economics
  SSRN = "ssrn", // Social Science Research Network
  PHILPAPERS = "philpapers",
  HAL = "hal", // French Open Archive
  OPENAIRE = "openaire",
  ZENODO = "zenodo",
  FIGSHARE = "figshare",
  ETHOS = "ethos", // UK PhD Theses
  CORE = "core", // Open Access Aggregator
}

/**
 * Interface for a normalized identifier 
 */
export interface NormalizedIdentifier {
  type: IdentifierType;
  value: string;
  url: string;
  prefix: string;
  originalValue: string;
}

/**
 * Regular expressions for extracting and validating different identifier types
 */
const IDENTIFIER_PATTERNS = {
  // ArXiv patterns for different formats:
  // New format: 1707.08567v1 or arXiv:1707.08567v1 
  // Old format: math/0309136v1 or arXiv:math/0309136v1
  // Also handles URLs like https://arxiv.org/abs/1707.08567v1
  [IdentifierType.ARXIV]: [
    // Full URL with /abs/ or /pdf/
    /(?:arxiv\.org\/(?:abs|pdf)\/)((?:\d{4}\.\d{4,5}(?:v\d+)?)|(?:[a-zA-Z-]+(?:\/|\.)\d{7}(?:v\d+)?))/i,
    
    // With arxiv: prefix
    /arxiv:([^\/\s]+)/i,
    
    // New format bare ID: YYMM.NNNNN(vN)
    /^(\d{4}\.\d{4,5}(?:v\d+)?)$/i,
    
    // Old format bare ID: category/NNNNNNN(vN)
    /^([a-zA-Z-]+(?:\/|\.)\d{7}(?:v\d+)?)$/i
  ],
  
  // DOI patterns: 10.NNNN/anything
  [IdentifierType.DOI]: [
    // Full URL
    /(?:doi\.org\/|dx\.doi\.org\/)(10\.\d{4,}\/[^\/\s]+)/i,
    
    // With doi: prefix
    /doi:(10\.\d{4,}\/[^\/\s]+)/i,
    
    // Bare DOI
    /^(10\.\d{4,}\/[^\/\s]+)$/i
  ],
  
  // PMID patterns: PMID:NNNNNNNN or PMID NNNNNNNN
  [IdentifierType.PMID]: [
    // With PMID: prefix or URL
    /(?:ncbi\.nlm\.nih\.gov\/pubmed\/|PMID:?\s*)(\d+)/i,
    
    // Bare PMID (just digits)
    /^(\d{1,8})$/i
  ],
  
  // PMCID patterns: PMC followed by digits
  [IdentifierType.PMCID]: [
    // With PMC prefix or URL
    /(?:ncbi\.nlm\.nih\.gov\/pmc\/articles\/|PMC:?\s*)(\d+)/i,
    
    // Bare PMC ID
    /^PMC(\d+)$/i
  ],
  
  // ISBN patterns: ISBN followed by 10 or 13 digits, may include hyphens
  [IdentifierType.ISBN]: [
    // ISBN-13: 978-3-16-148410-0 or ISBN-10: 3-16-148410-X
    /(?:ISBN(?:-(?:10|13))?:?\s*)((?:\d[\d-]*\d|\d)(?:[xX])?)/i,
    
    // Bare ISBN 
    /^((?:\d[\d-]*\d|\d)(?:[xX])?)$/i
  ],
  
  // ISSN patterns: ISSN followed by 8 digits with hyphen
  [IdentifierType.ISSN]: [
    // With ISSN prefix
    /(?:ISSN:?\s*)(\d{4}-\d{3}[\dxX])/i,
    
    // Bare ISSN
    /^(\d{4}-\d{3}[\dxX])$/i
  ],
  
  // ORCID patterns: 16-digit identifier with hyphens
  [IdentifierType.ORCID]: [
    // Full URL
    /orcid\.org\/(\d{4}-\d{4}-\d{4}-\d{3}[\dX])/i,
    
    // With ORCID: prefix
    /ORCID:(\d{4}-\d{4}-\d{4}-\d{3}[\dX])/i,
    
    // Bare ORCID
    /^(\d{4}-\d{4}-\d{4}-\d{3}[\dX])$/i
  ],
  
  // Semantic Scholar ID patterns
  [IdentifierType.SEMANTIC_SCHOLAR]: [
    // URL format
    /semanticscholar\.org\/paper\/([a-f0-9]+)/i,
    
    // With prefix
    /(?:Semantic Scholar ID:|S2:)([a-f0-9]+)/i,
    
    // Bare ID (alphanumeric hash)
    /^([a-f0-9]{8,})$/i
  ],
  
  // DBLP patterns
  [IdentifierType.DBLP]: [
    // URL format
    /dblp\.org\/(?:rec|pid)\/([^\/\s]+\/[^\/\s]+)/i,
    
    // With prefix
    /dblp:([^\/\s]+\/[^\/\s]+)/i
  ],
  
  // Web of Science ID patterns
  [IdentifierType.WOS]: [
    // With WOS prefix
    /WOS:(\d{15,})/i,
    
    // Bare format (all digits)
    /^(\d{15,})$/i
  ],
  
  // Scopus ID patterns
  [IdentifierType.SCOPUS]: [
    // With Scopus prefix
    /SCOPUS-ID:([\d\.-]+)/i,
    
    // Scopus 2-s2.0 format
    /SCOPUS-ID:(2-s2\.0-[\d]+)/i
  ],
  
  // ACL patterns (Computational Linguistics)
  [IdentifierType.ACL]: [
    // Typical format: P19-1012, D19-5309, etc.
    /ACL:([A-Z]\d{2}-\d{4})/i,
    
    // Bare format 
    /^([A-Z]\d{2}-\d{4})$/i
  ],
  
  // Microsoft Academic Graph
  [IdentifierType.MAG]: [
    // With MAG prefix
    /MAG:(\d{7,})/i,
    
    // Bare format (all digits)
    /^(\d{7,})$/i
  ],
  
  // bioRxiv patterns
  [IdentifierType.BIORXIV]: [
    // URL format
    /biorxiv\.org\/content\/([^\/\s]+)/i,
    
    // With prefix
    /bioRxiv:(\d{4}\.\d{2}\.\d{2}\.\d+)/i,
    
    // Bare format YYYY.MM.DD.NNNNN
    /^(\d{4}\.\d{2}\.\d{2}\.\d+)$/i
  ],
  
  // medRxiv patterns
  [IdentifierType.MEDRXIV]: [
    // URL format
    /medrxiv\.org\/content\/([^\/\s]+)/i,
    
    // With prefix
    /medRxiv:(\d{4}\.\d{2}\.\d{2}\.\d+)/i,
    
    // Bare format YYYY.MM.DD.NNNNN
    /^(\d{4}\.\d{2}\.\d{2}\.\d+)$/i
  ],
  
  // ChemRxiv patterns
  [IdentifierType.CHEMRXIV]: [
    // With prefix
    /ChemRxiv:(\d{4}\.\d{2}\.\d{2}\.\d+)/i,
    
    // URL format
    /chemrxiv\.org\/(?:engage\/)?(?:chemrxiv|api-gateway)\/(?:content|download)\/([^\/\s]+)/i,
    
    // Bare format YYYY.MM.DD.NNNNN or identifier
    /^(\d{4}\.\d{2}\.\d{2}\.\d+)$/i
  ],
  
  // EarthArXiv patterns
  [IdentifierType.EARTHARXIV]: [
    // With prefix
    /EarthArXiv:(\d{4}\.\d{2}\.\d{2}\.\d+)/i,
    
    // URL format
    /eartharxiv\.org\/(?:repository\/view\/|paper\/)([^\/\s]+)/i
  ],
  
  // SocArXiv patterns
  [IdentifierType.SOCARXIV]: [
    // With prefix
    /SocArXiv:(\d{4}\.\d{2}\.\d{2}\.\d+)/i,
    
    // URL format
    /osf\.io\/preprints\/socarxiv\/([^\/\s]+)/i
  ],
  
  // PsyArXiv patterns
  [IdentifierType.PSYARXIV]: [
    // With prefix
    /PsyArXiv:(\d{4}\.\d{2}\.\d{2}\.\d+)/i,
    
    // URL format
    /psyarxiv\.com\/([^\/\s]+)/i
  ],
  
  // LawArXiv patterns
  [IdentifierType.LAWARXIV]: [
    // With prefix
    /LawArXiv:(\d{4}\.\d{2}\.\d{2}\.\d+)/i,
    
    // URL format
    /osf\.io\/preprints\/lawarxiv\/([^\/\s]+)/i
  ],
  
  // Preprints.org patterns
  [IdentifierType.PREPRINTS]: [
    // With prefix
    /Preprints:(\d{4}-\d{5,})/i,
    
    // URL format
    /preprints\.org\/manuscript\/(\d{4}\d{5,})/i
  ],
  
  // RePEc (Research Papers in Economics) patterns
  [IdentifierType.REPEC]: [
    // With prefix
    /RePEc:([^:]+:[^:]+:.+)/i,
    
    // URL format
    /ideas\.repec\.org\/[a-z]\/([^\/]+\/[^\.]+\.html)/i
  ],
  
  // SSRN (Social Science Research Network) patterns
  [IdentifierType.SSRN]: [
    // With prefix
    /SSRN:(\d{5,})/i,
    
    // URL format
    /papers\.ssrn\.com\/sol3\/papers\.cfm\?abstract_id=(\d+)/i,
    
    // Bare format (all digits)
    /^(\d{7,})$/i
  ],
  
  // PhilPapers patterns
  [IdentifierType.PHILPAPERS]: [
    // With prefix
    /PhilPapers:([A-Z]+-\d{4}-\d{5})/i,
    
    // URL format
    /philpapers\.org\/rec\/([^\/\s]+)/i
  ],
  
  // HAL Archive patterns (French Research)
  [IdentifierType.HAL]: [
    // With prefix
    /HAL:hal-(\d{7,})/i,
    
    // URL format
    /hal\.(?:science|archives-ouvertes)\.fr\/hal-(\d{7,})/i
  ],
  
  // OpenAIRE patterns
  [IdentifierType.OPENAIRE]: [
    // With prefix
    /OpenAIRE:(\d+\/[a-zA-Z0-9]+)/i,
    
    // URL format
    /explore\.openaire\.eu\/search\/publication\?articleId=([^&]+)/i
  ],
  
  // Zenodo patterns
  [IdentifierType.ZENODO]: [
    // With prefix
    /Zenodo:(\d+)/i,
    
    // URL format
    /zenodo\.org\/(?:record|badge\/latestdoi|records)\/(\d+)/i,
    
    // DOI format
    /10\.5281\/zenodo\.(\d+)/i
  ],
  
  // Figshare patterns
  [IdentifierType.FIGSHARE]: [
    // With prefix
    /Figshare:(10\.6084\/m9\.figshare\.[^\/\s]+)/i,
    
    // URL format
    /figshare\.com\/articles\/[^\/]+\/(\d+)/i
  ],
  
  // EThOS (UK PhD Theses) patterns
  [IdentifierType.ETHOS]: [
    // With prefix
    /EThOS:uk\.bl\.ethos\.(\d+)/i,
    
    // URL format
    /ethos\.bl\.uk\/OrderDetails\.do\?uin=(\d+)/i
  ],
  
  // CORE (Open Access Aggregator) patterns
  [IdentifierType.CORE]: [
    // With prefix
    /CORE:(\d+)/i,
    
    // URL format
    /core\.ac\.uk\/(?:display|download|reader)\/(\d+)/i
  ]
};

/**
 * Identifier prefixes for uniform formatting
 */
const IDENTIFIER_PREFIXES = {
  [IdentifierType.ARXIV]: "arXiv:",
  [IdentifierType.DOI]: "doi:",
  [IdentifierType.PMID]: "PMID:",
  [IdentifierType.PMCID]: "PMC",
  [IdentifierType.ISBN]: "ISBN:",
  [IdentifierType.ISSN]: "ISSN:",
  [IdentifierType.ORCID]: "ORCID:",
  [IdentifierType.SEMANTIC_SCHOLAR]: "S2:",
  [IdentifierType.DBLP]: "dblp:",
  [IdentifierType.WOS]: "WOS:",
  [IdentifierType.SCOPUS]: "SCOPUS-ID:",
  [IdentifierType.ACL]: "ACL:",
  [IdentifierType.MAG]: "MAG:",
  [IdentifierType.BIORXIV]: "bioRxiv:",
  [IdentifierType.MEDRXIV]: "medRxiv:",
  [IdentifierType.CHEMRXIV]: "ChemRxiv:",
  [IdentifierType.EARTHARXIV]: "EarthArXiv:",
  [IdentifierType.SOCARXIV]: "SocArXiv:",
  [IdentifierType.PSYARXIV]: "PsyArXiv:",
  [IdentifierType.LAWARXIV]: "LawArXiv:",
  [IdentifierType.PREPRINTS]: "Preprints:",
  [IdentifierType.REPEC]: "RePEc:",
  [IdentifierType.SSRN]: "SSRN:",
  [IdentifierType.PHILPAPERS]: "PhilPapers:",
  [IdentifierType.HAL]: "HAL:hal-",
  [IdentifierType.OPENAIRE]: "OpenAIRE:",
  [IdentifierType.ZENODO]: "Zenodo:",
  [IdentifierType.FIGSHARE]: "Figshare:",
  [IdentifierType.ETHOS]: "EThOS:uk.bl.ethos.",
  [IdentifierType.CORE]: "CORE:"
};

/**
 * Base URLs for constructing links to different identifier types
 */
const IDENTIFIER_URLS = {
  [IdentifierType.ARXIV]: "https://arxiv.org/abs/",
  [IdentifierType.DOI]: "https://doi.org/",
  [IdentifierType.PMID]: "https://pubmed.ncbi.nlm.nih.gov/",
  [IdentifierType.PMCID]: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC",
  [IdentifierType.ISBN]: "https://isbnsearch.org/isbn/",
  [IdentifierType.ISSN]: "https://portal.issn.org/resource/ISSN/",
  [IdentifierType.ORCID]: "https://orcid.org/",
  [IdentifierType.SEMANTIC_SCHOLAR]: "https://www.semanticscholar.org/paper/",
  [IdentifierType.DBLP]: "https://dblp.org/rec/",
  [IdentifierType.WOS]: "https://www.webofscience.com/wos/woscc/full-record/WOS:",
  [IdentifierType.SCOPUS]: "https://www.scopus.com/record/display.uri?eid=2-s2.0-",
  [IdentifierType.ACL]: "https://aclanthology.org/",
  [IdentifierType.MAG]: "https://academic.microsoft.com/paper/",
  [IdentifierType.BIORXIV]: "https://www.biorxiv.org/content/10.1101/",
  [IdentifierType.MEDRXIV]: "https://www.medrxiv.org/content/10.1101/",
  [IdentifierType.CHEMRXIV]: "https://chemrxiv.org/engage/chemrxiv/article-details/",
  [IdentifierType.EARTHARXIV]: "https://eartharxiv.org/repository/view/",
  [IdentifierType.SOCARXIV]: "https://osf.io/preprints/socarxiv/",
  [IdentifierType.PSYARXIV]: "https://psyarxiv.com/",
  [IdentifierType.LAWARXIV]: "https://osf.io/preprints/lawarxiv/",
  [IdentifierType.PREPRINTS]: "https://www.preprints.org/manuscript/",
  [IdentifierType.REPEC]: "https://ideas.repec.org/p/",
  [IdentifierType.SSRN]: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=",
  [IdentifierType.PHILPAPERS]: "https://philpapers.org/rec/",
  [IdentifierType.HAL]: "https://hal.science/hal-",
  [IdentifierType.OPENAIRE]: "https://explore.openaire.eu/search/publication?articleId=",
  [IdentifierType.ZENODO]: "https://zenodo.org/record/",
  [IdentifierType.FIGSHARE]: "https://doi.org/10.6084/m9.figshare.",
  [IdentifierType.ETHOS]: "https://ethos.bl.uk/OrderDetails.do?uin=",
  [IdentifierType.CORE]: "https://core.ac.uk/display/"
};

/**
 * Extract an arXiv ID from a string (URL, prefixed ID, or bare ID)
 * @param id The string containing an arXiv ID
 * @returns The extracted arXiv ID or null if not found
 */
export function extractArxivId(id: string): string | null {
  if (!id) return null;
  
  // Try each pattern for arXiv
  for (const pattern of IDENTIFIER_PATTERNS[IdentifierType.ARXIV]) {
    const match = id.match(pattern);
    if (match && match[1]) {
      // Remove version suffix for consistency if present
      return match[1].replace(/v\d+$/, '');
    }
  }
  
  return null;
}

/**
 * Extract a DOI from a string (URL, prefixed ID, or bare ID)
 * @param id The string containing a DOI
 * @returns The extracted DOI or null if not found
 */
export function extractDoi(id: string): string | null {
  if (!id) return null;
  
  for (const pattern of IDENTIFIER_PATTERNS[IdentifierType.DOI]) {
    const match = id.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

/**
 * Extract a PMID from a string (URL, prefixed ID, or bare ID)
 * @param id The string containing a PMID
 * @returns The extracted PMID or null if not found
 */
export function extractPmid(id: string): string | null {
  if (!id) return null;
  
  for (const pattern of IDENTIFIER_PATTERNS[IdentifierType.PMID]) {
    const match = id.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

/**
 * Extract any academic identifier from a string and normalize it
 * @param text String that may contain an academic identifier
 * @returns A normalized identifier object or simplified type+value object
 */
export function extractIdentifier(text: string): NormalizedIdentifier | { type: IdentifierType; value: string } | null {
  if (!text || typeof text !== 'string') return null;
  
  const cleanText = text.trim();
  
  // Quick check for common patterns first for better performance
  
  // Handle arxiv:1234.5678 format
  if (cleanText.startsWith('arxiv:')) {
    const value = cleanText.substring(6).replace(/v\d+$/, ''); // Remove version
    
    // Return the full normalized format
    return {
      type: IdentifierType.ARXIV,
      value: value,
      url: IDENTIFIER_URLS[IdentifierType.ARXIV] + value,
      prefix: IDENTIFIER_PREFIXES[IdentifierType.ARXIV],
      originalValue: cleanText.substring(6)
    };
  }
  
  // Handle raw 1234.5678 format (modern arXiv ID)
  if (/^\d{4}\.\d{4,5}(?:v\d+)?$/.test(cleanText)) {
    const value = cleanText.replace(/v\d+$/, ''); // Remove version
    
    return {
      type: IdentifierType.ARXIV,
      value: value,
      url: IDENTIFIER_URLS[IdentifierType.ARXIV] + value,
      prefix: IDENTIFIER_PREFIXES[IdentifierType.ARXIV],
      originalValue: cleanText
    };
  }
  
  // Handle old arXiv format like cond-mat/0123456
  if (/^[a-z-]+(?:\/|\\)\d{7}(?:v\d+)?$/.test(cleanText)) {
    const value = cleanText.replace(/v\d+$/, ''); // Remove version
    
    return {
      type: IdentifierType.ARXIV,
      value: value,
      url: IDENTIFIER_URLS[IdentifierType.ARXIV] + value,
      prefix: IDENTIFIER_PREFIXES[IdentifierType.ARXIV],
      originalValue: cleanText
    };
  }
  
  // Try to match DOI
  const doiMatch = cleanText.match(/^(?:doi:)?(10\.\d{4,}(?:\.\d+)*\/\S+)$/i);
  if (doiMatch) {
    const value = doiMatch[1];
    
    return {
      type: IdentifierType.DOI,
      value: value,
      url: IDENTIFIER_URLS[IdentifierType.DOI] + value,
      prefix: IDENTIFIER_PREFIXES[IdentifierType.DOI],
      originalValue: cleanText
    };
  }
  
  // Try each identifier type (comprehensive approach)
  for (const type of Object.values(IdentifierType)) {
    const patterns = IDENTIFIER_PATTERNS[type];
    
    for (const pattern of patterns) {
      const match = cleanText.match(pattern);
      if (match && match[1]) {
        // Normalize the identifier based on type-specific rules
        let normalizedValue = match[1];
        
        // Special normalization for different identifier types
        if (type === IdentifierType.ARXIV) {
          // Remove version suffix for arXiv
          normalizedValue = normalizedValue.replace(/v\d+$/, '');
        } else if (type === IdentifierType.ISBN) {
          // Remove hyphens for ISBN
          normalizedValue = normalizedValue.replace(/-/g, '');
        }
        
        return {
          type,
          value: normalizedValue,
          url: IDENTIFIER_URLS[type] + normalizedValue,
          prefix: IDENTIFIER_PREFIXES[type],
          originalValue: match[1]
        };
      }
    }
  }
  
  return null;
}

/**
 * Validate if a string is a properly formatted arXiv ID
 * @param id The string to check
 * @returns True if the string is a valid arXiv ID
 */
export function isValidArxivId(id: string): boolean {
  return !!extractArxivId(id);
}

/**
 * Validate if a string is a properly formatted DOI
 * @param id The string to check
 * @returns True if the string is a valid DOI
 */
export function isValidDoi(id: string): boolean {
  return !!extractDoi(id);
}

/**
 * Generate an arXiv URL from an ID
 * @param id arXiv ID (with or without version)
 * @returns Full URL to the arXiv abstract page
 */
export function getArxivUrl(id: string): string | null {
  const extractedId = extractArxivId(id);
  return extractedId ? `${IDENTIFIER_URLS[IdentifierType.ARXIV]}${extractedId}` : null;
}

/**
 * Generate an arXiv PDF URL from an ID
 * @param id arXiv ID (with or without version)
 * @returns Full URL to the arXiv PDF
 */
export function getArxivPdfUrl(id: string): string | null {
  const extractedId = extractArxivId(id);
  return extractedId ? `https://arxiv.org/pdf/${extractedId}.pdf` : null;
}

/**
 * Get a DOI URL from a DOI
 * @param doi The DOI (with or without prefix)
 * @returns Full DOI URL
 */
export function getDoiUrl(doi: string): string | null {
  const extractedDoi = extractDoi(doi);
  return extractedDoi ? `${IDENTIFIER_URLS[IdentifierType.DOI]}${extractedDoi}` : null;
}

/**
 * Format an identifier with its proper prefix for display or API use
 * @param type The type of identifier
 * @param id The raw identifier value
 * @returns Formatted ID with proper prefix
 */
export function formatIdentifier(type: string | IdentifierType, value: string): string {
  if (!value) return '';
  
  // Clean the value
  const cleanValue = value.trim().replace(/^(arxiv:|doi:|http:\/\/|https:\/\/)/, '');
  
  const typeStr = typeof type === 'string' ? type.toLowerCase() : 
  (type as string).toLowerCase();
  
  switch(typeStr) {
    case IdentifierType.ARXIV:
      // Handle special cases for arXiv
      if (cleanValue.includes('arxiv.org/')) {
        return cleanValue; // Already a URL
      }
      
      // Format as URL
      return `http://arxiv.org/abs/${cleanValue}`;
      
    case IdentifierType.DOI:
      // Format DOI as URL
      if (cleanValue.includes('doi.org/')) {
        return cleanValue; // Already a URL
      }
      return `https://doi.org/${cleanValue}`;
      
    // Handle other specific provider types
    case IdentifierType.BIORXIV:
      return `https://www.biorxiv.org/content/10.1101/${cleanValue}`;
      
    case IdentifierType.MEDRXIV:
      return `https://www.medrxiv.org/content/10.1101/${cleanValue}`;
      
    // Default: try to use URL template if available
    default:
      // @ts-ignore - Handling various string types
      const urlTemplate = IDENTIFIER_URLS[typeStr];
      if (urlTemplate) {
        return `${urlTemplate}${cleanValue}`;
      }
      return cleanValue; // Fallback to raw value
  }
}

/**
 * Format an arXiv ID for display
 * @param id Raw arXiv ID
 * @returns Formatted ID with proper prefix
 */
export function formatArxivId(id: string): string {
  const extractedId = extractArxivId(id);
  return extractedId ? formatIdentifier(IdentifierType.ARXIV, extractedId) : id;
}

/**
 * Format a DOI for display
 * @param doi Raw DOI
 * @returns Formatted DOI with proper prefix
 */
export function formatDoi(doi: string): string {
  const extractedDoi = extractDoi(doi);
  return extractedDoi ? formatIdentifier(IdentifierType.DOI, extractedDoi) : doi;
}

/**
 * Get URL for any identifier
 * @param type Identifier type
 * @param id The identifier value
 * @returns URL for the identifier or null if invalid
 */
export function getUrlForIdentifier(type: IdentifierType, id: string): string | null {
  if (!id) return null;
  
  // Check if this identifier type has a URL template
  if (!IDENTIFIER_URLS[type]) return null;
  
  // Special handling for certain identifier types
  switch (type) {
    case IdentifierType.ARXIV:
      return getArxivUrl(id);
      
    case IdentifierType.DOI:
      return getDoiUrl(id);
      
    case IdentifierType.FIGSHARE:
      // Figshare needs special handling for the URL
      if (id.startsWith('10.6084/m9.figshare.')) {
        // It's already in DOI format
        return `https://doi.org/${id}`;
      } else {
        // It's just the numeric part
        return `${IDENTIFIER_URLS[type]}${id}`;
      }
      
    default:
      // For most identifiers, just append to the base URL
      return `${IDENTIFIER_URLS[type]}${id}`;
  }
}

/**
 * Get all possible identifiers from a paper object
 * @param paper Paper object that may contain various identifiers
 * @returns Array of normalized identifiers
 */
export function extractAllIdentifiers(paper: any): NormalizedIdentifier[] {
  const identifiers: NormalizedIdentifier[] = [];
  
  if (!paper) return identifiers;
  
  // Helper to add an identifier if it's valid and not a duplicate
  const addIdentifier = (type: IdentifierType, value: string, originalValue: string) => {
    // Skip falsy values
    if (!value) return;
    
    // Don't add duplicates of the same type
    if (identifiers.some(id => id.type === type && id.value === value)) return;
    
    const url = getUrlForIdentifier(type, value);
    if (url) {
      identifiers.push({
        type,
        value,
        url,
        prefix: IDENTIFIER_PREFIXES[type],
        originalValue: originalValue || value
      });
    }
  };
  
  // Check for arXiv ID
  if (paper.id) {
    const arxivId = extractArxivId(paper.id);
    if (arxivId) {
      addIdentifier(IdentifierType.ARXIV, arxivId, paper.id);
    }
  }
  
  // Check for DOI
  if (paper["arxiv:doi"]) {
    const doi = extractDoi(paper["arxiv:doi"]);
    if (doi) {
      addIdentifier(IdentifierType.DOI, doi, paper["arxiv:doi"]);
    }
  }
  
  // Check for journal reference which might contain DOI or other identifiers
  if (paper["arxiv:journal_ref"]) {
    const identifierResult = extractIdentifier(paper["arxiv:journal_ref"]);
    if (identifierResult) {
      // Check if this is a normalized identifier or simplified one
      const originalVal = 'originalValue' in identifierResult ? 
        identifierResult.originalValue : paper["arxiv:journal_ref"];
      addIdentifier(identifierResult.type, identifierResult.value, originalVal);
    }
  }
  
  // Check for comments that might contain identifiers
  if (paper["arxiv:comment"]) {
    const identifierResult = extractIdentifier(paper["arxiv:comment"]);
    if (identifierResult) {
      // Check if this is a normalized identifier or simplified one
      const originalVal = 'originalValue' in identifierResult ? 
        identifierResult.originalValue : paper["arxiv:comment"];
      addIdentifier(identifierResult.type, identifierResult.value, originalVal);
    }
  }
  
  // Check links for PDF URLs or other identifiers
  if (paper.link) {
    const links = Array.isArray(paper.link) ? paper.link : [paper.link];
    for (const link of links) {
      if (link["@_href"]) {
        const identifierResult = extractIdentifier(link["@_href"]);
        if (identifierResult) {
          // Check if this is a normalized identifier or simplified one
          const originalVal = 'originalValue' in identifierResult ? 
            identifierResult.originalValue : link["@_href"];
          addIdentifier(identifierResult.type, identifierResult.value, originalVal);
        }
      }
    }
  }
  
  // Additional fields that might contain identifiers
  const fieldsToCheck = [
    'title', 'summary', 'citation', 'identifier', 'report_no', 
    'journal_ref', 'description', 'abstract'
  ];
  
  for (const field of fieldsToCheck) {
    if (paper[field] && typeof paper[field] === 'string') {
      const identifierResult = extractIdentifier(paper[field]);
      if (identifierResult) {
        // Check if this is a normalized identifier or simplified one
        const originalVal = 'originalValue' in identifierResult ? 
          identifierResult.originalValue : paper[field];
        addIdentifier(identifierResult.type, identifierResult.value, originalVal);
      }
    }
  }
  
  return identifiers;
}

/**
 * Get a formatted citation for a paper using its identifier
 * @param type Identifier type
 * @param id The identifier value
 * @returns A formatted citation string or null if the identifier is invalid
 */
export function getFormattedCitation(type: IdentifierType, id: string): string | null {
  // Validate and normalize the identifier
  let normalizedId: string | null = null;
  
  switch (type) {
    case IdentifierType.ARXIV:
      normalizedId = extractArxivId(id);
      if (normalizedId) {
        return formatIdentifier(IdentifierType.ARXIV, normalizedId);
      }
      break;
      
    case IdentifierType.DOI:
      normalizedId = extractDoi(id);
      if (normalizedId) {
        return formatIdentifier(IdentifierType.DOI, normalizedId);
      }
      break;
      
    default:
      // For other identifier types, just format with the prefix
      return formatIdentifier(type, id);
  }
  
  return null;
}

/**
 * Get a list of all supported identifier types
 * @returns Array of all identifier types supported by this library
 */
export function getSupportedIdentifierTypes(): IdentifierType[] {
  return Object.values(IdentifierType);
}

/**
 * Get information about a specific identifier type
 * @param type The identifier type
 * @returns Object containing prefix and URL format
 */
export function getIdentifierInfo(type: IdentifierType): { prefix: string, urlFormat: string } {
  return {
    prefix: IDENTIFIER_PREFIXES[type] || '',
    urlFormat: IDENTIFIER_URLS[type] || ''
  };
}

export default {
  // Main extraction functions
  extractArxivId,
  extractDoi,
  extractPmid,
  extractIdentifier,
  extractAllIdentifiers,
  
  // Validation functions
  isValidArxivId,
  isValidDoi,
  
  // URL generation
  getArxivUrl,
  getArxivPdfUrl,
  getDoiUrl,
  getUrlForIdentifier,
  
  // Formatting
  formatArxivId,
  formatDoi,
  formatIdentifier,
  getFormattedCitation,
  
  // Metadata
  getSupportedIdentifierTypes,
  getIdentifierInfo,
  
  // Types
  IdentifierType
};