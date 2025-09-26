# Node.js Express Server

This repository contains a RESTful API server built with Node.js and the Express framework. It uses a MongoDB database for data persistence through the Mongoose library.

## Key Features

*   **API Endpoints:** The server exposes endpoints to perform CRUD (Create, Read, Update, Delete) operations on two main resources: **Users** and **Tasks**.
    *   You can manage users through `/api/users`.
    *   You can manage tasks through `/api/tasks`.

*   **Data Models:**
    *   **User:** A user has a `name`, `email`, a list of `pendingTasks`, and the `dateCreated`.
    *   **Task:** A task has a `name`, `description`, `deadline`, a `completed` status, an `assignedUserName`, and the `dateCreated`.

*   **Database Connection:** The server connects to a MongoDB database.

    > **Important:** The database connection string, including credentials, is hardcoded in `server.js`. This is a security risk and should be replaced with a more secure method like environment variables in a production environment.

In short, this is a classic example of a simple backend service for a to-do list or task management application.
