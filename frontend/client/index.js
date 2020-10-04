import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client';
import { onError } from "@apollo/client/link/error";

import { GRAPHQL_URL } from 'Constants';
import { history } from 'Components/Router';


const AuthLink = onError(error => {
  if (error.graphQLErrors)
    error.graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (error.networkError) {
    console.log(`[Network error]: ${error.networkError}`);

    if (error.networkError.statusCode == 403) {
      history.push('/fuck', true);
    }
  }
});


const link = from([
  AuthLink,
  new HttpLink({uri: GRAPHQL_URL})
]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: 'same-origin',
  link,
});
