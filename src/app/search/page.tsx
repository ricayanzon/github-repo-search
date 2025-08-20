import { Suspense } from 'react';
import SearchPage from './search-page';

export default function Search() {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
}
