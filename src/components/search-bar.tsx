'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useKeyboardShortcut } from '@/hooks/use-keyboard-shortcut';
import { Search, X } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import { useRef, useState } from 'react';
import { Spinner } from './ui/spinner';

type SearchBarProps = {
  initialValue?: string;
  size?: 'sm' | 'lg';
  placeholder?: string;
  isLoading?: boolean;
  onEnter: (value: string) => void;
};

export default function SearchBar({
  initialValue,
  size,
  placeholder = 'Search',
  isLoading = false,
  onEnter,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(initialValue ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmedInputValue = inputValue.trim();
      onEnter(trimmedInputValue);
    }
  };

  useKeyboardShortcut({
    key: 'k',
    withCtrlKey: true,
    callback: () => {
      if (inputRef !== null && typeof inputRef !== 'function') {
        inputRef.current?.focus();
      }
    },
  });

  return (
    <div className="relative min-w-sm">
      {isLoading ? (
        <Spinner
          className={`absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground ${
            size === 'lg' ? 'h-4 w-4' : 'h-3 w-3'
          }`}
        />
      ) : (
        <Search
          className={`absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground ${
            size === 'lg' ? 'h-4 w-4' : 'h-3 w-3'
          }`}
        />
      )}
      <Input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={`pl-10 pr-10 ${size === 'lg' ? 'h-12 text-base' : ''}`}
        aria-label="Search"
        disabled={isLoading}
      />
      {inputValue && !isLoading && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setInputValue('')}
          className={`absolute right-1  top-1/2 -translate-y-1/2 cursor-pointer ${
            size === 'lg' ? 'h-10 w-10' : 'h-7 w-7'
          }`}
        >
          <X className={size === 'lg' ? 'h-4 w-4' : 'h-3 w-3'} />
        </Button>
      )}
    </div>
  );
}
