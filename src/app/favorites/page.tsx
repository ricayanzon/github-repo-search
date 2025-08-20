'use client';

import SearchResultItem from '@/components/search-result-item';
import SearchResultSkeleton from '@/components/search-result-skeleton';
import { FragmentType, useFragment } from '@/graphql/codegen';
import { RepositoryFragment } from '@/graphql/fragments/repository';
import { repositoriesByIdsQueryDocument } from '@/graphql/queries/repositories-by-ids';
import { getFavoriteIds } from '@/lib/local-storage';
import { useQuery } from '@apollo/client/react/hooks/useQuery';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Favorites() {
  const initialFavoriteIds = getFavoriteIds();
  const [favoriteIds, setFavoriteIds] = useState<string[]>(initialFavoriteIds);

  const { data, loading, error } = useQuery(repositoriesByIdsQueryDocument, {
    variables: { ids: favoriteIds },
    skip: favoriteIds.length === 0,
  });

  const repositoriesQueryResult =
    data?.nodes?.filter(
      (node) => node !== null && node !== undefined && node.__typename === 'Repository',
    ) ?? [];
  const repositories = useFragment(
    RepositoryFragment,
    repositoriesQueryResult as FragmentType<typeof RepositoryFragment>[],
  );

  useEffect(() => {
    const updateFavorites = () => {
      const favoriteIds = getFavoriteIds();
      setFavoriteIds(favoriteIds);
    };
    window.addEventListener('storage', updateFavorites);
    window.addEventListener('favorites-updated', updateFavorites);

    return () => {
      window.removeEventListener('storage', updateFavorites);
      window.removeEventListener('favorites-updated', updateFavorites);
    };
  }, []);

  useEffect(() => {
    if (error) {
      toast.error('Sorry, something went wrong. Please try again.');
    }
  }, [error]);

  return (
    <div className="p-4">
      {loading ? (
        <SearchResultSkeleton />
      ) : repositories.length > 0 ? (
        <div className="grid gap-4 grid-cols-1">
          {repositories.map((repository) => (
            <SearchResultItem key={repository.id} repository={repository} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg font-medium mb-2">No repositories found</p>
          <p className="text-muted-foreground">
            Start adding repositories to your favorites to see them here
          </p>
          <p className="text-muted-foreground">
            Or, if you did already, some of your favorite repositories might have been deleted or
            made private
          </p>
        </div>
      )}
    </div>
  );
}
