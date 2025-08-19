'use client';

import { Button } from '@/components/ui/button';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const links = [
    {
      route: '/search',
      name: 'Search',
    },
    {
      route: '/favorites',
      name: 'Favorites',
    },
    {
      route: '/about',
      name: 'About',
    },
  ];

  return (
    <header className="sticky z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center px-6 py-3">
        <Link key="/" href="/" className="mr-6 flex items-center gap-3">
          <SiGithub className="h-8 w-8" />
          <span className="font-bold sm:inline-block">RepoSearch</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium flex-1">
          {links.map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className={`
                transition-colors hover:text-foreground/80 cursor-pointer
                ${isActive(link.route) ? 'text-foreground' : 'text-foreground/60'}
              `}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
}
