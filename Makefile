SHELL := /bin/bash

.PHONY: deploy-api deploy-front init-db remove-db dev-api build-api stop


init-db:
		source ./db/init.sh
		docker-compose up -d --build db

remove-db:
		docker compose rm --stop --volumes --force
		rm .env || true
		rm ./db/createdb.sql  || true

dev-api: 
		docker-compose up -d db
		nx serve api

build-api:
		nx build api --prod
		docker-compose build api



random_tag := $(shell cat /dev/urandom | tr -dc 'a-zA-Z' | fold -w 2 | head -n 1)
deploy-api:
		nx build api --prod
		@echo "Tag: $(shell date +%y%m%d)$(random_tag)"
		docker build -t black000fox/keepsy:api-$(shell date +%y%m%d)$(random_tag) -f ./apps/api/Dockerfile .
		docker push black000fox/keepsy:api-$(shell date +%y%m%d)$(random_tag)

random_FE_tag := $(shell cat /dev/urandom | tr -dc 'a-zA-Z' | fold -w 2 | head -n 1)
deploy-front:
		nx build front --prod
		@echo "Tag: $(shell date +%y%m%d)$(random_FE_tag)"
		docker build -t black000fox/keepsy:front-$(shell date +%y%m%d)$(random_FE_tag) -f ./apps/front/Dockerfile .
		docker push black000fox/keepsy:front-$(shell date +%y%m%d)$(random_FE_tag)

stop:
		docker-compose stop
