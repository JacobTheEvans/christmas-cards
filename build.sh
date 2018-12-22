#!/bin/bash

echo '[+] Ensuring envoy image is built'
./build-tools/envoy/ensure.sh
echo '[+] Building protbufs'
protoc -I=. ./christmascard.proto \
  --js_out=import_style=commonjs:./frontend/src/ChristmasCard \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./frontend/src/ChristmasCard
echo '[+] Success application is ready to be started'
