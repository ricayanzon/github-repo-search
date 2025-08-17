import { gql } from '@apollo/client';

export const LANGUAGE_FRAGMENT = gql`
  fragment Language on Language {
    color
    id
    name
  }
`;
