# FreshBulk - Frontend

A glassmorphic web interface for the FreshBulk wholesale ordering platform. Built with React, Vite, and modern CSS.

## ✨ Features

- **Premium UI**: Custom-built Glassmorphism design system.
- **Animations**: Smooth page transitions and hover effects using Framer Motion & CSS.
- **Responsive**: Fully responsive grid layouts for all devices.
- **Iconography**: Clean, modern icons using `lucide-react`.

## 🚀 Pages

1.  **Home (`/`)**
    *   Hero section with animated gradients.
    *   Product catalogue with high-quality images.
    *   "Buy" buttons to quickly place orders.

2.  **Place Order (`/order`)**
    *   Pre-filled forms based on selection.
    *   Validation and success feedback.

3.  **Track Order (`/track`)**
    *   Real-time status checking using Order IDs.
    *   Visual status badges (Pending/Delivered).

4.  **Admin Dashboard (`/admin`)**
    *   Secure-style view of all incoming orders.
    *   One-click status updates.

## 🛠️ Setup & Run

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```
    Access the app at `http://localhost:5173`

## 🎨 Styling

The project uses a custom CSS variable system defined in `index.css`:
- **Theme**: Dark / Slate / Emerald
- **Effects**: Backdrop filters, mesh gradients, and glowing shadows.
- **Fonts**: 'Outfit' from Google Fonts.

## 📦 Key Libraries

- `react-router-dom`: Navigation
- `axios`: API Integration
- `framer-motion`: Animations
- `lucide-react`: Icons
