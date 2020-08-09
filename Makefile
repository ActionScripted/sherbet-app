# Variables
compose_base = ./compose/base.yml
compose_upgrade = ./compose/upgrade.yml


# Recipes: Phony ("not a file")
.PHONY : bash $\
         build $\
         clean $\
         default $\
         deploy $\
         dev $\
         development $\
         down $\
         shell $\
         update $\
         upgrade


# Recipes: Default (first is "default")
default: development


# Recipes: Aliases
bash: shell
dev: development
update: upgrade


# Recipes
build:
	docker-compose -f $(compose_base) build

deploy:
	@echo "Nothing setup yet for deploys!"

development:
	docker-compose -f $(compose_base) up

down:
	docker-compose -f $(compose_base) down
	docker-compose -f $(compose_base) down

shell:
	docker-compose -f $(compose_base) run django bash

upgrade:
	docker-compose -f $(compose_base) -f $(compose_upgrade) run django bash
