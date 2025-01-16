GraphQL Learning Project
This is a simple project designed to learn GraphQL using NestJS in the backend and ReactJS in the frontend. The project demonstrates essential GraphQL operations like user registration, user login, fetching a single user, and fetching a list of users.

The backend is built with SQLite, JWT token authentication, Apollo Server, and Sequelize as the ORM. The frontend uses Axios to send requests to the backend and integrates with ReactJS for building the user interface.

🚀 Features
Backend:
SQLite: Lightweight database for storage.
GraphQL API: Built using Apollo Server and NestJS.
Sequelize ORM: For database modeling and querying.
JWT Authentication: Secure login and token-based authentication.
Frontend:
ReactJS: Modern UI built with React.
Axios: For making HTTP requests to the backend GraphQL API.
Implemented API Endpoints:
Register User: Create a new user in the database.
Login User: Authenticate a user and generate a JWT token.
Find One User: Fetch a single user by their ID.
Users List: Retrieve a list of all registered users.
📂 Project Structure
The project is divided into two directories:

Backend: Contains the NestJS-based GraphQL server.
Frontend: Contains the ReactJS-based client application.
🛠️ Installation and Usage
Backend Setup:
Navigate to the backend directory:
bash
cd backend
Install the dependencies:
bash

yarn
Start the backend server (in development mode):
bash


yarn start:dev
The backend server will start, and the GraphQL playground will be available at http://localhost:3000/graphql.

Frontend Setup:
Navigate to the frontend directory:
bash


cd frontend
Install the dependencies:
yarn

Start the frontend application:
bash
npm start
The frontend will be available at http://localhost:3003.

📦 Dependencies
Backend:
@nestjs/graphql
apollo-server-express
jwt-token
sequelize
sqlite3
Frontend:
ReactJS
Axios
Apollo Client
🧪 How to Test
Start the backend server using yarn start:dev.
Start the frontend application using npm start.
Use the frontend interface or send GraphQL queries via the GraphQL playground.

📝 Notes
The backend uses SQLite for simplicity. It can be replaced with other databases (e.g., PostgreSQL or MySQL) by updating the Sequelize configuration.
This project is intended for learning purposes and may not follow all production-level best practices.
📂 Repository
The full project code is available on GitHub: GraphQL Learning Project

Feel free to fork, experiment, and share your feedback! 🚀

#GraphQL #NestJS #ReactJS #Sequelize #WebDevelopment #LearningProject
