import SearchResultItem from '@/components/search-result-item';
import { RepositoryItemFragment } from '@/graphql/codegen/graphql';
import SearchResultSkeleton from './search-result-skeleton';

type SearchResultsProps = {
  repositories: RepositoryItemFragment[];
  isLoading: boolean;
};

export default function SearchResults({ repositories, isLoading }: SearchResultsProps) {
  const displayText =
    repositories === undefined || repositories === null
      ? {
          firstParagraph: 'Start searching',
          secondParagraph: 'Try the name of a user to search for repositories',
        }
      : {
          firstParagraph: 'No repositories found',
          secondParagraph: 'Try adjusting your search terms or filters',
        };

  return (
    <div className="p-6">
      {isLoading ? (
        <SearchResultSkeleton />
      ) : (
        <>
          {repositories?.length > 0 ? (
            <div className="grid gap-4 grid-cols-1">
              {repositories.map((repository) => (
                <SearchResultItem key={repository.id} repository={repository} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg font-medium mb-2">{displayText.firstParagraph}</p>
              <p className="text-muted-foreground">{displayText.secondParagraph}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
