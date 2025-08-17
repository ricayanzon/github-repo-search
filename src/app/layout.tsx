'use client';

import client from '@/graphql/apollo-client';
import { ApolloProvider } from '@apollo/client';
import { Roboto } from 'next/font/google';
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
  return (
    <ApolloProvider client={client}>
      <html lang="en">
        <body className={`${roboto.variable} antialiased`}>{children}</body>
      </html>
    </ApolloProvider>
  );
}
