#!/usr/bin/env bash
#
# Development setup for Docker/Compose
#
# Author:    Michael Thompson <actionscripted@gmail.com>
# License:   MIT
# Requires:  none
# Usage:     ./make-setup.sh
# Version:   0.0.1


# Variables
compose_env="./compose/local.env"

case "$(uname -s)" in
  # macOS (BSD)
  Darwin*) host_os="mac";;
  # Linux ,PowerShell Bash and WSL
  Linux*)  host_os="linux";;
  # Something else...
  *)       host_os="other";;
esac


# Generate random-ish passwords of $1 length.
# Usage: generate_password 32
generate_password() {
  password_length=$1

  # tr "Illegal byte sequence" fix (macOS/UTF-8)
  LC_ALL=C
  LC_CTYPE=C

  echo $(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w $password_length | head -n 1)
}


# Search/replace pattern $1 in file(s) $2
# Usage: find_replace "s/foo/bar/g" file.txt
find_replace() {
  if [ "$host_os" == 'mac' ]; then
    # macOS (BSD)
    sed -i '' -e $1 $2
  else
    # Linux, Windows
    sed -i'' -e $1 $2
  fi
}


echo "Setup $compose_env..."
if [ ! -e $compose_env ]; then
  cp $compose_env.example $compose_env

  celery_flower_pass=$(generate_password 32)
  find_replace "s/<celery-flower-pass>/$celery_flower_pass/g" $compose_env

  django_secret_key=$(generate_password 64)
  find_replace "s/<django-secret-key>/$django_secret_key/g" $compose_env

  postgres_pass=$(generate_password 32)
  find_replace "s/<postgres-pass>/$postgres_pass/g" $compose_env

  rabbitmq_pass=$(generate_password 32)
  find_replace "s/<rabbitmq-pass>/$rabbitmq_pass/g" $compose_env

  echo "..done!"
else
  echo "...already exists!"
fi

echo "---"
echo "All set! Edit and verify $compose_env, then run:"
echo "  docker-compose up"
