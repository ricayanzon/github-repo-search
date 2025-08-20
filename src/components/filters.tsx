import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

  const selectableLanguages = [
    ...new Set(
      data?.repositoryOwner?.repositories.nodes
        ?.map((node) => node?.primaryLanguage?.name)
        .filter((name) => name !== undefined) ?? [],
    ),
  ].sort();

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
      <Select
        value={language}
        disabled={loading}
        onValueChange={(value) => handleFilterUpdate('language', value)}
      >
        <SelectTrigger className="w-[10rem]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {selectableLanguages.map((selectableLanguage) => (
            <SelectItem key={selectableLanguage} value={selectableLanguage}>
              {selectableLanguage}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
