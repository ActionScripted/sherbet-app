#!/bin/sh
#
# https://github.com/pydanny/cookiecutter-django/
# https://stackoverflow.com/a/52795933/12276

# Exit if error
set -o errexit
# Exit if unset variables
set -o nounset


# Celery Flower
celery flower \
    --app=config.celery_app \
    #--basic_auth="${CELERY_FLOWER_USER}:${CELERY_FLOWER_PASS}" \
    --broker="${CELERY_BROKER_URL}" \
    --port="${CELERY_FLOWER_PORT}"
