import { gql } from '@apollo/client';

export const UserFragment = gql`
  fragment UserItem on User {
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
