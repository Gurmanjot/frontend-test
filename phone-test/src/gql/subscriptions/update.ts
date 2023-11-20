import { gql } from '@apollo/client';

export const SUBSCRIPTION_QUERY = gql`
  subscription onUpdatedCall {
    onUpdatedCall {
      id
      direction
      is_archived
    }
  }
`;
