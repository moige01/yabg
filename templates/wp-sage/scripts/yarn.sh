#!/usr/bin/env bash

set -e

if [[ "$EUID" -ne 0  ]]; then
  echo "This script MUST be run as root (sudo)"
  exit
fi

# $1 = Theme name
# $2 = Yarn's command name

docker exec wp bash -c "source ~/.bashrc && cd wp-content/themes/$1 && yarn $2"
