# Meerut Kirana Store 🛒

A modern, full-stack e-commerce platform for a grocery/kirana store built with the MERN stack (MongoDB, Express.js, React, Node.js).

## ✨ Features

### Customer Features
- 🏠 **Home Page** with featured products, categories, and promotional banners
- 🛍️ **Product Browsing** with advanced filtering, sorting, and search
- 📦 **Product Details** with image gallery, reviews, and stock information
- 🛒 **Shopping Cart** with quantity management and price calculations
- 💳 **Secure Checkout** with multi-step process and multiple payment options
- 👤 **User Authentication** with JWT-based login/registration
- 📋 **Order Management** with order history and tracking
- ⭐ **Product Reviews** and ratings system
- 📱 **Fully Responsive** design for all devices

### Technical Features
- ⚡ **Fast and Modern** UI with React 18 and Vite
- 🎨 **Beautiful Animations** with Framer Motion and Lottie
- 🎯 **Clean Design** using Tailwind CSS
- 🔐 **Secure Authentication** with JWT tokens
- 💾 **MongoDB Database** with Mongoose ODM
- 🔒 **Security Features** including Helmet, rate limiting, and CORS
- 📊 **RESTful API** with Express.js
- 🎭 **Context API** for state management

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lottie React** - Lottie animations
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Stripe** - Payment processing
- **Helmet** - Security headers
- **Express Rate Limit** - API rate limiting

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- MongoDB (v5 or higher) - Local or Atlas
- npm or yarn package manager

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/AyushMaurya13/NewMerchantShop.git
cd NewMerchantShop
```

### 2. Set up the Backend

```bash
cd server
npm install

# Create .env file
cp .env.example .env
```

Edit `server/.env` with your configuration:

```env
MONGODB_URI=mongodb://localhost:27017/meerut-kirana-store
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRE=30d
PORT=5000
NODE_ENV=development

# Payment (Optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
PAYPAL_CLIENT_ID=your_paypal_client_id

CLIENT_URL=http://localhost:5173
```

### 3. Set up the Frontend

```bash
cd ../client
npm install

# Create .env file
cp .env.example .env
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Seed the Database (Optional)

```bash
cd ../server
npm run seed
```

This will populate your database with sample products.

## 🏃 Running the Application

### Start the Backend Server

```bash
cd server
npm run dev
```

Server will run on `http://localhost:5000`

### Start the Frontend

```bash
cd client
npm run dev
```

Client will run on `http://localhost:5173`

## 📁 Project Structure

```
NewMerchantShop/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service layer
│   │   ├── styles/        # Global styles
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # Entry point
│   └── package.json
│
├── server/                # Backend Node.js application
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   ├── server.js         # Entry point
│   └── package.json
│
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update profile (Protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured` - Get featured products
- `GET /api/products/categories` - Get all categories
- `POST /api/products/:id/reviews` - Add product review (Protected)

### Orders
- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `PUT /api/orders/:id/pay` - Update order to paid (Protected)

### Payments
- `POST /api/payments/stripe` - Process Stripe payment (Protected)
- `GET /api/payments/stripe/config` - Get Stripe config

## 📦 Product Categories

The store includes products from the following categories:
- 🌾 Groceries & Staples (Rice, Flour, Dal, Oil, Sugar)
- 🥬 Fruits & Vegetables
- 🥛 Dairy Products (Milk, Curd, Paneer)
- ☕ Beverages (Tea, Coffee, Juices)
- 🍪 Snacks & Sweets
- 🧴 Personal Care
- 🧹 Household Items

## 🎨 Color Scheme

- **Primary Color**: Green (#22c55e) - Represents freshness
- **Secondary Color**: Orange (#f97316) - Represents energy
- **Neutral Colors**: White, Light Gray, Dark Gray

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- HTTP security headers with Helmet
- CORS configuration
- API rate limiting
- Input validation and sanitization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ayush Maurya**

## 🙏 Acknowledgments

- Icons from emoji
- Placeholder images from via.placeholder.com
- Inspired by modern e-commerce platforms

## 📞 Support

For support, email info@meerutkirana.com or create an issue in the repository.

---

Made with ❤️ by the Meerut Kirana Store Team