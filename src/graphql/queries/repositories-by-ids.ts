import { gql } from '@apollo/client';
import { LANGUAGE_FRAGMENT } from '../fragments/language';
import { LICENSE_FRAGMENT } from '../fragments/license';
import { ORGANIZATION_FRAGMENT } from '../fragments/organization';
import { OWNER_FRAGMENT } from '../fragments/owner';
import { RELEASE_FRAGMENT } from '../fragments/release';
import { REPOSITORY_FRAGMENT } from '../fragments/repository';
import { USER_FRAGMENT } from '../fragments/user';

export const REPOSITORIES_BY_IDS = gql`
  query RepositoriesByIds($ids: [ID!]!) {
    nodes(ids: $ids) {
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
  ${REPOSITORY_FRAGMENT}
  ${OWNER_FRAGMENT}
  ${LANGUAGE_FRAGMENT}
  ${LICENSE_FRAGMENT}
  ${RELEASE_FRAGMENT}
  ${ORGANIZATION_FRAGMENT}
  ${USER_FRAGMENT}
`;
