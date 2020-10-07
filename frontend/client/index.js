import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import Cookies from 'js-cookie';


import { history } from 'Components/Router';
import { settings } from 'Settings';


const CsrfLink = setContext((_, { headers }) => {
  const token = Cookies.get(settings.auth.csrf.cookieName);

  // TODO: redirect to (client) error view if no token? how the
  // eff do they not have the cookie? JS on, cookies off?

  if (!headers) headers = {};
  headers[settings.auth.csrf.headerName] = token;

  return { headers }
});


const NetworkErrorsLink = onError(error => {
  if (error.networkError) {
    if (error.networkError.response.redirected
      || [401, 403].includes(error.networkError.statusCode))
    {
      history.push('/login/', true);
    }
  }
});


export const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: 'same-origin',
  link: from([
    CsrfLink,
    NetworkErrorsLink,
    new HttpLink({uri: settings.graphql.uri})
  ])
});
