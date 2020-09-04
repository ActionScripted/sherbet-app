#!/bin/sh
#
# https://github.com/pydanny/cookiecutter-django/
# https://stackoverflow.com/a/52795933/12276

#set -o errexit
#set -o pipefail
#set -o nounset


# We want this service not to auto-run with compose up but we
# also don't want to fuss with multiple compose files.
#
# We also have issues with pytest-django ignoring config values
# and using ENV stuff instead, so...here we are.
#
# This file and the related compose service are just a hack around
# shortcomings in pytest and compose. If you're reading this in the
# future and there's a better way, please use it and delete this.
#
# For some reading on the matter:
# https://github.com/docker/compose/issues/1896
#
# This hack specifically came from:
# https://github.com/docker/compose/issues/1896#issuecomment-355613322

if [ ! -t 1 ] ; then
  echo "No TTY available, exiting. (not an error)"
  exit 0
else
  pytest
fi
