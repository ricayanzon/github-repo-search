'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFragment } from '@/graphql/codegen';
import { RepositoryItemFragment } from '@/graphql/codegen/graphql';
import { LanguageFragment } from '@/graphql/fragments/language';
import { LicenseFragment } from '@/graphql/fragments/license';
import { addFavoriteId, isFavoriteById, removeFavoriteId } from '@/lib/local-storage';
import { formatDateRelative, formatNumber } from '@/lib/utils';
import { Calendar, Clock, GitFork, Heart, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

type SearchResultItemProps = {
  repository: RepositoryItemFragment;
};

export default function SearchResultItem({ repository }: SearchResultItemProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const primaryLanguage = useFragment(LanguageFragment, repository.primaryLanguage);
  const licenseInfo = useFragment(LicenseFragment, repository.licenseInfo);

  const openRepositoryUrl = () => {
    window.open(repository.url, '_blank', 'noopener,noreferrer');
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteId(repository.id);
      setIsFavorite(false);
    } else {
      addFavoriteId(repository.id);
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    setIsFavorite(isFavoriteById(repository.id));
  }, [repository.id]);

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <button
            onClick={openRepositoryUrl}
            className="text-primary hover:text-primary/80 cursor-pointer"
          >
            {repository.name}
          </button>
          <button
            onClick={toggleFavorite}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Heart
              className={`w-5 h-5 cursor-pointer ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`}
            />
          </button>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {repository.description ?? 'No description available'}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {primaryLanguage && (
            <div className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: primaryLanguage.color ?? '#000000' }}
              />
              <span>{primaryLanguage.name}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            <span>{formatNumber(repository.stargazerCount)}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="w-3 h-3" />
            <span>{formatNumber(repository.forkCount)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>Created {formatDateRelative(repository.createdAt)}</span>
            </div>
            {repository.updatedAt && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Updated {formatDateRelative(repository.updatedAt)}</span>
              </div>
            )}
          </div>
          {licenseInfo && (
            <span className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
              {licenseInfo.spdxId ?? licenseInfo.name}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
