SHELL := /bin/bash

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
.PHONY: random
deploy-api:
		nx build api --prod
		@echo "Tag: $(shell date +%y%m%d)$(random_tag)"
		docker build -t black000fox/keepsy:api-$(shell date +%y%m%d)$(random_tag) -f ./apps/api/Dockerfile .
		docker push black000fox/keepsy:api-$(shell date +%y%m%d)$(random_tag)

stop:
		docker-compose stop
