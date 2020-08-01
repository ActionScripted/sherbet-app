# Recipe targets (that aren't files...all of them)
.PHONY : bash build deploy dev development down shell update


# Recipe aliases
bash: shell
dev: development


# Recipes
build:
	docker-compose build

deploy:
	@echo "Nothing setup yet for deploys!"

development:
	docker-compose up

down:
	docker-compose down
	docker-compose down

shell:
	docker-compose run django bash

update:
	docker-compose -f docker-compose.yml -f docker-compose.upgrade.yml run django bash
