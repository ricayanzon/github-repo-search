'use client';

import Filters from '@/components/filters';
import SearchBar from '@/components/search-bar';
import SearchResults from '@/components/search-results';
import { Button } from '@/components/ui/button';
import { FragmentType, useFragment } from '@/graphql/codegen';
import { RepositoryFragment } from '@/graphql/fragments/repository';
import { allRepositoriesSearchQueryDocument } from '@/graphql/queries/all-repositories-search';
import { useQuery } from '@apollo/client';
import { ArrowDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const username = searchParams.get('username') || '';
  const language = searchParams.get('language') || '';
  const repositoryName = searchParams.get('repositoryName') || '';
  const pageSize = 20;

  const { data, loading, error, fetchMore } = useQuery(allRepositoriesSearchQueryDocument, {
    variables: {
      query: `user:${username} language:${language} repo:${username}/${repositoryName}`,
      first: pageSize,
      after: null,
    },
    skip: username.trim() === '',
  });

  /**
   * Extract repositories from query result and remove null/undefined
   */
  const repositoriesQueryResult = data?.search.edges
    ?.map((edge) => edge?.node)
    .filter((node) => node !== null && node !== undefined && node.__typename === 'Repository');
  const repositories = useFragment(
    RepositoryFragment,
    repositoriesQueryResult as FragmentType<typeof RepositoryFragment>[],
  );
  const filteredRepositories = repositories?.filter((repository) =>
    repository.name.includes(repositoryName),
  );
  const totalCount = data?.search.repositoryCount ?? 0;
  const pageInfo = data?.search.pageInfo;
  const hasNextPage = pageInfo?.hasNextPage ?? false;
  const endCursor = pageInfo?.endCursor ?? null;

  const handleLoadMore = async () => {
    if (!hasNextPage || loading) return;

    await fetchMore({
      variables: {
        after: endCursor,
      },
    });
  };

  /**
   * Updates the search params in the URL and triggers a new search.
   * @param {string} key - The search parameter key to update.
   * @param {string} value - The new value for the search parameter.
   */
  const handleNewSearch = async (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value.trim() === '') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.replace(`/search?${params.toString()}`);
  };

  useEffect(() => {
    if (error) {
      toast.error('Sorry, something went wrong. Please try again.');
    }
  }, [error]);

  return (
    <div className="bg-background">
      <div className="flex items-center justify-between p-6 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-4">
          <SearchBar
            placeholder="Search for a GitHub user"
            initialValue={username}
            size="sm"
            isLoading={loading}
            onUpdate={(value) => handleNewSearch('username', value)}
          />
          <span className="text-sm text-muted-foreground">
            {filteredRepositories?.length ?? 0} of {totalCount} results
          </span>
        </div>
        <Filters
          username={username}
          language={language}
          repositoryName={repositoryName}
          handleFilterUpdate={handleNewSearch}
        />
      </div>
      <SearchResults repositories={filteredRepositories} isLoading={loading} />
      {hasNextPage && (
        <div className="flex justify-center my-6">
          <Button
            className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
            variant="ghost"
            size="icon"
            disabled={loading}
            onClick={handleLoadMore}
          >
            <ArrowDown className="w-4 h-4 disabled:opacity-50" />
          </Button>
        </div>
      )}
    </div>
  );
}
