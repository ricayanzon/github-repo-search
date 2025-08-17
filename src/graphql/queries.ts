import { gql } from '@apollo/client';
import { REPOSITORY_FRAGMENT } from './fragments/repository';
import { OWNER_FRAGMENT } from './fragments/owner';
import { LANGUAGE_FRAGMENT } from './fragments/language';
import { LICENSE_FRAGMENT } from './fragments/license';
import { RELEASE_FRAGMENT } from './fragments/release';
import { ORGANIZATION_FRAGMENT } from './fragments/organization';
import { USER_FRAGMENT } from './fragments/user';

export const GET_REPOSITORIES = gql`
  query GetUserRepositories($username: String!, $numberRepositories: Int!) {
    search(query: $username, type: REPOSITORY, first: $numberRepositories) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            ...RepositoryFragment
            owner {
              ...OwnerFragment
            }
            primaryLanguage {
              ...LanguageFragment
            }
            languages(first: 10) {
              edges {
                node {
                  ...LanguageFragment
                }
              }
            }
            licenseInfo {
              ...LicenseFragment
            }
            latestRelease {
              ...ReleaseFragment
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
  ${REPOSITORY_FRAGMENT}
  ${OWNER_FRAGMENT}
  ${LANGUAGE_FRAGMENT}
  ${LICENSE_FRAGMENT}
  ${RELEASE_FRAGMENT}
  ${ORGANIZATION_FRAGMENT}
  ${USER_FRAGMENT}
`;
