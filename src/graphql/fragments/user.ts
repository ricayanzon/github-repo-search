import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    __typename
    avatarUrl
    bio
    company
    userEmail: email
    location
    login
    name
    url
  }
`;
