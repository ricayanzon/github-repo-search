import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { fragmentRegistry } from './fragment-registry';

const httpLink = createHttpLink({
  uri: '/api',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    fragments: fragmentRegistry,
    typePolicies: {
      Query: {
        fields: {
          search: {
            keyArgs: ['query', 'type'],
            merge(existing, incoming, { args }) {
              if (!existing) {
                return incoming;
              }

              const merged = {
                ...incoming,
                edges: [...(existing.edges || []), ...(incoming.edges || [])],
              };

              return merged;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default client;
