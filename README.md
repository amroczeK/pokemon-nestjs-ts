## Description

Simple NestJS RESTful API CRUD application using Pokemon Gen 1 dataset demonstrating:

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

### Todo implementations
- Containerize and configure API Gateway.
- Authentication and Authorization, secure endpoints.
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
You can interact with the API's through the Swagger UI hosted on http://localhost:3000/api

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
