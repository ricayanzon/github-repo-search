'use client';

import SearchBar from '@/components/search-bar';
import SearchResults from '@/components/search-results';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguagesByOwnerQuery, useRepositoriesSearchQuery } from '@/graphql/codegen/hooks';
import { Repository } from '@/graphql/codegen/schema';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function SearchPageComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const username = searchParams.get('username') || '';
  const language = searchParams.get('language') || '';
  const repositoryName = searchParams.get('repositoryName') || '';

  const {
    data: searchQueryData,
    loading: searchQueryLoading,
    error: searchQueryError,
  } = useRepositoriesSearchQuery({
    variables: {
      query: `user:${username} language:${language} ${repositoryName}`,
      numberRepositories: 20,
    },
    skip: username.trim() === '',
  });

  const repositories = (searchQueryData?.search.edges
    ?.map((edge) => edge?.node)
    .filter((node) => node !== null && node !== undefined && node.__typename === 'Repository') ??
    []) as Repository[];
  const totalCount = searchQueryData?.search.repositoryCount ?? 0;

  const {
    data: languageQueryData,
    loading: languageQueryLoading,
    error: languageQueryError,
  } = useLanguagesByOwnerQuery({
    variables: {
      owner: username,
    },
    skip: username.trim() === '',
  });

  const availableLanguages = [
    ...new Set(
      languageQueryData?.repositoryOwner?.repositories.nodes
        ?.map((node) => node?.primaryLanguage?.name)
        .filter((name) => name !== undefined) ?? [],
    ),
  ].sort();

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
    if (searchQueryError) {
      toast.error('Sorry, something went wrong. Please try again.');
    }
  }, [searchQueryError, languageQueryError]);

  return (
    <div className="bg-background">
      <div className="flex items-center justify-between p-6 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-4">
          <SearchBar
            placeholder="Search for a GitHub user"
            initialValue={username}
            size="sm"
            isLoading={searchQueryLoading}
            onEnter={(value) => handleNewSearch('username', value)}
          />
          <span className="text-sm text-muted-foreground">
            {repositories.length} of {totalCount} results
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-md text-muted-foreground">Additional Filters: </span>
          <SearchBar
            placeholder="Filter by repository names"
            initialValue={repositoryName}
            size="sm"
            onEnter={(value) => handleNewSearch('repositoryName', value)}
          />
          <Select
            value={language}
            disabled={languageQueryLoading}
            onValueChange={(value) => handleNewSearch('language', value)}
          >
            <SelectTrigger className="w-[10rem]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {availableLanguages.map((availableLanguage) => (
                <SelectItem key={availableLanguage} value={availableLanguage}>
                  {availableLanguage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <SearchResults repositories={repositories} isLoading={searchQueryLoading} />
    </div>
  );
}
