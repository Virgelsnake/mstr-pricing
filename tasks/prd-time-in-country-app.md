# Product Requirements Document: Time in Country App

## 1. Introduction/Overview

This document outlines the requirements for the "Time in Country" app. The application helps users with multiple residencies track the number of days they spend in different countries to avoid impacting their tax residency status. Users can define jurisdictions with specific day limits, allocate those days on a calendar, and visually track their usage to ensure they stay within the set limits.

## 2. Goals

- To provide a clear, visual way for users to plan and track their stays across multiple jurisdictions.
- To prevent users from accidentally exceeding their allowed days in any given country.
- To build a secure web application with user accounts to store and sync data across devices.

## 3. User Stories

- As an individual with multiple residencies, I want to add each country I visit and set the maximum number of days I can stay, so that I can manage my tax obligations.
- As a user, I want to see all my available days for each country as "blocks" or "tokens", so I can easily visualize my remaining time.
- As a user, I want to drag and drop these day blocks onto a calendar, so I can plan my travel for the year.
- As a user, I want to see a running total of days used for each country, so I can quickly understand my current status.
- As a user, I want to be able to switch between monthly and yearly calendar views to facilitate both short-term and long-term planning.

## 4. Functional Requirements

1. **User Authentication:**
    - The system must allow users to sign up and log in to a personal account.
    - The system must securely store user data.
2. **Jurisdiction Management:**
    - The system must allow users to create a new jurisdiction by providing a name and a total number of allowed days.
    - The system must allow users to view, edit, and delete existing jurisdictions.
3. **Day Allocation & Calendar:**
    - For each jurisdiction, the system must generate a corresponding number of "day blocks" or "tokens".
    - The system must provide a calendar interface.
    - Users must be able to drag and drop day blocks onto the calendar to assign a day to a specific jurisdiction.
    - The system must allow users to remove or reassign day blocks on the calendar.
4. **Dashboard & Tracking:**
    - The system must display a dashboard with a visual indicator (e.g., a progress bar) showing the number of days used vs. the total allowed for each jurisdiction.
5. **Calendar Views:**
    - The system must provide switchable calendar views, including at a minimum: monthly and yearly.

## 5. Non-Goals (Out of Scope)

- The application **will not** provide any official tax or legal advice. It is solely a tracking tool.
- The initial version **will not** handle complex residency rules (e.g., rolling 180-day periods).
- The initial version **will not** send automated email or push notifications.
- The application **will not** automatically import travel data from other sources (e.g., email, other calendar apps).

## 6. Design Considerations (Optional)

- The UI should be clean, intuitive, and visually appealing.
- The drag-and-drop functionality should be smooth and responsive.
- A clear and simple dashboard is crucial for at-a-glance information.

## 7. Technical Considerations (Optional)

- The application will be a web app.
- It will require a database to store user accounts, jurisdictions, and calendar data.

## 8. Success Metrics

- High user retention and engagement.
- Positive user feedback regarding ease of use and effectiveness in planning.

## 9. Open Questions

- None at this time.
