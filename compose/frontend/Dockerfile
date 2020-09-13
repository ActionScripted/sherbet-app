FROM node:14
LABEL maintainer="actionscripted@gmail.com"

# Create/set working directory to project
WORKDIR /home/django/srv

# Copy deps and settings
COPY ./.babelrc .babelrc
COPY ./.npmrc .npmrc
COPY ./compose/frontend/build.sh ./compose/frontend/build.sh
COPY ./compose/frontend/start.sh ./compose/frontend/start.sh
COPY ./frontend ./frontend
COPY ./package-lock.json package-lock.json
COPY ./package.json package.json
COPY ./webpack.common.js ./webpack.common.js
COPY ./webpack.development.js ./webpack.development.js
COPY ./webpack.production.js ./webpack.production.js

# Make sure entrypoints are executable
RUN chmod +x ./compose/frontend/build.sh
RUN chmod +x ./compose/frontend/start.sh

# Application group and user
ARG django_gid=999
ARG django_uid=999
RUN groupadd -g $django_gid django \
  && useradd -l -u $django_uid -g django django \
  && chown -R django:django /home/django
USER django

# Install deps
RUN npm install --verbose

# Clean, maybe (trims ~25MB from the image)
# NOTE: last-ish to lean on caching
ARG DOCKER_CLEANUP=1
USER root
RUN if [ $DOCKER_CLEANUP -eq 1 ]; then \
      npm cache clean --force \
  ; fi
USER django
