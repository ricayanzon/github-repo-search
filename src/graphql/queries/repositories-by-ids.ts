import { graphql } from '../codegen';

export const repositoriesByIdsQueryDocument = graphql(`
  query repositoriesByIdsQuery($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Repository {
        ...RepositoryItem
      }
    }
  }
`);
