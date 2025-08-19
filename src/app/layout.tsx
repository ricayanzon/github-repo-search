'use client';

import Header from '@/components/header';
import { Toaster } from '@/components/ui/sonner';
import client from '@/graphql/apollo-client';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Roboto } from 'next/font/google';
import { usePathname } from 'next/navigation';
import './globals.css';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showHeader = pathname !== '/';

  return (
    <ApolloProvider client={client}>
      <html lang="en">
        <body className={`${roboto.variable} antialiased`}>
          <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
            {showHeader && <Header />}
            <main>{children}</main>
            <Toaster />
          </NextThemesProvider>
        </body>
      </html>
    </ApolloProvider>
  );
}
