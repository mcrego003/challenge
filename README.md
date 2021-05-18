# Adidas Challenge

# Technologies
- Done with NodeJS(10.16.0) and NestJS
- NATS for comunication between microservices and client.
- Database with MongoDB
- Docker and docker compose for containers

## How to run the project
### Prerequisites
- Docker
### Run
* Use `docker compose up` command into the root project.

## Tests
- Only tests for subscription service
- Go to subscription ./subscription-service folder and run `npm run test`

## API Documentation
Done with OpenAPI. Once the server is running, go to: [API docs](http://localhost:3000/api)

## Missing things
- More Testing
- Database password
- CI/CD
- Environment variables
- Better Docker and docker-compose files
- constants for messages and dependency names