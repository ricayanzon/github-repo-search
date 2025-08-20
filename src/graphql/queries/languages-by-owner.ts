import { gql } from '@apollo/client';

export const LANGUAGES_BY_OWNER = gql`
  query LanguagesByOwner($owner: String!, $cursor: String) {
    repositoryOwner(login: $owner) {
      repositories(first: 100, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          primaryLanguage {
            name
          }
        }
      }
    }
  }
`;
