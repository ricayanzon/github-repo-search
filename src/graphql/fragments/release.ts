import { gql } from '@apollo/client';

export const RELEASE_FRAGMENT = gql`
  fragment Release on Release {
    createdAt
    name
    tagName
    url
  }
`;
