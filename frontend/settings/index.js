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
  path: {
    django: 'sherbet',
    frontend: 'frontend',
  }
};


module.exports = {'settings': settings}
