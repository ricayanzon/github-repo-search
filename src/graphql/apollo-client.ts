import { ApolloClient, InMemoryCache } from '@apollo/client';
import { fragmentRegistry } from './fragment-registry';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache({
    fragments: fragmentRegistry,
  }),
});

export default client;
