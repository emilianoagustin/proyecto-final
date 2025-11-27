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
