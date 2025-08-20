'use client';

import SearchBar from '@/components/search-bar';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleSearch = async (username: string) => {
    const params = new URLSearchParams({ username });
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-slate-50 dark:to-slate-900/50">
      <div className="container flex flex-col items-center justify-center gap-8 text-center pb-10 min-h-screen min-w-screen">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-medium text-muted-foreground">
            Search GitHub Repositories
          </h1>
          <p className="text-sm md:text-base text-muted-foreground/80">
            Find and explore repositories by owner
          </p>
        </div>
        <div className="w-full max-w-lg">
          <SearchBar
            placeholder="Search for a GitHub user"
            size="lg"
            isLoading={false}
            onEnter={handleSearch}
          />
          <div className="mt-3 text-xs text-muted-foreground/60">
            Press <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded font-mono">Ctrl</kbd>
            {' + '}
            <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded font-mono">K</kbd> to search
          </div>
        </div>
      </div>
    </div>
  );
}
