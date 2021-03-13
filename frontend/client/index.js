import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';


import { history } from 'Components/Router';
import { settings } from 'Settings';


function RedirectToAuth() {
  history.push(settings.auth.loginPath, true);
}


/**
 * Add CSRF token to request headers.
 * @todo redirect to (client) error view if no token
 */
const CsrfLink = setContext((_, { headers }) => {
  const csrfToken = Cookies.get(settings.auth.csrf.cookieName);

  if (!headers) headers = {};
  headers[settings.auth.csrf.headerName] = csrfToken;

  return { headers };
});


/**
 * Handle error responses like missing auth.
 *
 * Forbidden (403): CRSF or permission failure.
 * Redirected (200): response redirecting to login.
 * Unauthorized (401): not authenticated.
 *
 * @todo check for error.networkError.response
 */
const NetworkErrorsLink = onError(error => {
  if (error?.networkError) {
    const { redirected } = error.networkError.response;
    const { statusCode } = error.networkError;

    if (redirected || [401, 403].includes(statusCode)) {
      RedirectToAuth();
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
