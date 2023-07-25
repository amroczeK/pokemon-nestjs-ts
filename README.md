## Description

Simple NestJS RESTful API CRUD fullstack application using Pokemon Gen 1 dataset demonstrating:

- Application, MongoDB containerization in Docker and database seeding.
- Volume mapping and persisting database data in db container.
- Environment variable configuration and validation.
- URI versioning, Swagger configuration and documentation.
- REST API calls invoking CRUD operations.
- Validating API request BODY and PARAMS based on DTO's using pipes.
- Annotating schemas, dto's and controllers.
- Creation and usage of Data Transfer Objects and Mongoose Schemas.
- Mitigating common attack vectors by setting HTTP response headers using Helmet.
- Rate limiting to prevent-brute force attacks, by limiting application to 10 requests within 60 second time period as an example.
- Implementation and usage of open source API gateway proxying traffic to services within Docker network. [Kong API Gateway](https://docs.konghq.com/gateway/latest/)
- Secure the client (Swagger), preventing unauthenticated requests to backend API's

### Todo implementations

- Containerize and configure API Gateway. (Completed using [Kong API Gateway](https://docs.konghq.com/gateway/latest/))
- Authentication to secure client/endpoints. (Completed using Kong, Keycloak and OIDC)
- Authorization/Role-based access control to determine what users can do.
- Microservices Architecture

## Prerequisites

- Docker
- Node v18+ (if running locally)

## Setup

Use docker compose to setup the docker environment for the application. The docker compose file contains all the configurations and commands required to build the application, database and seed the dataset into the db.

```bash
# Builds, (re)creates, starts, and attaches to containers for a service in detached mode. Ommit -d if you don't want to run in detached mode.
$ docker compose up -d
```

## Swagger

The pokemon service sits behind an API Gateway, you can interact with the API's through the Swagger UI via http://localhost:8000/api

You can also make CURL requests:

```bash
$ curl http://localhost:8000/api/v1/pokemon
```

## Running the NestJS application locally outside of Docker environment

If you want to run the application locally in development/watch mode, follow these steps:

```bash
# If the containers are already running use this command to stop and remove containers, networks.
$ docker compose down

# Start the mongo database container, it is a prerequisites as the application connects to the database on start up.
$ docker compose up mongo -d

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# References
https://www.keycloak.org/docs/latest/securing_apps/#available-endpoints
https://www.keycloak.org/docs/latest/server_admin/index.html#capability-config
https://github.com/revomatico/docker-kong-oidc/tree/master

http://192.168.0.20:9080/realms/pokemon/.well-known/openid-configuration

