#!/bin/bash

echo '[+] Building code from protbufs'
docker run --rm -v "$(pwd)/frontend/src/ChristmasCard:/build/output" \
-v "$(pwd)/christmascard.proto:/build/christmascard.proto" \
--env PROTO_FILE="christmascard.proto" \
"christmascard/proto-builder"
echo '[+] Code from protfubs built'

echo '[+] Building frontend src'
docker run --rm -v "$(pwd)/frontend:/app" \
-w /app \
"christmascard/alpine-node:8.12.0" ash -c \
"yarn run build"

echo '[+] Building frontend container'
docker run --rm -v "$(pwd)/frontend:/app" \
-w /app \
"christmascard/alpine-node:8.12.0" ash -c \
"yarn run build"
./build-tools/frontend/ensure.sh
