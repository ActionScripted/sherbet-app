# Variables
compose_base = ./docker-compose.yml
compose_deploy = ./docker-compose.deploy.yml
compose_upgrade = ./docker-compose.upgrade.yml

# Recipes: Default
.DEFAULT_GOAL := setup

# Recipes: Phony ("not a file")
.PHONY : bash $\
         build $\
         clean $\
         default $\
         deploy $\
         down $\
         frontend $\
         help $\
         migrate $\
         migrate-default $\
         recipes $\
         setup $\
         shell $\
         test $\
         up $\
         upgrade-build-run-django $\
         upgrade-build-run-frontend $\
         upgrade-django $\
         upgrade-frontend

# Recipes: Aliases
bash: shell

# Recipes
build: ## build/rebuild all services
	docker-compose -f $(compose_base) build

clean: ## remove build/run artifacts
	@find . -name __pycache__ -prune -exec rm -rf {} \;
	@rm -rf sherbet/static/*.{css,html,ico,js,map,txt}
	@rm -rf sherbet/static/{fonts,icons,images}
	@rm -rf node_modules
	@rm -rf venv

deploy:
	@echo "Nothing setup yet for deploys!"

down: ## stop all services
	docker-compose -f $(compose_base) down

frontend: ## build frontend assets
	docker-compose -f $(compose_base) run frontend npm run build

help: ## show help
	@echo "Usage: make [recipe]\n\nRecipes:"
	@grep -h '##' $(MAKEFILE_LIST) | grep -v grep | sed -e 's/\(.*\):.*## \(.*\)/\1|    \2/' | tr '|' '\n'

makemigrations: ## make migrations
	docker-compose run django python manage.py makemigrations

migrate-default: ## migrate database "default"
	docker-compose run django python manage.py migrate

migrate: migrate-default ## migrate all databases: "default"

setup: ## setup configs, env, etc.
	./bin/make-setup.sh

shell: ## start Django shell (bash)
	docker-compose -f $(compose_base) run django bash

test: ## run tests
	docker-compose -f $(compose_base) run pytest

up: ## start all services
	docker-compose -f $(compose_base) up

upgrade-build-run-django:
	docker-compose -f $(compose_base) -f $(compose_upgrade) build django
	docker-compose -f $(compose_base) -f $(compose_upgrade) run django bash

upgrade-build-run-frontend:
	docker-compose -f $(compose_base) -f $(compose_upgrade) build frontend
	docker-compose -f $(compose_base) -f $(compose_upgrade) run frontend bash

upgrade-django: upgrade-build-run-django build ## start Django shell (bash) as root with all files mounted
upgrade-frontend: upgrade-build-run-frontend build ## start frontend shell (bash) as root with all files mounted
