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
    loginUrl: '/login/',
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
