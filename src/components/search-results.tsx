import SearchResultItem from '@/components/search-result-item';
import { RepositoryItemFragment } from '@/graphql/codegen/graphql';
import SearchResultSkeleton from './search-result-skeleton';

type SearchResultsProps = {
  repositories: RepositoryItemFragment[];
  isLoading: boolean;
};

export default function SearchResults({ repositories, isLoading }: SearchResultsProps) {
  return (
    <div className="p-6">
      {isLoading ? (
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
          <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
}
