import { graphql } from '../codegen';

export const RepositoryFragment = graphql(`
  fragment RepositoryItem on Repository {
    createdAt
    description
    forkCount
    id
    licenseInfo {
      ...LicenseItem
    }
    name
    owner {
      ...OwnerItem
    }
    primaryLanguage {
      ...LanguageItem
    }
    stargazerCount
    updatedAt
    url
  }
`);
