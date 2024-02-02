### Project
Task Managment System (TMS) is a web application that allows users to manage their tasks. The application is built using the NodeJS framework and uses the ExpressJS framework for routing. The application uses the MongoDB database to store the tasks and users. 

## How to install from source
- Clone the repository - `git clone repo-link`
- `cd project-folder`
- You need to have valid MongoDB database and RabbitMQ connection
- Install dependencies - `pnpm install`
- Setup environment variable - `cp .env.example .env`
- Run development server `pnpm dev`
- Run test suite `pnpm test`
- Run production server `pnpm start`