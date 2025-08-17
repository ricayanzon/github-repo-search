import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { fragmentRegistry } from './fragment-registry';

const httpLink = createHttpLink({
  uri: '/api',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    fragments: fragmentRegistry,
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default client;
