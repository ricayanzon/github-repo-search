import { graphql } from '../codegen';

export const LanguageFragment = graphql(`
  fragment LanguageItem on Language {
    color
    id
    name
  }
`);
