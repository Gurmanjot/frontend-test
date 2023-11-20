import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { errorLink, splitLink } from './links';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, splitLink])
});

export default client;
