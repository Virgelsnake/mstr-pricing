# Title: Firebase Project Setup and Configuration

## Objective

This document provides the necessary steps to configure your local environment with the credentials from your Firebase project. This is essential for both the backend server and the frontend client to communicate with Firebase services.

## Prerequisites

- A Firebase project has been created at [https://console.firebase.google.com/](https://console.firebase.google.com/).
- You have owner or editor permissions for the Firebase project.

## Steps

### Part 1: Backend Configuration (Service Account Key)

Your server needs a **Service Account Key** to securely authenticate with Firebase services. This is a sensitive file and should not be shared publicly.

1. **Navigate to Firebase Console**: Open your project in the Firebase console.
2. **Go to Service Accounts**: Click the gear icon next to **Project Overview** in the top-left, then select **Project settings**. In the settings page, click on the **Service Accounts** tab.
3. **Generate New Private Key**: Click the **Generate new private key** button. A confirmation dialog will appear.
4. **Confirm and Download**: Click **Generate key**. A JSON file will be downloaded to your computer. This is your Service Account Key.
5. **Place the Key**:
    - Rename the downloaded file to `serviceAccountKey.json`.
    - Move this file into the `server/config/` directory that I just created for you.

After this, your server will be able to start and connect to Firebase.

### Part 2: Frontend Configuration (Client SDK Snippet)

Your client-side application (React, Vue, etc.) also needs credentials to connect to Firebase. These are different from the backend key and are safe to include in your frontend code.

1. **Navigate to Firebase Console**: Open your project in the Firebase console.
2. **Go to Project Settings**: Click the gear icon next to **Project Overview** in the top-left, then select **Project settings**.
3. **Find Your App**: In the **General** tab, scroll down to the **Your apps** section. If you haven't registered a web app yet, click the web icon (`</>`) to create one.
4. **Get Config Object**: Select your web app. In the app's settings, find the **Firebase SDK snippet** section and select the **Config** option.
5. **Copy the Credentials**: You will see a block of code that looks like this:

    ```javascript
    const firebaseConfig = {
      apiKey: "AIzaSy...",
      authDomain: "your-project-id.firebaseapp.com",
      projectId: "your-project-id",
      storageBucket: "your-project-id.appspot.com",
      messagingSenderId: "...",
      appId: "1:...:web:...",
      measurementId: "G-..."
    };
    ```

6. **Save for Later**: Please copy this entire `firebaseConfig` object and have it ready. We will need it when we start migrating the client-side of your application.

## Troubleshooting

- **`serviceAccountKey.json not found` error**: This means the server could not find the key file. Ensure the file is named exactly `serviceAccountKey.json` and is located directly inside the `server/config/` directory.
- **Permission Errors**: If your server has trouble connecting, ensure the service account has the necessary IAM roles (like `Editor` or `Firebase Admin`) in your Google Cloud project settings.
