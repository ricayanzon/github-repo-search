import type { CodegenConfig } from '@graphql-codegen/cli';
import { schema } from '@octokit/graphql-schema';

const config: CodegenConfig = {
  schema: schema.idl,
  documents: ['src/graphql/fragments/**/*.ts', 'src/graphql/queries/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    'src/graphql/codegen/': {
      preset: 'client',
    },
  },
};

export default config;
