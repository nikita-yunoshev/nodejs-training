start:
	docker-compose up -d

stop:
	docker-compose down

node-exec:
	docker exec -i nodejs /bin/bash

