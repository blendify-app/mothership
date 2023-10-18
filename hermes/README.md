# Hermes - Core API and WebSocket Server (WIP)

Hermes is a powerful backend server that serves as the core API and WebSocket server for Blendify. It provides a robust foundation for building real-time and RESTful services.

## Getting Started

If this is your first time encountering Go, please follow [the instructions](https://golang.org/doc/install) to install Go on your computer. This repo requires **Go 1.21 or above**.

At this time, you have a RESTful API server running at `http://127.0.0.1:8080`. It provides the following endpoints:

* `GET /healthcheck`: a healthcheck service provided for health checking purpose (needed when implementing a server cluster)
* `GET /v1/users`: returns a paginated list of the albums
* `GET /v1/users/:id`: returns the detailed information of an album
* `POST /v1/users`: creates a new album
* `PUT /v1/users/:id`: updates an existing album
* `DELETE /v1/users/:id`: deletes an album

## Project Layout
 
```
.
├── cmd                  main applications of the project
│   └── http             the API server application
├── config               configuration files for different environments
├── internal             private application and library code
│   ├── users            user-related features
│   ├── db               database related utils
│   ├── auth             authentication feature
│   ├── healthcheck      healthcheck feature
├── pkg                  public library code
```

### Implementing a New Feature

Implementing a new feature typically involves the following steps:

1. Develop the service that implements the business logic supporting the feature. Please refer to `internal/users/service.go` as an example.
2. Develop the RESTful API exposing the service about the feature. Please refer to `internal/users/controller.go` as an example.
3. Develop the repository that persists the data entities needed by the service. Please refer to `internal/users/repository.go` as an example.
4. Wire up the above components together by injecting their dependencies in the main function. Please refer to 
   the `users.RegisterHandlers()` call in `cmd/http/main.go`.

## Deployment (IGNORE)

The application can be run as a docker container. You can use `make build-docker` to build the application 
into a docker image. The docker container starts with the `cmd/server/entryscript.sh` script which reads 
the `APP_ENV` environment variable to determine which configuration file to use. For example,
if `APP_ENV` is `qa`, the application will be started with the `config/qa.yml` configuration file.

You can also run `make build` to build an executable binary named `server`. Then start the API server using the following
command,

```shell
./server -config=./config/prod.yml
```

```
