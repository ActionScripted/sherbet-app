# NOTE: Ordered to help caching when having to adjust/upgrade.
# NOTE. Root/user swaps seem stupid, I know, but...caching.
#
FROM node:14
LABEL maintainer="actionscripted@gmail.com"

# Create/set working directory to project
WORKDIR /home/django/srv

# Packages: Setup
COPY ./.npmrc .npmrc
COPY ./package-lock.json package-lock.json
COPY ./package.json package.json

# Service user: setup
ARG django_gid=999
ARG django_uid=999
RUN groupadd -g $django_gid django \
  && useradd -l -u $django_uid -g django django
RUN chown -R django:django /home/django

# Packages / Service user: install
USER django
RUN npm install --verbose

# Frontend / Scripts: setup
USER root
COPY ./babel.config.json ./babel.config.json
COPY ./compose/frontend/start.sh ./compose/frontend/start.sh
COPY ./frontend ./frontend
COPY ./webpack.common.js ./webpack.common.js
COPY ./webpack.development.js ./webpack.development.js
COPY ./webpack.production.js ./webpack.production.js
RUN chmod +x ./compose/frontend/start.sh

# Service user: re-chown (again; skip node_modules)
RUN chown -R django:django /home/django/srv/compose/ && \
    chown -R django:django /home/django/srv/frontend/ && \
    chown -R django:django /home/django/srv/webpack*

# Clean: trim ~25MB from the image
ARG DOCKER_CLEANUP=1
USER root
RUN if [ $DOCKER_CLEANUP -eq 1 ]; then \
      npm cache clean --force \
  ; fi

# Service user: yo
USER django
