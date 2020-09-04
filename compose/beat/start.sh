#!/bin/sh
#
# https://github.com/pydanny/cookiecutter-django/
# https://stackoverflow.com/a/52795933/12276

# Exit if error
set -o errexit
# Exit if unset variables
set -o nounset


# Remove (maybe) stale pidfile
rm -f './celerybeat.pid'

# Celery beat
# app (-A) config.celery_app, loglevel (-l) info
celery -A config.celery_app beat -l info
