\# Haven 87 — Volunteer Management Backend



A full-stack REST API for connecting volunteers with community organizations across Nigeria.



\*\*Live API:\*\* https://volunteer-app-backend-8f8p.onrender.com



\## Tech Stack



\- Node.js + Express.js

\- MongoDB + Mongoose

\- JWT Authentication

\- bcryptjs

\- Joi Validation

\- Deployed on Render



\## Features



\- User registration and login with role-based access (Volunteer / Organizer / Admin)

\- Organizer CAC verification

\- Create, browse, update, and delete volunteer opportunities

\- Apply to opportunities with application status tracking

\- Search, filter, and pagination

\- Admin endpoints for verifying organizations

\- Strict data isolation per user



\## API Endpoints



Base URL: https://volunteer-app-backend-8f8p.onrender.com/api



\### Authentication

\- POST /auth/register — Register a new user

\- POST /auth/login — Login

\- GET /auth/me — Get current user (auth required)



\### Opportunities

\- GET /opportunities — List all

\- GET /opportunities/:id — Get one

\- POST /opportunities — Create (organizer only)

\- PUT /opportunities/:id — Update (organizer only)

\- DELETE /opportunities/:id — Delete (organizer only)

\- GET /opportunities/:id/applications — View applicants (organizer only)



\### Applications

\- POST /opportunities/:id/apply — Apply (volunteer only)

\- GET /applications/my — My applications (volunteer)

\- PUT /applications/:id/status — Approve/reject (organizer)



\### Admin

\- GET /admin/organizers — All organizers

\- GET /admin/organizers/pending — Pending verification

\- PUT /admin/organizers/:id/verify — Verify organizer

\- PUT /admin/organizers/:id/reject — Reject organizer



\## Test Accounts



\- Volunteer: chidi@haven87.com / password123

\- Organizer: foodbank@haven87.com / password123

\- Admin: admin@haven87.com / admin123



\## Running Locally



git clone https://github.com/oguntadeeeman-ux/volunteer-app-backend.git

cd volunteer-app-backend

npm install

npm run dev



\## Team



Group 87 — TS Academy Backend Development Capstone

\- Backend Engineer: Eeman Oguntade

