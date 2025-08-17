import type { CodegenConfig } from '@graphql-codegen/cli';
import { schema } from '@octokit/graphql-schema';

const config: CodegenConfig = {
  overwrite: true,
  schema: schema.idl,
  documents: ['src/graphql/**/*.ts', 'src/graphql/**/*.tsx'],
  generates: {
    // schema types
    'src/graphql/codegen/schema.ts': {
      plugins: ['typescript'],
    },

    // fragment types
    'src/graphql/codegen/operations.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        fragmentVariables: true,
        addTypename: true,
        operationResultSuffix: 'Result',
        documentVariableSuffix: 'Document',
        fragmentVariableSuffix: 'FragmentVariables',
      },
    },

    // hook types
    'src/graphql/codegen/hooks.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        apolloReactDomVersion: 19,
        apolloReactHooksVersion: 4,
        addTypename: true,
        operationResultSuffix: 'Result',
        documentVariableSuffix: 'Document',
        fragmentVariableSuffix: 'FragmentVariables',
      },
    },
  },
};

export default config;
