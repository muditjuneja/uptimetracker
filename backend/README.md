# API Monitoring Tool Backend

This is the backend service for the API Monitoring Tool. It provides authentication and endpoint management functionality.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

### Authentication

#### Sign Up
```http
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Endpoints

All endpoint routes require authentication. Include the JWT token in the Authorization header:
```http
Authorization: Bearer <token>
```

#### Create Endpoint
```http
POST /endpoints
Content-Type: application/json

{
  "name": "Main API",
  "url": "https://api.example.com/health",
  "method": "GET",
  "interval": 5
}
```

#### Get All Endpoints
```http
GET /endpoints
```

#### Get Single Endpoint
```http
GET /endpoints/:id
```

#### Update Endpoint
```http
PUT /endpoints/:id
Content-Type: application/json

{
  "name": "Updated API Name",
  "interval": 10
}
```

#### Delete Endpoint
```http
DELETE /endpoints/:id
```
