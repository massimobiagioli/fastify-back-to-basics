.PHONY: up down logs status mongo-shell build start-dev start-prod fictures fixtures-test test test-coverage lint lint-fix format test-filter pre-commit-install help
.DEFAULT_GOAL := help
run-docker-compose = docker compose -f docker-compose.yml
run-npm-run = npm run

up: # Start containers and tail logs
	$(run-docker-compose) up -d

down: # Stop all containers
	$(run-docker-compose) down

logs: # Tail container logs
	$(run-docker-compose) logs -f mongodb

status: # Show status of all containers
	$(run-docker-compose) ps

mongo-shell: # Open mongodb database shell
	$(run-docker-compose) exec mongodb mongosh

build: # Build app for production
	$(run-npm-run) build

start-dev: # Start app in development mode
	$(run-npm-run) start:dev

start-prod: build # Start app in production mode
	$(run-npm-run) start:prod

fixtures: # Load fixtures
	$(run-npm-run) fixtures:load:dev

fixtures-test: fixtures-test # Load fixtures test
	$(run-npm-run) fixtures:load:test

test: fixtures-test # Run all tests
	$(run-npm-run) test

test-coverage: # Run all tests with coverage
	$(run-npm-run) test:coverage

test-filter: fixtures-test # Run all tests with filter
	$(run-npm-run) test:filter --filter=$(filter)

lint: # Run linter
	$(run-npm-run) lint

lint-fix: # Run linter and fix errors
	$(run-npm-run) lint:fix

format: # Run formatter
	$(run-npm-run) format

pre-commit-install: # Run pre-commit install
	$(run-npm-run) prepare

help: # make help
	@awk 'BEGIN {FS = ":.*#"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z0-9_-]+:.*?#/ { printf "  \033[36m%-27s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
