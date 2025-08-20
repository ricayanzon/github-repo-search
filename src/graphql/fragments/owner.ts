import { graphql } from '../codegen';

export const OwnerFragment = graphql(`
  fragment OwnerItem on RepositoryOwner {
    __typename
    avatarUrl
    login
    url
    ... on Organization {
      ...OrganizationItem
    }
    ... on User {
      ...UserItem
    }
  }
`);
