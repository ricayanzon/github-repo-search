import { graphql } from '../codegen';

export const allRepositoriesSearchQueryDocument = graphql(`
  query allRepositoriesSearchQuery($query: String!, $numberRepositories: Int!) {
    search(query: $query, type: REPOSITORY, first: $numberRepositories) {
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
