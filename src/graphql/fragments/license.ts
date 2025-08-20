import { graphql } from '../codegen';

export const LicenseFragment = graphql(`
  fragment LicenseItem on License {
    key
    name
    spdxId
    url
  }
`);
