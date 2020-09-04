FROM ubuntu:20.04
LABEL maintainer="actionscripted@gmail.com"

# Let OS know we're automated
ENV DEBIAN_FRONTEND=noninteractive

# LANG=C breaks python, apparently
# http://bugs.python.org/issue19846
ENV LANG C.UTF-8

# Proper container logging
ENV PYTHONUNBUFFERED 1

# Time zone setup (side-step interactive tzdata)
ENV TZ America/Detroit
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# System packages
RUN apt-get update && apt-get install -y \
  # Build (C/C++ compiler, etc. for Python modules and other builds)
  build-essential \
  # Translations
  gettext \
  # Python (main)
  python3 \
  python3-dev \
  python3-pip \
  python3-venv \
  # Postgres
  libpq-dev

# Application directory
RUN mkdir -p /home/django/srv/
WORKDIR /home/django/srv/

# Application source
COPY ./config ./config
COPY ./manage.py ./manage.py
COPY ./requirements ./requirements
COPY ./sherbet ./sherbet

# Command scripts (compose only)
COPY ./compose/beat/start.sh ./compose/beat/start.sh
COPY ./compose/celery/start.sh ./compose/celery/start.sh
COPY ./compose/django/pytest.sh ./compose/django/pytest.sh
COPY ./compose/django/start.sh ./compose/django/start.sh
COPY ./compose/flower/start.sh ./compose/flower/start.sh
RUN chmod +x ./compose/beat/start.sh
RUN chmod +x ./compose/celery/start.sh
RUN chmod +x ./compose/django/pytest.sh
RUN chmod +x ./compose/django/start.sh
RUN chmod +x ./compose/flower/start.sh

# Application group and user
ARG django_gid=999
ARG django_uid=999
RUN groupadd -g $django_gid django \
  && useradd -l -u $django_uid -g django django \
  && chown -R django:django /home/django
USER django

# Virtual environment
# NOTE: We're changing the path! (e.g., "python" is "pyton3")
ENV VIRTUAL_ENV /home/django/venv
RUN set -ex; \
  mkdir -p $VIRTUAL_ENV \
  && python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Python
RUN set -ex; \
  python -m pip install --upgrade pip setuptools wheel \
  && pip install --no-cache-dir -r requirements/development.txt

# Clean, maybe (trims ~25MB from the image)
# NOTE: last-ish to lean on caching
ARG DOCKER_CLEANUP=1
USER root
RUN if [ $DOCKER_CLEANUP -eq 1 ]; then \
      apt-get clean && rm -rf /var/lib/apt/lists/* \
  ; fi
USER django
