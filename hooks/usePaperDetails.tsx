import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getPaperById } from '@/lib/providers/arxiv';
import { convertArxivEntryToPaper } from '@/lib/providers/converters';
import type { Paper } from '@/lib/providers/types';

export function usePaperDetails(id: string | null) {
  const [paper, setPaper] = useState<Paper | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [providerId, setProviderId] = useState<string>('');
  const [paperId, setPaperId] = useState<string>('');

  useEffect(() => {
    const fetchPaper = async () => {
      if (!id) {
        setIsLoading(false);
        setError('No paper ID provided');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // First, decode the URL to handle any URL-encoded characters
        const decodedId = decodeURIComponent(id);
        
        // Parse the provider and paper ID
        const colonIndex = decodedId.indexOf(':');
        
        if (colonIndex === -1) {
          setError('Invalid paper ID format');
          return;
        }
        
        const provider = decodedId.substring(0, colonIndex);
        const paperIdentifier = decodedId.substring(colonIndex + 1);
        
        setProviderId(provider);
        setPaperId(paperIdentifier);
        
        console.log(`Fetching paper: Provider=${provider}, ID=${paperIdentifier}`);
        
        if (provider.toLowerCase() === 'arxiv') {
          const arxivEntry = await getPaperById(paperIdentifier);
          if (arxivEntry) {
            // Convert to common Paper format
            const convertedPaper = convertArxivEntryToPaper(arxivEntry);
            setPaper(convertedPaper);
          } else {
            setError('Paper not found');
          }
        } else {
          // Handle other providers as they're implemented
          setError(`Provider ${provider} not supported yet`);
        }
      } catch (error) {
        console.error('Error fetching paper:', error);
        setError('Failed to load paper details');
        toast.error('Failed to load paper details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaper();
  }, [id]);

  return { paper, isLoading, error, providerId, paperId };
}