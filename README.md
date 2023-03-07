# Fastify Back to Basics

This is a demo project to show how to use Fastify with Typescript.

## Content
 * [x] Fastify
 * [x] Typescript
 * [x] Tap
 * [x] ESLint
 * [x] Prettier
 * [x] Swagger
 * [x] DotEnv
 * [x] Docker
 * [x] MongoDb
 * [x] JWT

## Use Cases
 * [x] Health Check
 * [x] Signup a new user
 * [x] Login
 * [x] Get user info
 * [ ] Add some protected routes

### Signup a new user

```bash
curl -X POST \
  'http://localhost:4000/api/user/signup' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "jack",
  "password": "Password123",
  "firstname": "Jack",
  "lastname": "White",
  "email": "jack.white@email.com"
}'
```

### User Login

```bash
curl -X POST \
  'http://localhost:4000/api/user/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "jack",
  "password": "Password123"
}'
```

### Get user info

```bash
curl -X 'GET' \
  'http://localhost:4000/api/user/me' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>' 
```

## Initial Setup

```bash
cp .env.dist .env
```

## Available actions

### Start local server in development mode

```bash
make start-dev
```
then open: http://127.0.0.1:8080

### Start local server in production mode

```bash
make build
make start-prod
```
then open: http://127.0.0.1:8080

### Open API Documentation

open: http://127.0.0.1:8080/documentation

### Start container

```bash
make up
```

### Stop container

```bash
make down
```

### Show container logs

```bash
make logs
```

### Show container status

```bash
make status
```

### Launch test

```bash
make testHelper
```

### Launch test with coverage

```bash
make testHelper-coverage
```

### Launch test with filter

```bash
make testHelper-coverage filter=<pattern>
```

### Linter

```bash
make lint
```

### Linter with fix

```bash
make lint-fix
```

### Format

```bash
make format
```

### Pre-commit hook

```bash
make pre-commit-install
```
then copy the content of `pre-commit-dist` into `.husky/pre-commit`
