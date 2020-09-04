#!/bin/sh
#
# https://github.com/pydanny/cookiecutter-django/
# https://stackoverflow.com/a/52795933/12276

# Exit if error
set -o errexit
# Exit if unset variables
set -o nounset



# Celery worker
#   app (-A) config.celery_app,
#   loglevel (-l) info,
#   queue (-Q),
#   name (-n),
#   concurrency (-c)
celery -A config.celery_app worker -l info
