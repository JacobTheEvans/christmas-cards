ARG NODE_VERSION=8.12.0
FROM mhart/alpine-node:${NODE_VERSION}

RUN apk add --update --no-cache \
git bash openssh openssl python build-base cmake libc6-compat linux-headers mongodb-tools \
    && rm -rf /tmp/* \
    && adduser -D -u 1000 node

RUN yarn global add --no-progress node-gyp mocha webpack
