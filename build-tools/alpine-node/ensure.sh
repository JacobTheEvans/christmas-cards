#!/bin/bash

cd $(dirname `[[ $0 = /* ]] && echo "$0" || echo "$PWD/${0#./}"`)

if docker inspect christmascard/alpine-node:$NODE_VERSION  > /dev/null 2>&1 ; then
  echo "Node builder image with version $NODE_VERSION exists"
else
  echo "Node builder image with version $NODE_VERSION not existing, building it"
  docker build . -t christmascard/alpine-node:$NODE_VERSION --build-arg NODE_VERSION=$NODE_VERSION
fi
