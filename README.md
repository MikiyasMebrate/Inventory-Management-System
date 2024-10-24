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

