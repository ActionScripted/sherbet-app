/**
 * Settings
 *
 * Project-wide configuration and settings.
 */

const settings = {
  brand: {
    color: '#d80058',
    name: 'Sherbet',
  },
  csrf: {
    cookie_name: 'sherb_csrftoken',
    header_name: 'X-CSRFToken',
  },
  graphql: {
    query: {
      poll_interval: 30000,
    }
  },
  path: {
    django: 'sherbet',
    frontend: 'frontend',
  }
};


module.exports = {'settings': settings}
