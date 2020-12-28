/**
 * Settings
 *
 * Project-wide configuration and settings.
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
  brand: {
    color: '#d80058',
    name: 'Sherbet',
  },
  graphql: {
    query: {
      pollInterval: 30000,
    },
    uri: '/graphql'
  },
  path: {
    django: 'sherbet',
    frontend: 'frontend',
  }
};


module.exports = {'settings': settings}
