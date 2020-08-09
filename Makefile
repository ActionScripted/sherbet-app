# Variables
compose_base = ./compose/base.yml
compose_upgrade = ./compose/upgrade.yml

# Recipes: Default
.DEFAULT_GOAL := up


# Recipes: Phony ("not a file")
.PHONY : bash $\
         build $\
         clean $\
         default $\
         deploy $\
         down $\
         shell $\
         up $\
         update $\
         upgrade $\
         upgrade-build-run


# Recipes: Aliases
bash: shell
update: upgrade
upgrade: upgrade


# Recipes
build:
	docker-compose -f $(compose_base) build

clean:
	rm -rf node_modules

deploy:
	@echo "Nothing setup yet for deploys!"

down:
	docker-compose -f $(compose_base) down

shell:
	docker-compose -f $(compose_base) run django bash

up:
	docker-compose -f $(compose_base) up

upgrade-build-run:
	docker-compose -f $(compose_base) -f $(compose_upgrade) build
	docker-compose -f $(compose_base) -f $(compose_upgrade) run django bash

upgrade: upgrade-build-run build
