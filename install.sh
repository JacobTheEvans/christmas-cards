#!/bin/bash

cd $(dirname `[[ $0 = /* ]] && echo "$0" || echo "$PWD/${0#./}"`)

./build-tools/envoy/ensure.sh

NODE_VERSION=8.12.0 ./build-tools/alpine-node/ensure.sh

docker run --rm -v "$(pwd):/app" \
-w /app/frontend \
"christmascard/alpine-node:8.12.0" ash -c \
"yarn install"

docker run --rm -v "$(pwd):/app" \
-w /app/server \
"christmascard/alpine-node:8.12.0" ash -c \
"yarn install"


./build.sh
