# Haven87 - Volunteer Management MVP

Haven87 is a collaborative Minimum Viable Product (MVP) developed by Group 87 to connect volunteers with community organizations across Nigeria.
The platform enables volunteers to discover and apply for community service opportunities, while organizers can publish activities and manage applications.

## Table of Contents

- [Project Overview](#project-overview)
- [Project Links](#project-links)
- [Key Features](#key-features)
- [How the System Works](#how-the-system-works)
- [Getting Started](#getting-started)
- [Running the Project Locally](#running-the-project-locally)
- [API Documentation and Testing](#api-documentation-and-testing)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Testing and Deployment](#testing-and-deployment)
- [Team Contributions](#team-contributions)
- [Security Considerations](#security-considerations)
- [Project Status](#project-status)

## Project Overview

Haven87 provides a platform for connecting volunteers with community service opportunities. 
It brings volunteers, organizers, and administrators into one system with features for authentication, opportunity management, applications, and organizer verification.

The project consists of a React frontend, a Node.js and Express backend, and a MongoDB database. 
The frontend provides the user interface, while the backend processes requests, applies access controls, and manages data through the database.

## Project Links

- **Live web application:** https://haven87.netlify.app/
- **Backend API:** https://volunteer-app-backend-8f8p.onrender.com/
- **Postman API documentation:** https://documenter.getpostman.com/view/56622602/2sBYHQ1hZd
- **GitHub repository:** https://github.com/JAMIN-exe/Haven87

## Key Features

- User registration and login.
- Role-based access for volunteers, organizers, and administrators.
- Browsing and viewing volunteer opportunities.
- Creating, updating, and deleting opportunities by authorized organizers.
- Submitting applications for volunteer opportunities.
- Viewing applications and managing their statuses.
- Administrative review and verification of organizers.

Access to specific features depends on the user's role and permissions.

## How the System Works

The general workflow of Haven87 is as follows:

1. **Access the platform:** Users open the web application in a browser.
2. **Register or log in:** Users create an account or authenticate with existing credentials.
3. **Browse opportunities:** Volunteers view available community service activities.
4. **Apply for opportunities:** Volunteers submit applications for activities they are interested in.
5. **Manage activities and applications:** Authorized organizers create opportunities and review applications.
6. **Administrative review:** Administrators manage organizer verification and related administrative operations.
7. **Process and return data:** The backend handles requests and communicates with the database, then returns a response to the frontend.

### System Architecture

The main application flow is:

Browser (React and Vite) → Express REST API → MongoDB

The frontend communicates with the backend through HTTP requests. Protected operations require authentication and the appropriate role permissions.

## Getting Started

### Option 1: Use the Live Application

1. Visit https://haven87.netlify.app/.
2. Register or log in using an appropriate account.
3. Explore the features available to your account role.
4. Use the Postman documentation to explore the backend API directly.

You may need to create your own account. Do not assume that administrator or organizer credentials are publicly available.

### Option 2: Run the Project Locally

#### Requirements

- Node.js and npm
- Git
- Access to a MongoDB database

Clone the repository:

```bash
git clone https://github.com/JAMIN-exe/Haven87.git
cd Haven87
```

## Running the Project Locally

### Backend Setup

From the repository root, install the backend dependencies:

```bash
npm install
```

Create a `.env` file in the repository root containing your local configuration:

```env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-private-secret
PORT=5000
```

Replace the example values with valid private configuration values. The database must be reachable for database-backed features to work.

Start the backend, provided the project defines this script:

```bash
npm run dev
```

The backend is expected to run at:

```
http://localhost:5000
```

### Frontend Setup

Open a second terminal and enter the frontend directory:

```bash
cd frontend
npm install
```

To connect the frontend to your local backend, create a `.env.local` file inside the `frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend, provided the relevant script is available:

```bash
npm run dev
```

Open the local address printed by Vite in the terminal.

**Note:** Check the root and frontend `package.json` files for the available scripts. Environment variable names and setup requirements should match the project's actual configuration.

## API Documentation and Testing

Haven87's API documentation is published through Postman.

**[Open the Haven87 API Documentation](https://documenter.getpostman.com/view/56622602/2sBYHQ1hZd)**

The documentation covers the available API operations for:

- Authentication
- Volunteer opportunities
- Volunteer applications
- Administrative organizer management

### How to Test the API

1. Open the published Postman documentation.
2. Select the endpoint you want to test.
3. Review its HTTP method, URL, required parameters, request body, and authorization requirements.
4. Set the base URL to the hosted backend or your local backend.
5. Register a test account or log in with valid test credentials.
6. For protected requests, provide the appropriate JWT access token.
7. Send the request and inspect the HTTP status and response body.
8. Test both valid requests and selected error scenarios, such as missing credentials or insufficient permissions.

Protected endpoints typically use the following authorization header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Use test accounts and never include real passwords, private tokens, or database credentials in public documentation.

## Project Structure

The backend is located at the repository root, while the React frontend is contained in the `frontend/` directory.

```text
.
├── frontend/       # React web application
├── src/            # Backend routes, controllers, models and middleware
├── server.js       # Backend entry point
└── package.json    # Backend dependencies and scripts
```

## Technology Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **API documentation and testing:** Postman
- **Hosting:** Netlify for the frontend and Render for the backend

## Testing and Deployment

The application was already deployed before the API documentation and testing work described here.

Testing activities focused on selected API workflows, including:

- User registration and authentication.
- Retrieving and viewing opportunities.
- Creating, updating, and deleting opportunities.
- Submitting applications and managing application statuses.
- Checking authentication and role-based access restrictions.
- Reviewing selected administrative organizer management endpoints.

The existing live frontend and backend were also checked to confirm that opportunity data could be retrieved and displayed in the web application.

These checks cover selected workflows and do not imply that every endpoint or possible scenario has been fully tested. 
For reproducibility, use the published Postman documentation and record the actual status and response returned by each request.

## Team Contributions

Haven87 was developed collaboratively by Group 87.

- **[JAMIN-exe](https://github.com/JAMIN-exe) - Frontend Development:** Developed the React web interface and user flows for volunteers, organizers, and administrators.

- **[oguntadeeeman-ux](https://github.com/oguntadeeeman-ux) - Backend Development:** Built the Express API and MongoDB-backed features for authentication, opportunities, applications, and organizer verification.

- **[Alli Olamilekan](https://github.com/allibay003) - API Documentation and Testing:** Prepared the published Postman API documentation, documented API usage, tested selected endpoints and workflows, and checked the existing live application and backend.

- **[sarahwest20033-pixel](https://github.com/sarahwest20033-pixel) - Project Setup and Collaboration:** Contributed to project setup, shared ideas, and supported collaboration during team meetings.

## Security Considerations

- Keep environment files and credentials private.
- Do not commit real passwords, JWT tokens, or database connection strings.
- Use test accounts when exploring the API.
- Use only accounts and database resources you are authorized to access.
- Protected endpoints require valid authentication and appropriate permissions.

## Project Status

Haven87 is a collaborative MVP. The existing application is available online, and its documented API workflows can be explored using Postman. Further testing and development may be needed before the project is suitable for production use.
