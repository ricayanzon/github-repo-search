import { gql } from '@apollo/client';

export const REPOSITORY_FRAGMENT = gql`
  fragment RepositoryFragment on Repository {
    createdAt
    description
    forkCount
    isArchived
    isFork
    isPrivate
    name
    stargazerCount
    updatedAt
    url
    visibility
  }
`;
