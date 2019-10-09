#!/usr/bin/env bash

set -e

if [[ "$EUID" -ne 0  ]]; then
  echo "This script MUST be run as root (sudo)"
  exit
fi

# $1 = Theme name

docker exec wp bash -c "source ~/.bashrc \
  && cd wp-content/themes/ \
  && composer create-project roots/sage -n $1 \
  && cd $1 \
  && yarn"
