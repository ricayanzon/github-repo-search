import { gql } from '@apollo/client';

export const OWNER_FRAGMENT = gql`
  fragment Owner on RepositoryOwner {
    __typename
    avatarUrl
    login
    url
    ... on Organization {
      ...Organization
    }
    ... on User {
      ...User
    }
  }
`;
