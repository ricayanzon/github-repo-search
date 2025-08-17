import { gql } from '@apollo/client';

export const RELEASE_FRAGMENT = gql`
  fragment ReleaseFragment on Release {
    createdAt
    name
    tagName
    url
  }
`;
