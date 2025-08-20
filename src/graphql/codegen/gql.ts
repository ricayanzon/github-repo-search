/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  '\n  fragment LanguageItem on Language {\n    color\n    id\n    name\n  }\n': typeof types.LanguageItemFragmentDoc;
  '\n  fragment LicenseItem on License {\n    key\n    name\n    spdxId\n    url\n  }\n': typeof types.LicenseItemFragmentDoc;
  '\n  fragment OrganizationItem on Organization {\n    __typename\n    avatarUrl\n    createdAt\n    description\n    organizationEmail: email\n    location\n    login\n    name\n    url\n    websiteUrl\n  }\n': typeof types.OrganizationItemFragmentDoc;
  '\n  fragment OwnerItem on RepositoryOwner {\n    __typename\n    avatarUrl\n    login\n    url\n    ... on Organization {\n      ...OrganizationItem\n    }\n    ... on User {\n      ...UserItem\n    }\n  }\n': typeof types.OwnerItemFragmentDoc;
  '\n  fragment RepositoryItem on Repository {\n    createdAt\n    description\n    forkCount\n    id\n    licenseInfo {\n      ...LicenseItem\n    }\n    name\n    owner {\n      ...OwnerItem\n    }\n    primaryLanguage {\n      ...LanguageItem\n    }\n    stargazerCount\n    updatedAt\n    url\n  }\n': typeof types.RepositoryItemFragmentDoc;
  '\n  fragment UserItem on User {\n    __typename\n    avatarUrl\n    bio\n    company\n    userEmail: email\n    location\n    login\n    name\n    url\n  }\n': typeof types.UserItemFragmentDoc;
  '\n  query allLanguagesByOwnerQuery($owner: String!, $cursor: String) {\n    repositoryOwner(login: $owner) {\n      repositories(first: 100, after: $cursor) {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        nodes {\n          primaryLanguage {\n            ...LanguageItem\n          }\n        }\n      }\n    }\n  }\n': typeof types.AllLanguagesByOwnerQueryDocument;
  '\n  query allRepositoriesSearchQuery($query: String!, $first: Int!, $after: String) {\n    search(query: $query, type: REPOSITORY, first: $first, after: $after) {\n      repositoryCount\n      edges {\n        node {\n          ... on Repository {\n            ...RepositoryItem\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n': typeof types.AllRepositoriesSearchQueryDocument;
  '\n  query repositoriesByIdsQuery($ids: [ID!]!) {\n    nodes(ids: $ids) {\n      ... on Repository {\n        ...RepositoryItem\n      }\n    }\n  }\n': typeof types.RepositoriesByIdsQueryDocument;
};
const documents: Documents = {
  '\n  fragment LanguageItem on Language {\n    color\n    id\n    name\n  }\n':
    types.LanguageItemFragmentDoc,
  '\n  fragment LicenseItem on License {\n    key\n    name\n    spdxId\n    url\n  }\n':
    types.LicenseItemFragmentDoc,
  '\n  fragment OrganizationItem on Organization {\n    __typename\n    avatarUrl\n    createdAt\n    description\n    organizationEmail: email\n    location\n    login\n    name\n    url\n    websiteUrl\n  }\n':
    types.OrganizationItemFragmentDoc,
  '\n  fragment OwnerItem on RepositoryOwner {\n    __typename\n    avatarUrl\n    login\n    url\n    ... on Organization {\n      ...OrganizationItem\n    }\n    ... on User {\n      ...UserItem\n    }\n  }\n':
    types.OwnerItemFragmentDoc,
  '\n  fragment RepositoryItem on Repository {\n    createdAt\n    description\n    forkCount\n    id\n    licenseInfo {\n      ...LicenseItem\n    }\n    name\n    owner {\n      ...OwnerItem\n    }\n    primaryLanguage {\n      ...LanguageItem\n    }\n    stargazerCount\n    updatedAt\n    url\n  }\n':
    types.RepositoryItemFragmentDoc,
  '\n  fragment UserItem on User {\n    __typename\n    avatarUrl\n    bio\n    company\n    userEmail: email\n    location\n    login\n    name\n    url\n  }\n':
    types.UserItemFragmentDoc,
  '\n  query allLanguagesByOwnerQuery($owner: String!, $cursor: String) {\n    repositoryOwner(login: $owner) {\n      repositories(first: 100, after: $cursor) {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        nodes {\n          primaryLanguage {\n            ...LanguageItem\n          }\n        }\n      }\n    }\n  }\n':
    types.AllLanguagesByOwnerQueryDocument,
  '\n  query allRepositoriesSearchQuery($query: String!, $first: Int!, $after: String) {\n    search(query: $query, type: REPOSITORY, first: $first, after: $after) {\n      repositoryCount\n      edges {\n        node {\n          ... on Repository {\n            ...RepositoryItem\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n':
    types.AllRepositoriesSearchQueryDocument,
  '\n  query repositoriesByIdsQuery($ids: [ID!]!) {\n    nodes(ids: $ids) {\n      ... on Repository {\n        ...RepositoryItem\n      }\n    }\n  }\n':
    types.RepositoriesByIdsQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment LanguageItem on Language {\n    color\n    id\n    name\n  }\n',
): (typeof documents)['\n  fragment LanguageItem on Language {\n    color\n    id\n    name\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment LicenseItem on License {\n    key\n    name\n    spdxId\n    url\n  }\n',
): (typeof documents)['\n  fragment LicenseItem on License {\n    key\n    name\n    spdxId\n    url\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment OrganizationItem on Organization {\n    __typename\n    avatarUrl\n    createdAt\n    description\n    organizationEmail: email\n    location\n    login\n    name\n    url\n    websiteUrl\n  }\n',
): (typeof documents)['\n  fragment OrganizationItem on Organization {\n    __typename\n    avatarUrl\n    createdAt\n    description\n    organizationEmail: email\n    location\n    login\n    name\n    url\n    websiteUrl\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment OwnerItem on RepositoryOwner {\n    __typename\n    avatarUrl\n    login\n    url\n    ... on Organization {\n      ...OrganizationItem\n    }\n    ... on User {\n      ...UserItem\n    }\n  }\n',
): (typeof documents)['\n  fragment OwnerItem on RepositoryOwner {\n    __typename\n    avatarUrl\n    login\n    url\n    ... on Organization {\n      ...OrganizationItem\n    }\n    ... on User {\n      ...UserItem\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment RepositoryItem on Repository {\n    createdAt\n    description\n    forkCount\n    id\n    licenseInfo {\n      ...LicenseItem\n    }\n    name\n    owner {\n      ...OwnerItem\n    }\n    primaryLanguage {\n      ...LanguageItem\n    }\n    stargazerCount\n    updatedAt\n    url\n  }\n',
): (typeof documents)['\n  fragment RepositoryItem on Repository {\n    createdAt\n    description\n    forkCount\n    id\n    licenseInfo {\n      ...LicenseItem\n    }\n    name\n    owner {\n      ...OwnerItem\n    }\n    primaryLanguage {\n      ...LanguageItem\n    }\n    stargazerCount\n    updatedAt\n    url\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment UserItem on User {\n    __typename\n    avatarUrl\n    bio\n    company\n    userEmail: email\n    location\n    login\n    name\n    url\n  }\n',
): (typeof documents)['\n  fragment UserItem on User {\n    __typename\n    avatarUrl\n    bio\n    company\n    userEmail: email\n    location\n    login\n    name\n    url\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query allLanguagesByOwnerQuery($owner: String!, $cursor: String) {\n    repositoryOwner(login: $owner) {\n      repositories(first: 100, after: $cursor) {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        nodes {\n          primaryLanguage {\n            ...LanguageItem\n          }\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query allLanguagesByOwnerQuery($owner: String!, $cursor: String) {\n    repositoryOwner(login: $owner) {\n      repositories(first: 100, after: $cursor) {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        nodes {\n          primaryLanguage {\n            ...LanguageItem\n          }\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query allRepositoriesSearchQuery($query: String!, $first: Int!, $after: String) {\n    search(query: $query, type: REPOSITORY, first: $first, after: $after) {\n      repositoryCount\n      edges {\n        node {\n          ... on Repository {\n            ...RepositoryItem\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n',
): (typeof documents)['\n  query allRepositoriesSearchQuery($query: String!, $first: Int!, $after: String) {\n    search(query: $query, type: REPOSITORY, first: $first, after: $after) {\n      repositoryCount\n      edges {\n        node {\n          ... on Repository {\n            ...RepositoryItem\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query repositoriesByIdsQuery($ids: [ID!]!) {\n    nodes(ids: $ids) {\n      ... on Repository {\n        ...RepositoryItem\n      }\n    }\n  }\n',
): (typeof documents)['\n  query repositoriesByIdsQuery($ids: [ID!]!) {\n    nodes(ids: $ids) {\n      ... on Repository {\n        ...RepositoryItem\n      }\n    }\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
