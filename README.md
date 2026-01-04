# FreshBulk - Bulk Vegetable/Fruit Ordering Platform

## Overview
A simple yet powerful web application for bulk ordering of vegetables and fruits. featuring a premium glassmorphic UI, real-time order tracking, and an admin dashboard.

## Tech Stack
- **Frontend**: React.js, Vite, Vanilla CSS (Glassmorphism), Framer Motion, Axios
- **Backend**: Node.js, Express.js, CORS
- **Database**: SQLite (local `database.sqlite` file)

## Features
- **Catalogue**: Browse fresh produce with premium images and prices per unit.
- **Ordering**: Simple form to place bulk orders (quantity in units).
- **Tracking**: Track order status (Pending/Delivered) using Order ID.
- **Admin**: View all orders and update their status.

## Getting Started

### Prerequisites
- Node.js installed

### Installation

1. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

2. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   ```

### Running the App

1. **Start Backend Server**
   ```bash
   cd backend
   node server.js
   ```
   Server runs on: `http://localhost:5000`

2. **Start Frontend App**
   ```bash
   cd frontend
   npm run dev
   ```
   App runs on: `http://localhost:5173` (or port shown in terminal)

## API Endpoints
- `GET /api/products`: List all products
- `POST /api/orders`: Place a new order
- `GET /api/orders/:id`: Get order status
- `GET /api/admin/orders`: List all orders
- `PUT /api/admin/orders/:id`: Update order status
