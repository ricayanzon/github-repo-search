import { gql } from '@apollo/client';

export const ORGANIZATION_FRAGMENT = gql`
  fragment Organization on Organization {
    __typename
    avatarUrl
    createdAt
    description
    email
    location
    login
    name
    url
    websiteUrl
  }
`;
