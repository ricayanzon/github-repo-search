import { gql } from '@apollo/client';

export const LICENSE_FRAGMENT = gql`
  fragment LicenseFragment on License {
    key
    name
    url
  }
`;
