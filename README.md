# Task Managment System
Task Managment System (TMS) is a web application that allows users to manage their tasks. The application is built using the NodeJS framework and uses the ExpressJS framework for routing. The application uses the MongoDB database to store the tasks and users and implement AMQP protocol using RabbitMQ for message queueing. This application is built using the modular architecture and uses the MVC pattern.

## How to install from source
- Clone the repository - `git clone repo-link`
- `cd project-folder`
- You need to have valid MongoDB database and RabbitMQ connection
- Install dependencies - `pnpm install`
- Setup environment variable - `cp .env.example .env`
- Run development server `pnpm dev`
- Run test suite `pnpm test`
- Run production server `pnpm start`

Here is a the postman documentation for the API: [Postman Documentation](https://documenter.getpostman.com/view/24407924/2s9Yyweema)

## Technologies
- NodeJS
- ExpressJS
- MongoDB
- RabbitMQ
- Mongoose
- JWT
- Bcrypt
- Jest
- Supertest
- Prettier
- Pnpm


## API Endpoints
The API has the following endpoints:  

### Webhook Eendpoints
- POST `/api/v1/webhook` - A client subscribe to a webhook to get notifiy for actions performed on the task either created, updated or deleted.
```json
{
  "url": "webhook url",
}
```

### User Endpoints
- POST `/api/v1/user/signup` - Create a new user
```json
{
  "firstName": "first name",
  "lastName": "last name",
  "email": "email",
  "password": "Upassword"
  }
  ```

- POST `/api/v1/user/login` - Login a user
```json
{
  "email": "email",
  "password": "password"
}
```

### Task Endpoints

## Create a new task
To create a new task, you need to send a POST request to the `/api/v1/task` endpoint with the following payload:
```json
{
  "title": "Task title",
  "description": "Task description",
}
```

## Get all tasks
To get all tasks, you need to send a GET request to the `/api/v1/task` endpoint.
 

## Get a single task
To get a single task, you need to send a GET request to the `/api/v1/task/:id` endpoint.


## Update a task
To update a task, you need to send a PUT request to the `/api/v1/task/:id` endpoint with the following payload:
```json
{
  "title": "Task title",
  "description": "Task description",
}
```

## Delete a task
To delete a task, you need to send a DELETE request to the `/api/v1/task/:id` endpoint.
