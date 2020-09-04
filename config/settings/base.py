"""
Django settings for sherbet project.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import environ
import os

from celery.schedules import crontab


# BASE
# ------------------------------------------------------------------------------

# Build paths inside the project like this:
#   os.path.join(APPS_DIR, ...)
#   os.path.join(ROOT_DIR, ...)

# Base: Root (project) Directory
# sherbet/config/settings/base.py - 3 = sherbet/
ROOT_DIR = environ.Path(__file__) - 3

# Base: Applications Directory
APPS_DIR = ROOT_DIR.path('sherbet')

# Base: Environment
# https://github.com/joke2k/django-environ
env = environ.Env()


# PROJECT
# ------------------------------------------------------------------------------

# Project: Applications
INSTALLED_APPS = [
    # Built-ins
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.humanize',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.forms',
    # Third-party
    # Project: High Priority
    # Project: Normal Priority
]

# Project: Debug
DEBUG = False

# Project: URL Config
ROOT_URLCONF = 'config.urls'

# Project: WSGI Application
WSGI_APPLICATION = 'config.wsgi.application'


# AUTH / AUTH
# ------------------------------------------------------------------------------

# Auth: Backends
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
]

# Auth: Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator', },
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', },
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator', },
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator', },
]

# Auth: User Model
AUTH_USER_MODEL = 'users.User'

# Auth: Login redirect
LOGIN_URL = '/admin/login/'

# Auth: Post-login/logout redirect
LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/'

# Auth: Public (no login) views (not technically needed...)
PUBLIC_VIEWS = [
    'django.views.csrf.csrf_failure',
    'django.views.defaults.bad_request',
    'django.views.defaults.page_not_found',
    'django.views.defaults.permission_denied',
    'django.views.defaults.server_error',
]


# CACHES
# ------------------------------------------------------------------------------

# Caches: Config
MEMCACHED_LOCATION = env('MEMCACHED_LOCATION', default='unix:/tmp/memcached.sock')

# Caches: Core
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION': MEMCACHED_LOCATION,
    }
}

# Caches: Sessions (DB for writes; cache for reads with DB fallback)
SESSION_ENGINE = 'django.contrib.sessions.backends.cached_db'


# CELERY
# ------------------------------------------------------------------------------

# Celery: Types
CELERY_ACCEPT_CONTENT = ['json']
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TASK_SERIALIZER = 'json'

# Celery Beat: Scheduler
CELERY_BEAT_SCHEDULER = 'django_celery_beat.schedulers:DatabaseScheduler'

# Celery Beat: Schedule
CELERY_BEAT_SCHEDULE = {
    'reversion_cleanup': {
        'task': 'sherbet.tasks.reversion_cleanup',
        'schedule': crontab(hour=2, minute=0),
    },
}

# Celery: Broker (backend)
CELERY_BROKER_URL = env('CELERY_BROKER_URL')

# Celery: Cache
CELERY_CACHE_BACKEND = 'django-cache'

# Celery: Localization
CELERY_ENABLE_UTC = True
CELERY_TIMEZONE = 'America/Detroit'

# Celery: Limits
CELERY_TASK_SOFT_TIME_LIMIT = 2 * 60
CELERY_TASK_TIME_LIMIT = 5 * 60

# Celery: Results
CELERY_RESULT_BACKEND = 'django-db'
CELERY_RESULT_EXPIRES = 60 * 60 * 24


# CONSTANCE (Settings)
# ------------------------------------------------------------------------------

# Constance: backend
CONSTANCE_BACKEND = 'constance.backends.database.DatabaseBackend'
# Constance: backend cache (settings.CACHES)
CONSTANCE_DATABASE_CACHE_BACKEND = 'default'
# Constance: database(s) to use (settings.DATABASES)
CONSTANCE_DBS = ['default']

# Constance: config/settings (default; can be overridden in DB)
CONSTANCE_CONFIG = {}
# Constance: config/settings grouping
CONSTANCE_CONFIG_FIELDSETS = {}


# DATABASE
# ------------------------------------------------------------------------------

# Database: Core
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': env('POSTGRES_HOST'),
        'NAME': env('POSTGRES_DB'),
        'PASSWORD': env('POSTGRES_PASSWORD'),
        'PORT': '',
        'USER': env('POSTGRES_USER'),
    },
}

# Database: Routers for which of our DBs to use for what.
DATABASE_ROUTERS = []


# FILES
# ------------------------------------------------------------------------------

# Files to ignore, globally/generally
FILES_IGNORE = ['.DS_Store', 'Thumbs.db']


# FORMS
# ------------------------------------------------------------------------------

# Forms: Disable max upload field count
DATA_UPLOAD_MAX_NUMBER_FIELDS = 512

# Forms: Renderer (treat forms like an app; override templates)
FORM_RENDERER = 'django.forms.renderers.TemplatesSetting'


# GLOBALIZATION (I18N/L10N)
# ------------------------------------------------------------------------------

# Globalization: I18N, L10N, and Time Zones
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Globalization: Language (default)
LANGUAGE_CODE = 'en-us'

# Globalization: Time Zone (default)
TIME_ZONE = 'America/Detroit'


# HASHIDS
# ------------------------------------------------------------------------------

# Hashids: Min. Length
HASHIDS_MIN_LENGTH = 16

# Hashids: Salt
HASHIDS_SALT = 'trggvatfnyglbansevqnl'


# LOGGING
# ------------------------------------------------------------------------------

# Logging: Core
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse',
        },
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
    },
    'formatters': {
        'django.server': {
            '()': 'django.utils.log.ServerFormatter',
            'format': '[{server_time}] {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'filters': ['require_debug_true'],
            'level': 'INFO',
        },
        'django.server': {
            'class': 'logging.StreamHandler',
            'formatter': 'django.server',
            'level': 'INFO',
        },
        'mail_admins': {
            'class': 'django.utils.log.AdminEmailHandler',
            'filters': ['require_debug_false'],
            'level': 'ERROR',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'mail_admins'],
            'level': 'INFO',
        },
        'django.server': {
            'handlers': ['django.server'],
            'level': 'INFO',
            'propagate': False,
        },
    }
}


# MAIL
# ------------------------------------------------------------------------------

# Mail: default "From:"
DEFAULT_FROM_EMAIL = 'Sherbet <no-reply@sherbet.app>'

# Mail: backend
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

# Mail: default "Subject:"
EMAIL_SUBJECT_PREFIX = '[Sherbet] '

# Mail: "From:" for admin-related mail
SERVER_EMAIL = DEFAULT_FROM_EMAIL


# MEDIA
# ------------------------------------------------------------------------------

# Media: Directories
MEDIA_ROOT = '/home/django/srv/media/'

# Media: URL
MEDIA_URL = '/media/'

# Media: Permissions
FILE_UPLOAD_PERMISSIONS = 0o644


# MESSAGES
# ------------------------------------------------------------------------------

# Messages: storage
MESSAGE_STORAGE = 'django.contrib.messages.storage.fallback.FallbackStorage'


# MIDDLEWARE
# ------------------------------------------------------------------------------

# Middleware: Core
# Request/response hooks and processing.
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
]


# REST FRAMEWORK
# ------------------------------------------------------------------------------

# REST: Core
REST_FRAMEWORK = {
    'ALLOWED_VERSIONS': ('v1', ),
    'DATETIME_FORMAT': 'iso-8601',
    'DEFAULT_VERSION': 'v1',
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.URLPathVersioning',
    'ORDERING_PARAM': 'ordering',
    'PAGE_SIZE': 50,
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.OrderingFilter',
        'rest_framework.filters.SearchFilter',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissions',
    ],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '1000/day',
        'user': '10000/day'
    },
}


# REVERSION [SIC]
# ------------------------------------------------------------------------------
# Reversion: number of days to keep during cleanup
REVERSION_CLEANUP_DAYS = 30
# Reversion: number of (most recent) revisions to keep during cleanup
REVERSION_CLEANUP_KEEP = 3


# SECURITY
# ------------------------------------------------------------------------------

# Security: Allowed Hosts
# Host/domain names this site can serve.
ALLOWED_HOSTS = ['.sherbet.app', 'localhost', '127.0.0.1', '[::1]']

# Security: CSRF
# Cross-site request forgery.
CSRF_COOKIE_DOMAIN = '.sherbet.app'
CSRF_COOKIE_NAME = 'sherb_csrftoken'
CSRF_COOKIE_SAMESITE = 'Strict'
CSRF_COOKIE_SECURE = True

# Trusted origins for "unsafe" requests
CSRF_TRUSTED_ORIGINS = ALLOWED_HOSTS

# Security: Secrets
SECRET_KEY = env('DJANGO_SECRET_KEY')

# Security: Session
SESSION_COOKIE_DOMAIN = '.sherbet.app'
SESSION_COOKIE_NAME = 'sherb_sessionid'
SESSION_COOKIE_SAMESITE = 'Strict'
SESSION_COOKIE_SECURE = True


# STATIC
# ------------------------------------------------------------------------------

# Static: Directories
STATIC_ROOT = os.path.join(APPS_DIR, 'static')

# Static: URL
STATIC_URL = '/static/'


# TEMPLATES
# ------------------------------------------------------------------------------

# Templates: Core
TEMPLATES = [{
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [str(APPS_DIR.path('templates')), ],
    'OPTIONS': {
        'debug': DEBUG,
        'libraries': {
            'navigation': 'sherbet.templatetags.navigation',
        },
        'loaders': [
            ('django.template.loaders.cached.Loader', [
                'django.template.loaders.filesystem.Loader',
                'django.template.loaders.app_directories.Loader',
            ]),
        ],
        'context_processors': [
            'django.template.context_processors.debug',
            'django.template.context_processors.request',
            'django.contrib.auth.context_processors.auth',
            'django.template.context_processors.i18n',
            'django.template.context_processors.media',
            'django.template.context_processors.static',
            'django.template.context_processors.tz',
            'django.contrib.messages.context_processors.messages',
            'sherbet.context_processors.webpack_proxy',
        ],
    },
}, ]
