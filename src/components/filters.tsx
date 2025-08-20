import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFragment } from '@/graphql/codegen';
import { LanguageFragment } from '@/graphql/fragments/language';
import { allLanguagesByOwnerQueryDocument } from '@/graphql/queries/all-languages-by-owner';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { toast } from 'sonner';
import SearchBar from './search-bar';

type FiltersProps = {
  username: string;
  language: string;
  repositoryName: string;
  handleFilterUpdate: (key: string, value: string) => void;
};

export default function Filters({
  username,
  language,
  repositoryName,
  handleFilterUpdate,
}: FiltersProps) {
  const { data, loading, error } = useQuery(allLanguagesByOwnerQueryDocument, {
    variables: {
      owner: username,
    },
    skip: username.trim() === '',
  });

  /**
   * Extract primary languages from repositories.
   * Then remove null/undefined, deduplicate, and sort alphabetically
   */
  const primaryLanguagesRaw =
    data?.repositoryOwner?.repositories?.nodes
      ?.map((node) => node?.primaryLanguage)
      .filter((node) => node !== undefined && node !== null) ?? [];
  const primaryLanguages = useFragment(LanguageFragment, primaryLanguagesRaw);
  const sortedUniquePrimaryLanguages = [...new Set(primaryLanguages)].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  /**
   * Normalizes the language value for search by replacing spaces with dashes, then updates the filter.
   * This is needed to search appropriately by language name (language ID not working)
   */
  const handleLanguageUpdate = (value: string) => {
    const fixedValue = value.replace(' ', '-');
    handleFilterUpdate('language', fixedValue);
  };

  useEffect(() => {
    if (error) {
      toast.error('Sorry, something went wrong. Please try again.');
    }
  }, [error]);

  return (
    <div className="flex items-center gap-4">
      <span className="text-md text-muted-foreground">Additional Filters: </span>
      <SearchBar
        placeholder="Filter by repository names"
        initialValue={repositoryName}
        size="sm"
        onEnter={(value) => handleFilterUpdate('repositoryName', value)}
      />
      <Select value={language} disabled={loading} onValueChange={handleLanguageUpdate}>
        <SelectTrigger className="w-[10rem]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {sortedUniquePrimaryLanguages.map((primaryLanguage) => (
            <SelectItem key={primaryLanguage.id} value={primaryLanguage.name}>
              {primaryLanguage.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
