import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetUserRepositories($username: String!, $numberRepositories: Int!) {
    search(query: $username, type: REPOSITORY, first: $numberRepositories) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            ...Repository
            owner {
              ...Owner
            }
            primaryLanguage {
              ...Language
            }
            languages(first: 10) {
              edges {
                node {
                  ...Language
                }
              }
            }
            licenseInfo {
              ...License
            }
            latestRelease {
              ...Release
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
