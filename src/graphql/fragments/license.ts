import { gql } from '@apollo/client';

export const LICENSE_FRAGMENT = gql`
  fragment License on License {
    key
    name
    url
  }
`;
