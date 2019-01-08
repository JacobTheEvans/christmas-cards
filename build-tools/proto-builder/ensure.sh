#!/bin/bash

cd $(dirname `[[ $0 = /* ]] && echo "$0" || echo "$PWD/${0#./}"`)

if docker inspect christmascard/proto-builder:latest  > /dev/null 2>&1 ; then
  echo "[+] Proto-builder image exists"
else
  echo "[-] Proto-builder image does not exist"
  echo "[+] Buidling..."
  docker build -t christmascard/proto-builder -f ./Dockerfile .
  echo "[+] Built and tagged as christmascard/proto-builder:latest"
fi
