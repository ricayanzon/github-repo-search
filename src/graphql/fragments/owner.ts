import { gql } from '@apollo/client';

export const OWNER_FRAGMENT = gql`
  fragment OwnerFragment on RepositoryOwner {
    __typename
    avatarUrl
    login
    url
    ... on Organization {
      ...OrganizationFragment
    }
    ... on User {
      ...UserFragment
    }
  }
`;
