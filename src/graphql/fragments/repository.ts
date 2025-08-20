import { graphql } from '../codegen';

export const RepositoryFragment = graphql(`
  fragment RepositoryItem on Repository {
    collaborators {
      nodes {
        ...UserItem
      }
      totalCount
    }
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
