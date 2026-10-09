# Haven87 Volunteer Management System API Documentation

## 1. Overview

The Haven87 Volunteer Management System API supports user authentication, volunteer opportunity management, volunteer applications, and administrator management of organizers.

**Base URL:** https://volunteer-app-backend-8f8p.onrender.com

All endpoints below are relative to the base URL.

## 2. Authentication

Endpoints that require authentication use a JSON Web Token (JWT). Include the token in the request header:

```
Authorization: Bearer <your_token>
```

Use the token for the appropriate account role: volunteer, organizer, or admin. Do not share tokens publicly.

## 3. Standard Response Format

Successful responses generally follow this structure:

```json
{
  "success": true,
  "message": "Request completed successfully",
  "data": {}
}
```

Error responses generally follow this structure:

```json
{
  "success": false,
  "message": "An error occurred",
  "data": null
}
```

The actual message and data depend on the endpoint and result.

## 4. Authentication Endpoints

### Register a user

- **Method:** POST
- **Endpoint:** `/api/auth/register`
- **Access:** Public

Example request body:

```json
{
  "fullName": "Test Volunteer",
  "email": "volunteer@example.com",
  "password": "your_password",
  "role": "volunteer"
}
```

The `role` can be `volunteer`, `organizer`, or `admin`. Organizer registration requires a `cacNumber`.

### Log in

- **Method:** POST
- **Endpoint:** `/api/auth/login`
- **Access:** Public

Example request body:

```json
{
  "email": "volunteer@example.com",
  "password": "your_password"
}
```

### Get the current user's profile

- **Method:** GET
- **Endpoint:** `/api/auth/me`
- **Access:** Authenticated users

Requires a valid JWT.

## 5. Volunteer Opportunity Endpoints

### List opportunities

- **Method:** GET
- **Endpoint:** `/api/opportunities`
- **Access:** Public

Returns available opportunities. A category filter can be supplied, for example: `/api/opportunities?category=Food%20Relief`.

### Get one opportunity

- **Method:** GET
- **Endpoint:** `/api/opportunities/:id`
- **Access:** Public

Replace `:id` with the opportunity ID.

### Create an opportunity

- **Method:** POST
- **Endpoint:** `/api/opportunities`
- **Access:** Organizer

Example request body:

```json
{
  "title": "Community Health Awareness Program",
  "description": "Support a community health awareness event.",
  "category": "Health",
  "location": "Community Centre",
  "date": "2027-01-15",
  "slots": 20
}
```

### Update an opportunity

- **Method:** PUT
- **Endpoint:** `/api/opportunities/:id`
- **Access:** Organizer

Send the fields to be updated in the JSON request body.

### Delete an opportunity

- **Method:** DELETE
- **Endpoint:** `/api/opportunities/:id`
- **Access:** Organizer

Replace `:id` with the opportunity ID to delete.

### View applications for an opportunity

- **Method:** GET
- **Endpoint:** `/api/opportunities/:id/applications`
- **Access:** Organizer

Returns applications associated with the specified opportunity.

## 6. Volunteer Application Endpoints

### Apply for an opportunity

- **Method:** POST
- **Endpoint:** `/api/opportunities/:id/apply`
- **Access:** Volunteer

Example request body:

```json
{
  "message": "I would like to volunteer for this opportunity."
}
```

Replace `:id` with the opportunity ID.

### View my applications

- **Method:** GET
- **Endpoint:** `/api/applications/my`
- **Access:** Authenticated volunteer

Returns the current volunteer's applications.

### Update an application's status

- **Method:** PUT
- **Endpoint:** `/api/applications/:id/status`
- **Access:** Organizer

Example request body:

```json
{
  "status": "approved"
}
```

The status can be `approved` or `rejected`. Replace `:id` with the application ID.

## 7. Administrator Endpoints

These endpoints require an admin JWT.

### List organizers

- **Method:** GET
- **Endpoint:** `/api/admin/organizers`
- **Access:** Admin

### List pending organizers

- **Method:** GET
- **Endpoint:** `/api/admin/organizers/pending`
- **Access:** Admin

### Verify an organizer

- **Method:** PUT
- **Endpoint:** `/api/admin/organizers/:id/verify`
- **Access:** Admin

Replace `:id` with the organizer's user ID.

### Reject an organizer

- **Method:** PUT
- **Endpoint:** `/api/admin/organizers/:id/reject`
- **Access:** Admin

Replace `:id` with the organizer's user ID.

## 8. Common HTTP Status Codes

- **200 OK:** The request succeeded.
- **201 Created:** A resource was created successfully.
- **400 Bad Request:** The request contains invalid or incomplete information, or the credentials are incorrect.
- **401 Unauthorized:** Authentication is missing or invalid.
- **403 Forbidden:** The authenticated user does not have the required role or permission.
- **404 Not Found:** The requested resource could not be found.
- **500 Internal Server Error:** An unexpected server error occurred.

The status code returned depends on the endpoint and the condition encountered.

## 9. Testing

The API was tested using Postman. Basic tests covered user registration, authentication, opportunity listing and management, 
volunteer applications, application status updates, administrator organizer-management endpoints, 
and selected error cases such as missing authentication and incorrect role access.

For repeatable testing, use test accounts and valid resource IDs. Do not include real passwords, JWTs, or other secrets in published documentation.

## 10. Deployment

The backend is deployed at:

https://volunteer-app-backend-8f8p.onrender.com

The frontend project link listed in the repository is:

https://haven87.netlify.app/

This documentation describes the API routes and example request formats for the Haven87 Volunteer Management System.
