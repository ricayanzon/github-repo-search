import { graphql } from '../codegen';

export const allLanguagesByOwnerQueryDocument = graphql(`
  query allLanguagesByOwnerQuery($owner: String!, $cursor: String) {
    repositoryOwner(login: $owner) {
      repositories(first: 100, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          primaryLanguage {
            ...LanguageItem
          }
        }
      }
    }
  }
`);
