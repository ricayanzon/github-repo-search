import { gql } from '@apollo/client';

export const REPOSITORY_FRAGMENT = gql`
  fragment RepositoryFragment on Repository {
    createdAt
    description
    forkCount
    id
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
