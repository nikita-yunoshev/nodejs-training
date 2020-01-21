node-service=node

start:
	docker-compose up

stop:
	docker-compose down

node-exec:
	docker exec -it $(node-service) /bin/bash

run-seeds:
	docker exec -it $np(node-service) npm run migrate-latest