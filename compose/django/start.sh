#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset


# Start Django on standard port (within docker/compose)
python manage.py runserver 0.0.0.0:8000
