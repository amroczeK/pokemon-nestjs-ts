# About

Simple NestJS RESTful API CRUD fullstack application using Pokemon Gen 1 dataset and utilizing Kong API Gateway and Keycloak with OpenID Connect/OAuth 2.0 demonstrating:

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
- Secure the client (Swagger UI), preventing unauthenticated requests to backend API's using Kong, Keycloak and OpenID Connect (OIDC).

#### Todo implementations:

- Authorization/Role-based access control to determine what users can do.
- Microservices Architecture

# Table of contents

<!--ts-->

- [Architecture Diagram](#architecture-diagram)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Docker environment](#docker-environment)
  - [Running application locally](#docker-environment)
- [Configuration](#configuration)
- [Usage](#usage)
<!--te-->

# Architecture Diagram

![Architecture Diagram](/devops/images/diagram.png)

#### Kong OIDC Flow

![Kong OIDC Flow](/devops/images/kong_oidc_flow.png)

# Installation

## Prerequisites

- Docker
- Node v18+ (if running pokemon service locally)

## Docker environment

Use docker compose to setup the docker environment for the application and other services. The docker compose file contains all the configurations and commands required to build the application, database and seed the dataset into the db.

```bash
# Builds, (re)creates, starts, and attaches to containers for a service in detached mode. Ommit -d if you don't want to run in detached mode.
$ docker compose up -d
```

## Running application locally

If you want to run the application locally in development/watch mode, follow these steps:

```bash
# If the containers are already running use this command to stop and remove containers, networks.
$ docker compose down

# Start the mongo database container, it is a prerequisites as the application connects to the database on start up.
$ docker compose up mongo mongo-seed -d

# Start application
# development
$ npm run start
or
# watch mode
$ npm run start:dev
or
# production mode
$ npm run start:prod
```

# Configuration

After the docker environment has successfully spun up, configure Keycloak to setup a client.

## Keycloak

Configure a client with the appropriate details:

1. Access keycloak administration console via `http://localhost:9080/admin` and login using username `admin` and password `admin`.
2. Create a new realm, by default you are logged into the `master` realm. From the side menu click `master` in the dropdown menu and click `Create Realm`. Name it `pokemon` (lowercase) and set `Enable` to `On` and click `Create`.
3. After creating the new realm, Keycloak should switch you into that realm, if not navigate to it from the dropdown menu.
4. From the side menu click `Clients` --> `Create client`. Use `pokemon-service` as the `Client ID`, `Pokemon Service` as the `Name` and click `Next`.
5. For the Capability config make sure `Client authentication` is **OFF** so the OIDC client is set to public access type. For the `Authentication Flow` we will **enable** `Authorization Code Flow` and `Resource Owner Password Credentials Grant` to generate tokens for this client. Once done click `Next`.
6. Under `Login settings` use the configuration below and click `Save`.

- **Root URL:** `http://localhost:8000`
- **Home URL:** `http://localhost:8000/swagger`
- **Valid redirect URIs:** `*`
- **Web origins:** `*`

7. After clicking `Save` Keycloak navigates you to the `Client details` page for `pokemon-service`.
8. Create a new User inside of the `pokemon` realm. Click on `Users` in the side menu and click `Add user`.
9. Use this configuration (ignore the other fields) and click `Create`:

- **Username**: pokemonuser
- **Email verified**: Yes

10. Keycloak will navigate you to the `User details` page for `pokemonuser` after clicking `Create`. Now click on `Credentials` and `Set password`.
11. Use the password `pokemonuser` and set **Temporary** to `Off`, click `Save` and `Save password` to confirm.

After these steps are completed proceed to **[Kong](#kong)**.

## Kong

Due to using the free version of Kong, we are unable to use their supported [OpenID Connect](https://docs.konghq.com/hub/kong-inc/openid-connect/) plugin. As an alternative we are using an [open source OpenID Connect](https://github.com/nokia/kong-oidc) plugin, which unfortunately is no longer maintained but still usable using a [forked project](https://github.com/revomatico/docker-kong-oidc/tree/master) and [image](https://hub.docker.com/r/cristianchiru/docker-kong-oidc).

**NOTE:** If you choose to use `confidential access type` instead of `public access type` for `Client Authentication` use the Client Secret from `Credentials` in `pokemon-service` Client Details for `client_secret` in `config/kong/kong.yaml`.

1. In the `kong.yaml` file inside of `./config/kong`, replace `<CHANGE_ME>` with the IP Address assigned to your network interface.

```
plugins:
    - name: oidc
    config:
        client_id: 'pokemon-service'
        client_secret: '<update if using client authentication confidential access type for OIDC>'
        realm: pokemon
        introspection_endpoint: 'http://<CHANGE_ME>/realms/pokemon/protocol/openid-connect/token/introspect'
        discovery: 'http://<CHANGE_ME>/realms/pokemon/.well-known/openid-configuration'

```

2. Restart the kong api gateway using `docker compose up -d kong-api-gateway`.
3. Proceed to [Usage](#usage),

# Usage

After completing the configurations in Keycloak and Kong from the steps above, you can access the exposed Swagger UI from the pokemon-service sitting behind the Kong API Gateway after successful authentication.

Access the Swagger UI via http://localhost:8000/api.

# References

- https://github.com/nokia/kong-oidc
- https://www.keycloak.org/docs/latest/securing_apps/#available-endpoints
- https://www.keycloak.org/docs/latest/server_admin/index.html#capability-config
- https://github.com/revomatico/docker-kong-oidc/tree/master

# Useful tutorials

- [Securing frontend JavaScript application with Keycloak](https://www.keycloak.org/docs/latest/securing_apps/#_javascript_adapter)
- [Securing backend NodeJs service with Keycloak](https://www.keycloak.org/docs/latest/securing_apps/#_nodejs_adapter)
