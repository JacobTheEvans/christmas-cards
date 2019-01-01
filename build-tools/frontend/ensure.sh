#!/bin/bash

cd $(dirname `[[ $0 = /* ]] && echo "$0" || echo "$PWD/${0#./}"`)

  echo "[+] Buidling Frontend"
  echo "[+] Copying required files..."
  cp ../../frontend/index.html ./index.html
  cp ../../frontend/nginx-default.template.conf ./nginx-default.template.conf
  cp -r ../../frontend/dist ./dist
  cp -r ../../frontend/static ./static

  echo "[+] Buidling..."
  docker build -t christmascard/frontend -f ./Dockerfile .
  echo "[+] Built and tagged as christmascard/frontend:latest"
  echo "[+] Removing copy of required files..."
  rm ./index.html
  rm ./nginx-default.template.conf
  rm -rf ./dist
  rm -rf ./static
