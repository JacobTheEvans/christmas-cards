#!/bin/bash

cd $(dirname `[[ $0 = /* ]] && echo "$0" || echo "$PWD/${0#./}"`)

openssl genrsa -out ./keys/jwt.rsa 4096
openssl rsa -in ./keys/jwt.rsa -pubout > ./keys/jwt.rsa.pub
