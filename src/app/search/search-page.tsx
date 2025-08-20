'use client';

import Filters from '@/components/filters';
import SearchBar from '@/components/search-bar';
import SearchResults from '@/components/search-results';
import { FragmentType, useFragment } from '@/graphql/codegen';
import { RepositoryFragment } from '@/graphql/fragments/repository';
import { allRepositoriesSearchQueryDocument } from '@/graphql/queries/all-repositories-search';
import { useQuery } from '@apollo/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const username = searchParams.get('username') || '';
  const language = searchParams.get('language') || '';
  const repositoryName = searchParams.get('repositoryName') || '';

  const { data, loading, error } = useQuery(allRepositoriesSearchQueryDocument, {
    variables: {
      query: `user:${username} language:${language} repo:${username}/${repositoryName}`,
      numberRepositories: 20,
    },
    skip: username.trim() === '',
  });

  const repositoriesQueryResult = data?.search.edges
    ?.map((edge) => edge?.node)
    .filter((node) => node !== null && node !== undefined && node.__typename === 'Repository');
  const repositories = useFragment(
    RepositoryFragment,
    repositoriesQueryResult as FragmentType<typeof RepositoryFragment>[],
  );
  const totalCount = data?.search.repositoryCount ?? 0;

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
            onEnter={(value) => handleNewSearch('username', value)}
          />
          <span className="text-sm text-muted-foreground">
            {repositories?.length ?? 0} of {totalCount} results
          </span>
        </div>
        <Filters
          username={username}
          language={language}
          repositoryName={repositoryName}
          handleFilterUpdate={handleNewSearch}
        />
      </div>
      <SearchResults repositories={repositories} isLoading={loading} />
    </div>
  );
}
