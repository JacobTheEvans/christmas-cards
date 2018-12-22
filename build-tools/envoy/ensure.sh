#!/bin/bash

cd $(dirname `[[ $0 = /* ]] && echo "$0" || echo "$PWD/${0#./}"`)

if docker inspect christmascard/envoy:latest  > /dev/null 2>&1 ; then
  echo "[+] Envoy image exists"
else
  echo "[-] Envoy image does not exist"
  echo "[+] Copying config..."
  cp ../../envoy.yaml ./
  echo "[+] Buidling..."
  docker build -t christmascard/envoy -f ./Dockerfile .
  echo "[+] Built and tagged as  christmascard/envoy:latest"
  echo "[+] Removing copy of config..."
  rm ./envoy.yaml
fi
