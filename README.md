# GitHub Repo Search

GitHub Repo Search is a web application built with Next.js that allows users to search, filter, and explore GitHub repositories by owner, language, and repository name. It uses Apollo Client for GraphQL queries and allows filtering and favorites functionality.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## CI/CD

There is a small GitHub Action to run lint, format, type & build checks automatically for pushes or PR on `main`.
The `main` branch is then automatically deployed to Vercel.

## Key Dependencies

- **prettier**: Code formatter to ensure consistent code style across the project.
- **eslint**: Linter for identifying and fixing code quality and style issues.
- **shadcn/ui**: Component library for building accessible and customizable UI components, integrated with Tailwind CSS.
- **tailwindcss**: Utility-first CSS framework for rapid UI development.
- **graphql-codegen**: Tool for automatically generating TypeScript types and hooks from GraphQL schemas and queries.

## Available Commands

- `pnpm dev` – Start the development server.
- `pnpm build` – Build the application for production.
- `pnpm start` – Start the production server.
- `pnpm lint` – Run ESLint to check for code quality and style issues.
- `pnpm format` – Format all project files using Prettier.
- `pnpm format:check` – Check if files are formatted according to Prettier rules.
- `pnpm typecheck` – Run TypeScript type checking.
- `pnpm codegen` – Generate TypeScript types and hooks from GraphQL documents.
- `pnpm codegen:watch` – Watch for changes and regenerate GraphQL types automatically.

## Future Improvements

- Extend filters to support more repository attributes
- Add an automated test suite
- Allow filtering in the favorites section
- Add an About page to display my GitHub profile
- Fetch more information about the repositories, e.g. the README content, and add a toggle to display those
