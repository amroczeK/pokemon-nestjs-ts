FROM kong:2.8.1-alpine

LABEL author="https://github.com/d4rkstar/kong-konga-keycloak/blob/master/Dockerfile"

USER root
RUN apk update && apk add curl git gcc musl-dev
RUN luarocks install luaossl OPENSSL_DIR=/usr/local/kong CRYPTO_DIR=/usr/local/kong
RUN luarocks install --pin lua-resty-jwt
RUN luarocks install kong-oidc

USER kong