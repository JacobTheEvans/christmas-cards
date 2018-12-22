#!/bin/bash

NODE_VERSION=8.12.0
BASE_IMAGE="christmascard/alpine-node:${NODE_VERSION}"

# Make sure the script runs in the directory in which it is placed
cd $(dirname `[[ $0 = /* ]] && echo "$0" || echo "$PWD/${0#./}"`)

MOUNT_PATH="$(pwd):/app"
NODE_VERSION=$NODE_VERSION ./build-tools/alpine-node/ensure.sh

docker run --rm -v $MOUNT_PATH \
-w /app/frontend \
$BASE_IMAGE ash -c \
"yarn install"

docker run --rm -v $MOUNT_PATH \
-w /app/server \
$BASE_IMAGE ash -c \
"yarn install"
