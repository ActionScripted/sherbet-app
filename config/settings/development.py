import ipaddress
import os

from .base import *  # noqa
from .base import env


# Debug
DEBUG = True


# Allowed (debug) IPs (see docker-compose.yml)
INTERNAL_IPS = ['0.0.0.0', '127.0.0.1']
INTERNAL_IPS += [str(ip) for ip in ipaddress.IPv4Network('172.20.0.0/24')]


# Constance (settings)
CONSTANCE_IGNORE_ADMIN_VERSION_CHECK = True


# django-debug-toolbar
INSTALLED_APPS += ['debug_toolbar']  # noqa
MIDDLEWARE.insert(0, 'debug_toolbar.middleware.DebugToolbarMiddleware')  # noqa
DEBUG_TOOLBAR_CONFIG = {'SHOW_COLLAPSED': True, }  # noqa


# Mail
EMAIL_HOST = env('MAILHOG_HOST')
EMAIL_PORT = env('MAILHOG_PORT')


# Security
ALLOWED_HOSTS += ['.sherbet.test']  # noqa
CSRF_COOKIE_DOMAIN = '.sherbet.test'
CSRF_COOKIE_SECURE = False
SESSION_COOKIE_DOMAIN = '.sherbet.test'
SESSION_COOKIE_SECURE = False


# Static files
STATICFILES_DIRS = [os.path.join(APPS_DIR, 'static')]  # noqa
STATIC_ROOT = None


# Templates (disable caching in dev)
TEMPLATES[0]['OPTIONS']['loaders'] = [  # noqa F405
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
]
