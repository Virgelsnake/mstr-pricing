# Deployment Instructions

## Objective
This guide provides the steps to run the Time in Country application in a production environment.

## Prerequisites
- Node.js and npm installed
- MongoDB instance running and accessible
- Production build of the client application created (run `npm run build` in the `client` directory)

## Steps

1.  **Set Environment Variables**:
    Before running the server, you must set the following environment variables. It is recommended to use a `.env` file for this.

    -   `NODE_ENV`: Set to `production` to enable production-specific features.
    -   `PORT`: The port on which the server will run (e.g., `5000`).
    -   `MONGO_URI`: The connection string for your MongoDB database.
    -   `JWT_SECRET`: A secret key for signing JSON Web Tokens.

2.  **Start the Server**:
    Navigate to the `server` directory and run the following command to start the application:

    ```bash
    node server.js
    ```

3.  **Access the Application**:
    Open your web browser and navigate to `http://localhost:PORT`, where `PORT` is the value you set in the environment variables.

## Troubleshooting
-   If the application does not load, check the browser's developer console and the server logs for any errors.
-   Ensure that the MongoDB connection string is correct and that the database is running.
-   Verify that the `client/build` directory exists and contains the static frontend assets.
