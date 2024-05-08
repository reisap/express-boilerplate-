start:
	docker-compose up
stop:
	docker-compose down
rmi:
	docker image rmi nodejs-tdd-app

.PHONY: start stop rmi