import { gql } from '@apollo/client';

export const ORGANIZATION_FRAGMENT = gql`
  fragment OrganizationFragment on Organization {
    __typename
    avatarUrl
    createdAt
    description
    organizationEmail: email
    location
    login
    name
    url
    websiteUrl
  }
`;
