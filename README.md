# Project Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Git](https://git-scm.com/downloads) (version 2.52 or higher)
- [Node.js](https://nodejs.org/) (version 24.1.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager

## Clone the Repository

1. Open your terminal or command prompt

2. Navigate to the directory where you want to clone the project:

```bash
cd /path/to/your/directory
```

3. Clone the repository:

```bash
git clone git@github.com:emilianoagustin/proyecto-final.git
```

4. Navigate into the project directory:

```bash
cd proyecto-final
```

## Installation

Install the project dependencies:

**Using npm:**

```bash
npm install
```

**Using yarn:**

```bash
yarn install
```

## Configuration

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Open the `.env` file and configure the required environment variables:

```
PORT=
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
JWT_SECRET=
```

## Running the Project

### Development Mode

Start the development server:

**Using npm:**

```bash
npm run dev
```

**Using yarn:**

```bash
yarn dev
```

The application will be available at `http://localhost:3000`

## Troubleshooting

### Common Issues

**Issue: Port already in use**

- Solution: Change the `PORT` in your `.env` file or kill the process using the port

**Issue: Module not found**

- Solution: Delete `node_modules` folder and `package-lock.json`, then run `npm install` again

---

# API Calls Guide

## Get All Products

Retrieves a list of all products in the system.

**Endpoint:** `GET /api/products`

**Parameters:**

None

**Response (200 OK):**

```json
[
  {
    "id": "OBWOpAg1v9QZDcCAmvsi",
    "name": "Wireless Headphones",
    "price": 79.99,
    "categories": ["electronics", "audio"]
  },
  {
    "id": "OBWOpAg1v9QZDcCAmvsi",
    "name": "Running Shoes",
    "price": 120.0,
    "categories": ["clothes", "sports"]
  }
]
```

**Errors:**

- `401 Unauthorized` - Invalid or missing authentication token
- `404 Not found` - Product list not found

---

## Get Product

Retrieves a single product by its unique identifier.

**Endpoint:** `GET /api/products/{id}`

**Parameters:**

| Name | Type   | Required | Description               |
| ---- | ------ | -------- | ------------------------- |
| id   | string | Yes      | Unique product identifier |

**Response (200 OK):**

```json
{
  "id": "OBWOpAg1v9QZDcCAmvsi",
  "name": "Wireless Headphones",
  "price": 79.99,
  "categories": ["electronics", "audio"]
}
```

**Errors:**

- `404 Not Found` - Product doesn't exist
- `401 Unauthorized` - Invalid or missing authentication token

---

## Delete Product

Deletes a single product by its unique identifier.

**Endpoint:** `DELETE /api/products/{id}`

**Parameters:**

| Name | Type   | Required | Description               |
| ---- | ------ | -------- | ------------------------- |
| id   | string | Yes      | Unique product identifier |

**Response (204 No Content):**

No response body. Successful deletion returns status code 204.

**Errors:**

- `404 Not Found` - Product doesn't exist
- `401 Unauthorized` - Invalid or missing authentication token

---

## Update Product

Updates an existing product with new information.

**Endpoint:** `PUT /api/products/update/{id}`

**Parameters:**

| Name       | Type   | Required | Description                                              |
| ---------- | ------ | -------- | -------------------------------------------------------- |
| id         | string | Yes      | Unique product identifier (path parameter)               |
| name       | string | Yes      | Updated product name (request body)                      |
| price      | number | Yes      | Updated product price (request body)                     |
| categories | array  | Yes      | Updated array of product category strings (request body) |

**Request Body Example:**

```json
{
  "name": "Wireless Headphones Pro",
  "price": 99.99,
  "categories": ["electronics", "audio", "premium"]
}
```

**Response (200 OK):**

```json
{
  "id": "OBWOpAg1v9QZDcCAmvsi",
  "name": "Wireless Headphones Pro",
  "price": 99.99,
  "categories": ["electronics", "audio", "premium"]
}
```

**Errors:**

- `404 Not Found` - Product doesn't exist
- `401 Unauthorized` - Invalid or missing authentication token

---

## Create Product

Creates a new product with the data from the body.

**Endpoint:** `POST /api/products/create`

**Parameters:**

| Name       | Type   | Required | Description                                              |
| ---------- | ------ | -------- | -------------------------------------------------------- |
| name       | string | Yes      | Updated product name (request body)                      |
| price      | number | Yes      | Updated product price (request body)                     |
| categories | array  | Yes      | Updated array of product category strings (request body) |

**Request Body Example:**

```json
{
  "name": "Wireless Headphones Pro",
  "price": 99.99,
  "categories": ["electronics", "audio", "premium"]
}
```

**Response (201 OK):**

```json
{
  "id": "OBWOpAg1v9QZDcCAmvsi",
  "name": "Wireless Headphones Pro",
  "price": 99.99,
  "categories": ["electronics", "audio", "premium"]
}
```

**Errors:**

- `404 Not Found` - Product doesn't exist
- `401 Unauthorized` - Invalid or missing authentication token

---

## User login

Login a user in the application to allow modifications in the database.

**Endpoint:** `POST /api/auth/login`

**Parameters:**

| Name     | Type   | Required | Description                       |
| -------- | ------ | -------- | --------------------------------- |
| email    | string | Yes      | user email address (request body) |
| password | string | Yes      | user password (request body)      |

**Request Body Example:**

```json
{
  "email": "johndoe@mail.com",
  "password": "1234"
}
```

**Response (200 OK):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlBMcm5tZGxOckJZVTJpVWdwRkVHIiwiZW1haWwiOiJqb2V5cmFtb25lQG1haWwuY29tIiwiaWF0IjoxNzY0Mjg2NDYwLCJleHAiOjE3NjQyOTAwNjB9.AzFwVAY7uJn41MrA0dM-QfSIj4M8xTLB6ocFIS4e8n8"
}
```

**Errors:**

- `422 Unprocessable Entity` - Email or password are missing
- `401 Unauthorized` - Invalid or missing credentials

---

## User Register

Register a new user in the database.

**Endpoint:** `POST /api/auth/register`

**Parameters:**

| Name     | Type   | Required | Description                       |
| -------- | ------ | -------- | --------------------------------- |
| email    | string | Yes      | user email address (request body) |
| password | string | Yes      | user password (request body)      |

**Request Body Example:**

```json
{
  "email": "johndoe@mail.com",
  "password": "1234"
}
```

**Response (201 OK):**

```json
{
  "id": "OBWOpAg1v9QZDcCAmvsi",
  "email": "johndoe@mail.com"
}
```

**Errors:**

- `422 Unprocessable Entity` - Email or password are missing
- `503 Service Unavailable` - Error with the user register
- `409 Conflict` - User already exists

---
