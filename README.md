# Employee Hierarchy API

This API provides employee data in a hierarchical format based on position. It includes JWT-protected routes and demonstrates calling an internal API with token-based authorization.

## Installation

To install the project you need to run the following commands.

```bash
  git clone https://github.com/smdurjoy/employee-api.git
  cd employee-api
  npm install
```

## Environment Variables

To run this project, you will need to add the following environment variables with real values to your .env file

`PORT`
`DB_HOST`
`DB_USER`
`DB_PASSWORD`
`DB_NAME`
`JWT_SECRET`

After adding the variables run the following commands to create the database and inserting the default data and for running the project.

```bash
  CREATE DATABASE your_db_name;
  npx sequelize db:migrate
  npx sequelize db:seed:all
  npx nodemon server.js
```

The server should now be running on http://localhost:3000.

## API Reference

#### Generate Token

```http
  GET /api/auth/token
```

#### Get employees hierarchy

```http
  GET /api/employees/hierarchy/${id}
```

| Parameter       | Type     | Description                                                                                           |
| :-------------- | :------- | :---------------------------------------------------------------------------------------------------- |
| `id`            | `string` | **Required**. Id of item to fetch                                                                     |
| `Authorization` | `string` | **Required**. Add a Bearer Token in the Authorization. Use the generated token in /api/auth/token api |

## Testing

This project includes unit and integration tests for the API.

```bash
  npm test
```

For End-to-End Testing Use tools like Postman or Insomnia to manually test each endpoint. You can also write end-to-end test scripts with tools like Supertest or Jest.

## Handling High Traffic & Large Data

To support 5,000 concurrent requests and respond quickly to requests with large datasets (1M+ records), follow these strategies:

**Database Optimization:**

Indexes: Ensure fields like id and parentId are indexed to optimize query speed, especially when retrieving hierarchical data.

Optimized Queries: Use SQL queries that minimize joins and unnecessary data retrieval. Recursive queries can be optimized with stored procedures or views if needed.

**Caching:**

In-Memory Caching: Use Redis or Memcached to cache frequently requested data. Cache the employee hierarchy for each position so subsequent requests don’t hit the database directly.

API-Level Caching: Set up middleware-level caching for popular endpoints, like with apicache in Node.js.

**Horizontal Scaling & Load Balancing:**

Scaling: Deploy multiple instances of the API and use a load balancer (e.g., NGINX, AWS ELB) to distribute traffic.

Cluster Mode: Use Node.js’s cluster module to utilize multiple CPU cores, enabling the server to handle more simultaneous requests.
