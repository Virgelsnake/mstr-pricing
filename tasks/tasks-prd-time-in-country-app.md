# Task List: Time in Country App

## Relevant Files

- `server/models/User.js` - Mongoose schema for user accounts.
- `server/models/Jurisdiction.js` - Mongoose schema for jurisdictions (name, day limit).
- `server/routes/auth.js` - API routes for user signup and login.
- `server/routes/jurisdictions.js` - CRUD API routes for jurisdictions.
- `client/src/components/Calendar.js` - Main component for displaying the calendar and handling day allocation.
- `client/src/components/Dashboard.js` - Component for displaying jurisdiction usage trackers.
- `client/src/services/api.js` - Centralized functions for making API calls to the backend.

### Notes

- The project will be structured as a monorepo with a `client` directory for the React frontend and a `server` directory for the Node.js/Express backend.
- We will use a library like `react-big-calendar` for the calendar UI and `react-dnd` for drag-and-drop functionality.

## Tasks

- [x] 1.0 Set Up Project Structure and Backend
  - [x] 1.1 Initialize Node.js project, install Express and Mongoose.
  - [x] 1.2 Set up backend folder structure (`models`, `routes`, `controllers`).
  - [x] 1.3 Define Mongoose schemas for `User` and `Jurisdiction`.
  - [x] 1.4 Implement API endpoints for user authentication (signup, login).
  - [x] 1.5 Set up the React frontend using Create React App.

- [x] 2.0 Implement Jurisdiction Management
  - [x] 2.1 Create CRUD API endpoints for jurisdictions.
  - [x] 2.2 Build a React component (`JurisdictionForm`) for creating and editing jurisdictions.
  - [x] 2.3 Build a React component (`JurisdictionList`) to display all user jurisdictions.
  - [x] 2.4 Connect the frontend components to the backend API to manage jurisdictions.

- [x] 3.0 Build the Calendar and Day Allocation UI
  - [x] 3.1 Integrate a calendar library (`react-big-calendar`) and a drag-and-drop library (`react-dnd`).
  - [x] 3.2 Create a `DayToken` component representing a single day for a jurisdiction.
  - [x] 3.3 Implement the main `Calendar` component to display events.
  - [x] 3.4 Enable dragging `DayToken`s and dropping them onto the calendar.
  - [x] 3.5 Save the allocated days to the database via an API call.
  - [x] 3.6 Add controls to switch between monthly and yearly calendar views.

- [x] 4.0 Create the Dashboard and Tracking View
  - [x] 4.1 Create the main `Dashboard` component.
  - [x] 4.2 Fetch all jurisdiction and allocated day data from the backend.
  - [x] 4.3 For each jurisdiction, implement a progress bar to visualize day usage.

- [ ] 5.0 Finalize UI/UX and Deploy
  - [ ] 5.1 Apply consistent styling to all components for a clean and intuitive UI.
  - [ ] 5.2 Ensure the application is responsive.
  - [ ] 5.3 Write basic unit tests for critical components and API logic.
  - [ ] 5.4 Prepare the application for deployment.
