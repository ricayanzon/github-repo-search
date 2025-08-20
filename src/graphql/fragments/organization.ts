import { graphql } from '../codegen';

export const OrganizationFragment = graphql(`
  fragment OrganizationItem on Organization {
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
`);
