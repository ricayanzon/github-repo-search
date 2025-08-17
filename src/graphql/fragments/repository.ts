import { gql } from '@apollo/client';

export const REPOSITORY_FRAGMENT = gql`
  fragment Repository on Repository {
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
