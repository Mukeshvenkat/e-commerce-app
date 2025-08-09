E-Commerce Website

Project Overview

This is a e-commerce website, designed to provide a seamless online shopping experience. The application allows users to register, log in, browse a product catalog with filtering capabilities, add or remove items from a shopping cart, and complete purchases with a streamlined checkout process. The website is built with a modern tech stack, ensuring scalability, security, and a responsive user interface.

Technologies Used

Frontend:

React.js: A JavaScript library for building a dynamic and responsive user interface with reusable components.
Tailwind CSS: A utility-first CSS framework for rapid and customizable styling, ensuring a responsive and visually appealing design.
Local Storage: Used to store JWT tokens for user authentication, enabling persistent login sessions.

Backend:

Node.js: A JavaScript runtime for building a fast and scalable server-side application.
Express.js: A minimalist web framework for Node.js to create RESTful APIs for handling requests and responses.
PostgreSQL: A powerful, open-source relational database for storing user data, product information, and order details.


Content Management System (CMS):

Contentful: A headless CMS used to manage and deliver product catalog data to the frontend via APIs, enabling easy content updates. It also serves as the admin panel for managing product content.


Key Features

1. User Registration & Login

Authentication: Implements JSON Web Tokens (JWT) for secure user authentication, ensuring protected access to user-specific features.
Password Security: Utilizes a hashing algorithm - 'bcrypt' to securely store user passwords in the PostgreSQL database.
Persistent Login: Stores JWT tokens in the browser's local storage to maintain user sessions across page reloads.
Frontend Implementation: A clean and intuitive UI for registration and login forms, built with React.js and styled with Tailwind CSS.

2. Product Catalog

Dynamic Dashboard: Displays a product catalog on the frontend, fetching data from Contentful via Node.js/Express APIs.
Product Filtering: Allows users to filter products by categories, price range, or other attributes, enhancing the browsing experience.
Content Management: Leverages Contentful for managing product details (e.g., name, description, price, images), allowing easy updates without code changes.

3. Shopping Cart & Checkout

Cart Functionality: Allows users to add or remove items from the cart with real-time updates, implemented using React.js state management.
Checkout Process: Provides a form for users to enter customer details (e.g., name, address) and payment information, validated on the frontend.
Backend Integration: Submits checkout data to the Node.js/Express backend, which processes the order and updates the PostgreSQL database.
User Experience: Ensures a smooth and intuitive checkout flow, styled with Tailwind CSS for consistency and responsiveness.

4. Admin Panel

Contentful as Admin Interface: Utilizes Contentful's user-friendly interface as the admin panel, allowing administrators to manage product catalog data (e.g., adding, updating, or deleting products) without requiring direct database access.
Seamless Integration: Product updates in Contentful are instantly reflected in the frontend via API calls, ensuring real-time content management.

Setup Instructions
Prerequisites

Node.js - v22.18
PostgreSQL - v17.5
Contentful account and API keys
Git (for cloning the repository)

Installation

Clone the Repository:
git clone <repository-url>
cd ecommerce-website


Backend Setup:

Navigate to the backend directory:cd backend
npm install


Create a .env file in the backend directory with the following variables:

DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<database-name>
JWT_SECRET=<your-jwt-secret>
CONTENTFUL_SPACE_ID=<your-contentful-space-id>
CONTENTFUL_ACCESS_TOKEN=<your-contentful-access-token>

Start the backend server:npm start


Frontend Setup:

Navigate to the frontend directory: cd frontend

npm install

Start the frontend development server:npm start


Contentful Configuration:

Set up a Contentful space and define content models for products (e.g., fields for name, description, price, image, category).
Obtain the Space ID and Access Token from Contentful and add them to the backend .env file.
Use Contentful's web interface to manage product data, which serves as the admin panel.


Running the Application

Ensure the backend server is running on http://localhost:3001.
Access the frontend at http://localhost:3000 in your browser.
Register a new user, log in, browse the product catalog with filtering options, add items to the cart, and complete the checkout process.
Use Contentful's interface to manage products as an administrator.

Project Structure

The project is organized with a clear separation of concerns. The frontend follows the Feature Sliced Design (FSD) pattern for modularity and scalability, while the backend adopts the Model-View-Controller (MVC) architecture for structured and maintainable server-side code.

ecommerce-website/
├── backend/                    # Node.js/Express backend (MVC Architecture)
│   ├── models/                 # Data models for PostgreSQL (e.g., User, Product, Order)
│   │   ├── user.js             # User schema and database interactions
│   │   ├── product.js          # Product schema for local storage or caching
│   │   └── order.js            # Order schema for checkout data
│   ├── controllers/            # Business logic for handling API requests
│   │   ├── authController.js   # Handles registration and login
│   │   ├── productController.js # Manages product data from Contentful
│   │   └── orderController.js  # Processes checkout and order data
│   ├── routes/                 # API route definitions
│   │   ├── auth.js             # Routes for authentication (e.g., /login, /register)
│   │   ├── products.js         # Routes for product catalog
│   │   └── orders.js           # Routes for cart and checkout
│   ├── config/                 # Configuration files (e.g., database, Contentful)
│   │   └── db.js               # Database connection setup
│   └── server.js               # Main entry point for the Express server
├── frontend/                   # React.js frontend (Feature Sliced Design)
│   ├── src/                    # Source code organized using FSD
│   │   ├── app/                # Application-wide setup (e.g., routes, global styles)
│   │   │   ├── App.jsx         # Main app component
│   │   │   └── index.js        # Entry point
│   │   ├── pages/              # Page-level components (e.g., Home, ProductList, Checkout)
│   │   │   ├── home/           # Home page feature
│   │   │   ├── auth/           # Authentication pages (login, register)
│   │   │   └── checkout/       # Checkout page feature
│   │   ├── features/           # Feature-specific logic and components
│   │   │   ├── auth/           # Authentication feature (login/register logic)
│   │   │   ├── products/       # Product catalog feature (list, filter, display)
│   │   │   └── cart/           # Shopping cart feature (add/remove items)
│   │   ├── entities/           # Business entities (e.g., Product, User, CartItem)
│   │   │   ├── product/        # Product-related components and logic
│   │   │   └── cart/           # Cart-related components and logic
│   │   ├── shared/             # Reusable utilities, components, and API helpers
│   │   │   ├── ui/             # Shared UI components (e.g., Button, Card)
│   │   │   ├── api/            # API call utilities
│   │   │   └── lib/            # General utilities (e.g., formatPrice)
│   ├── public/                 # Static assets (e.g., images, favicon)
│   └── tailwind.config.js      # Tailwind CSS configuration
└── README.md                   # Project documentation

Architecture Overview

Frontend (Feature Sliced Design):

App: Contains global configurations, routing, and the main entry point for the React application.
Pages: Represents individual pages (e.g., Home, ProductList, Checkout), each encapsulating its UI and logic.
Features: Groups business logic and UI for specific features like authentication, product catalog, and cart management.
Entities: Defines reusable data models (e.g., Product, CartItem) with related components and logic.
Shared: Houses reusable components, API utilities, and helper functions used across the application.


Backend (MVC Architecture):

Models: Defines database schemas and interactions with PostgreSQL (e.g., User, Product, Order models).
Controllers: Contains business logic for processing requests, interacting with models, and fetching data from Contentful.
Views: Optional for server-side rendering or generating dynamic content like email templates (if applicable).
Routes: Defines API endpoints, mapping HTTP requests to controller functions.
