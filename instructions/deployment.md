# Deployment Instructions

## Objective
This guide provides the steps to run the Time in Country application in a production environment.

## Prerequisites
- Node.js and npm installed
- A Google Firebase project set up with Authentication and Firestore enabled.
- Production build of the client application created (run `npm run build` in the `client` directory)

## Steps

1.  **Set Environment Variables**:
    Before running the server, you must set up your Firebase Admin SDK credentials.

    -   Download your service account key JSON file from your Firebase project settings.
    -   Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the absolute path of this JSON file.

    Example:

    ```bash
    export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/serviceAccountKey.json"
    ```

    You should also set the following environment variables. It is recommended to use a `.env` file for this.

    -   `NODE_ENV`: Set to `production` to enable production-specific features.
    -   `PORT`: The port on which the server will run (e.g., `5000`).

2.  **Start the Server**:
    Navigate to the `server` directory and run the following command to start the application:

    ```bash
    node server.js
    ```

3.  **Access the Application**:
    Open your web browser and navigate to `http://localhost:PORT`, where `PORT` is the value you set in the environment variables.

## Troubleshooting
-   If the application does not load, check the browser's developer console and the server logs for any errors.
-   Ensure that the `GOOGLE_APPLICATION_CREDENTIALS` environment variable is set correctly and points to a valid service account key file.
-   Verify that the `client/build` directory exists and contains the static frontend assets.
