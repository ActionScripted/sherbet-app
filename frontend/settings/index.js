/**
 * Settings
 *
 * Project-wide configuration and settings.
 *
 * @note Changes here require a full app restart/rebuild.
 */


const settings = {
  auth: {
    csrf: {
      cookieName: 'sherb_csrftoken',
      headerName: 'X-CSRFToken',
    },
    loginPath: '/login/',
    loginUrl: process.env.AUTH_LOGIN_URL,
  },
  graphql: {
    query: {
      pollInterval: 30000,
    },
    uri: '/graphql'
  }
};


module.exports = { settings };
