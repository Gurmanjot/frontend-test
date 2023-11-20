import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { getRefreshToken } from './refreshToken';
import { HttpLink } from '@apollo/client';

export const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem('access_token');
  let parsedToken = accessToken ? JSON.parse(accessToken) : undefined;

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${parsedToken}` : ''
    }
  };
});

export const httpLink = new HttpLink({
  uri: 'https://frontend-test-api.aircall.dev/graphql'
});

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
