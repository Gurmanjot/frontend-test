import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { getRefreshToken } from './refreshToken';
import { HttpLink } from '@apollo/client';
import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { WebSocketLink } from '@apollo/client/link/ws';

const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem('access_token');
  let parsedToken = accessToken ? JSON.parse(accessToken) : undefined;

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${parsedToken}` : ''
    }
  };
});

const httpLink = new HttpLink({
  uri: 'https://frontend-test-api.aircall.dev/graphql'
});

const websocketLink = new WebSocketLink(
  new SubscriptionClient('wss://frontend-test-api.aircall.dev/websocket', {
    lazy: true,
    reconnect: true,
    connectionParams: () => {
      const accessToken = localStorage.getItem('access_token');
      let parsedToken = accessToken ? JSON.parse(accessToken) : undefined;

      return {
        authorization: accessToken ? `Bearer ${parsedToken}` : ''
      };
    }
  })
);

export const errorLink = onError(({ graphQLErrors, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      if (message === 'Unauthorized') {
        // Returning flow from here as we do not want to refetch the api which is throwing unauthorized error
        if (operation.operationName === 'refreshTokenV2') return;

        (async () => {
          try {
            const accessToken = await getRefreshToken();
            if (!accessToken) {
              throw new Error('Login Required');
            }
            window.location.reload();
          } catch (e) {
            window.localStorage.clear();
            window.location.href = '/login';
          }
        })();
      }
    });
  }
});

export const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  websocketLink,
  authLink.concat(httpLink)
);
