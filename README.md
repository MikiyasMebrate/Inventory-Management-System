# Inventory Management System

An API-based Inventory Management System built with Node.js, Express, and MongoDB. The system handles product management, sales, restocking, and returns, while allowing notifications and role-based access control for users such as storekeepers and salespersons.

## Features

- **Product Management**: Create, read, update, and delete products.
- **Category Management**: CRUD operations for categories.
- **Inventory Transactions**: Handle sales, restocking, and return transactions.
- **Role-Based Access Control**: Ensure only authorized users can perform certain actions.
- **Stock Level Validation**: Prevent stock from falling below zero or exceeding defined limits.
- **Notification Mechanism**: Notify users when certain actions occur (e.g., restocking, sales).
- **User-Specific Notification Preferences**: Users can customize the types of notifications they want to receive.

## Technology Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **ORM**: Mongoose

## Requirements

- **Node.js**: v14.x or later
- **MongoDB**: Local instance or MongoDB Atlas

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MikiyasMebrate/Inventory-Management-System.git
   cd inventory-management-system

2. **Install dependencies:**:
   ```bash
   npm install

3. **Create a .env file in the root directory and add the following environment variables:**:
   ```bash
   PORT=5000
   DATABASE_SERVER=YOUR_DATABASE_SERVER
   ACCESS_TOKEN_SECRET=ADD_TOKEN

4. **Run the application:**:
   ```bash
   npm run dev


# API Routes Documentation

This documentation covers the API routes in the inventory management system, including each route's endpoint, HTTP methods, and the associated middleware.

## Table of Contents

- [User Routes](#user-routes)
- [Category Routes](#category-routes)
- [Product Routes](#product-routes)
- [Inventory Transaction Routes](#inventory-transaction-routes)
- [Search Routes](#search-routes)
- [Notification Preference Routes](#notification-preference-routes)
- [Notification Routes](#notification-routes)

---

### User Routes

| Route               | Method | Description             | Middleware                 |
|---------------------|--------|-------------------------|----------------------------|
| `/api/user/register`| POST   | Register a new user     | None                       |
| `/api/user/login`   | POST   | Login user              | None                       |
| `/api/user`         | GET    | Get all users           | `validateTokenHandler`     |
| `/api/user`         | POST   | Create a new user       | `validateTokenHandler`, `roleMiddleware(['storekeeper'])` |

### Category Routes

| Route                 | Method | Description          | Middleware                         |
|-----------------------|--------|----------------------|------------------------------------|
| `/api/category`       | GET    | Get all categories   | `validateTokenHandler`             |
| `/api/category`       | POST   | Create a category    | `validateTokenHandler`             |
| `/api/category/:id`   | PUT    | Update a category    | `validateTokenHandler`, `roleMiddleware(['storekeeper'])` |
| `/api/category/:id`   | DELETE | Delete a category    | `validateTokenHandler`, `roleMiddleware(['storekeeper'])` |
| `/api/category/:id`   | GET    | Get a single category| `validateTokenHandler`             |

### Product Routes

| Route                 | Method | Description              | Middleware                         |
|-----------------------|--------|--------------------------|------------------------------------|
| `/api/product`        | GET    | Get all products         | `validateTokenHandler`             |
| `/api/product`        | POST   | Create a new product     | `validateTokenHandler`, `roleMiddleware(['storekeeper'])` |
| `/api/product/:id`    | PUT    | Update a product         | `validateTokenHandler`, `roleMiddleware(['storekeeper'])` |
| `/api/product/:id`    | DELETE | Delete a product         | `validateTokenHandler`, `roleMiddleware(['storekeeper'])` |

### Inventory Transaction Routes

| Route                           | Method | Description                 | Middleware             |
|---------------------------------|--------|-----------------------------|------------------------|
| `/api/inventory-transactions`   | POST   | Create an inventory transaction | `validateTokenHandler` |

### Search Routes

| Route                             | Method | Description                   | Middleware             |
|-----------------------------------|--------|-------------------------------|------------------------|
| `/api/search/category`            | GET    | Search categories             | None                   |
| `/api/search/product`             | GET    | Search products               | None                   |
| `/api/search/product-cat-name`    | GET    | Search products by category name | None                |

### Notification Preference Routes

| Route                             | Method | Description                             | Middleware             |
|-----------------------------------|--------|-----------------------------------------|------------------------|
| `/api/notifications/preference`   | GET    | Get user notification preferences       | `validateTokenHandler` |
| `/api/notifications/preference`   | POST   | Create user notification preferences    | `validateTokenHandler` |
| `/api/notifications/preference`   | PUT    | Update user notification preferences    | `validateTokenHandler` |

### Notification Routes

| Route                     | Method | Description                 | Middleware             |
|---------------------------|--------|-----------------------------|------------------------|
| `/api/notifications`      | GET    | Get notifications           | `validateTokenHandler` |

---

## Middleware Used

1. **validateTokenHandler** - Ensures a valid token is present in the request headers.
2. **roleMiddleware(['storekeeper'])** - Restricts access to specific routes based on the role.

---

This documentation covers all main routes used for API functionality, including user authentication, product management, inventory transactions, and notification preferences.


## Contact
For questions or issues, feel free to reach out:

-   **Email**: mikiyasmebrate@gmail.com
-   **GitHub**: [MikiyasMebrate](https://github.com/MikiyasMebrate)
