start:
	docker-compose up
stop:
	docker-compose down
rmi:
	docker image rmi nodejs-tdd-app
build-ts:
    pnpm run build-ts
.PHONY: start stop rmi build-ts