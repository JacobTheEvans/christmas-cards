#!/bin/bash
echo '[+] Building protbufs'
protoc -I=. ./christmascard.proto \
  --js_out=import_style=commonjs:./frontend/src/ChristmasCard \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./frontend/src/ChristmasCard


echo '[+] Building frontend'
docker run --rm -v "$(pwd)/frontend:/app" \
-w /app \
"christmascard/alpine-node:8.12.0" ash -c \
"yarn run build"
