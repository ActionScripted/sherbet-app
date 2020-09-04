FROM node:14
LABEL maintainer="actionscripted@gmail.com"

# Create/set working directory to project
WORKDIR /home/django/srv

# Copy deps and settings
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

# Install deps
RUN npm install && npm cache clean --force
