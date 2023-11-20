import client from '.';
import { REFRESH_TOKEN } from '../gql/mutations';

export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    const parseRefreshToken = refreshToken ? JSON.parse(refreshToken) : null;
    localStorage.setItem('access_token', JSON.stringify(parseRefreshToken));

    const { data } = await client.mutate({
      mutation: REFRESH_TOKEN
    });

    if (data?.refreshTokenV2) {
      localStorage.setItem('access_token', JSON.stringify(data?.refreshTokenV2?.access_token));
      localStorage.setItem('refresh_token', JSON.stringify(data?.refreshTokenV2?.refresh_token));
      return data?.refreshTokenV2?.access_token;
    }
    return null;
  } catch (error) {
    console.error('Error executing mutation', error);
    return null;
  }
};
