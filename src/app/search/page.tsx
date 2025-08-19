'use client';

import SearchBar from '@/components/search-bar';
import SearchResults from '@/components/search-results';
import { useRepositoriesSearchQuery } from '@/graphql/codegen/hooks';
import { Repository } from '@/graphql/codegen/schema';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function SearchPageComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get('query') || '';

  const { data, loading, error } = useRepositoriesSearchQuery({
    variables: { query: `user:${queryParam}`, numberRepositories: 20 },
    skip: queryParam.trim() === '',
  });

  const repositories = (data?.search.edges
    ?.map((edge) => edge?.node)
    .filter((node) => node !== null && node !== undefined && node.__typename === 'Repository') ??
    []) as Repository[];
  const totalCount = data?.search.repositoryCount ?? 0;

  const handleSearch = async (query: string) => {
    const params = new URLSearchParams({ query });
    router.replace(`/search?${params.toString()}`);
  };

  useEffect(() => {
    if (error) {
      toast.error('Sorry, something went wrong. Please try again.');
    }
  }, [error]);

  return (
    <div className="bg-background">
      <div className="p-6 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-4">
          <SearchBar
            initialValue={queryParam}
            size="sm"
            isLoading={loading}
            onEnter={handleSearch}
          />
          <span className="text-sm text-muted-foreground">
            {repositories.length} of {totalCount} results
          </span>
        </div>
      </div>
      <SearchResults repositories={repositories} isLoading={loading} />
    </div>
  );
}
