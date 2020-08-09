# Recipe targets (that aren't files...all of them)
.PHONY : bash build deploy dev development down shell update upgrade


# Recipes: Default (first is "default")
default: development


# Recipes: Aliases
bash: shell
dev: development
update: upgrade


# Recipes
build:
	docker-compose -f ./compose/base.yml build

deploy:
	@echo "Nothing setup yet for deploys!"

development:
	docker-compose -f ./compose/base.yml up

down:
	docker-compose -f ./compose/base.yml down
	docker-compose -f ./compose/base.yml down

shell:
	docker-compose -f ./compose/base.yml run django bash

upgrade:
	docker-compose -f ./compose/base.yml -f ./compose/upgrade.yml run django bash
