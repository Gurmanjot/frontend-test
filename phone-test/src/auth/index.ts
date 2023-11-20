import { ApolloClient, InMemoryCache } from '@apollo/client';
import { authLink, httpLink } from './links';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

export default client;
