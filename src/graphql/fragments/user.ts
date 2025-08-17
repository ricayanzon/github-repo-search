import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
  fragment User on User {
    __typename
    avatarUrl
    bio
    company
    email
    location
    login
    name
    url
  }
`;
