import { graphql } from '../codegen';

export const allRepositoriesSearchQueryDocument = graphql(`
  query allRepositoriesSearchQuery($query: String!, $first: Int!, $after: String) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            ...RepositoryItem
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);
