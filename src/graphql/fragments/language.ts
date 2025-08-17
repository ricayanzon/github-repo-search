import { gql } from '@apollo/client';

export const LANGUAGE_FRAGMENT = gql`
  fragment LanguageFragment on Language {
    color
    id
    name
  }
`;
