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
  python3-pip \
  python3-venv \
  # Clean (trim ~25MB from the image)
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Application directory
RUN mkdir -p /home/django/srv/
WORKDIR /home/django/srv/

# Application source
COPY ./requirements ./requirements

# Command scripts (compose only)
COPY ./compose/django/start.sh ./compose/django/start.sh
RUN chmod +x ./compose/django/start.sh

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