# Mindful Maker Backend

A complete Node.js backend for the wellness session platform, built with Express.js, MongoDB, and JWT authentication.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Session Management**: Create, update, and publish wellness sessions
- **Draft System**: Save sessions as drafts before publishing
- **Public Sessions**: Browse published sessions from all users
- **Security**: Password hashing, rate limiting, and CORS protection
- **MongoDB Integration**: Robust data persistence with Mongoose ODM

## 📦 Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **dotenv** - Environment variables

## 🗂 Project Structure

```
backend/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── env.example           # Environment variables template
├── README.md             # This file
├── models/
│   ├── User.js           # User model
│   └── Session.js        # Session model
├── routes/
│   ├── auth.js           # Authentication routes
│   └── sessions.js       # Session management routes
└── middleware/
    └── verifyToken.js    # JWT verification middleware
```

## 🛠 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### 1. Clone and Install

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy the environment template and configure your variables:

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=5000

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/mindful-maker
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/mindful-maker

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# Environment
NODE_ENV=development
```

### 3. Database Setup

**Local MongoDB:**
```bash
# Start MongoDB service
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**MongoDB Atlas:**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string and add it to `MONGO_URI`

### 4. Start the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## 🔌 API Endpoints

### Authentication Routes

#### POST `/api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": "60f7b3b3b3b3b3b3b3b3b3b3",
    "email": "user@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### POST `/api/auth/login`
Login with existing credentials.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "userId": "60f7b3b3b3b3b3b3b3b3b3b3",
    "email": "user@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Session Routes

#### GET `/api/sessions`
Get all published sessions (no authentication required).

**Response:**
```json
{
  "success": true,
  "message": "Public sessions retrieved successfully",
  "data": [
    {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "title": "Morning Meditation",
      "tags": ["meditation", "morning", "mindfulness"],
      "json_file_url": "https://example.com/session.json",
      "status": "published",
      "user_id": {
        "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
        "email": "user@example.com"
      },
      "created_at": "2023-12-01T10:00:00.000Z",
      "updated_at": "2023-12-01T10:00:00.000Z"
    }
  ]
}
```

#### GET `/api/my-sessions`
Get all sessions created by the authenticated user.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "User sessions retrieved successfully",
  "data": [
    {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "title": "My Session",
      "tags": ["wellness", "personal"],
      "json_file_url": "https://example.com/session.json",
      "status": "draft",
      "created_at": "2023-12-01T10:00:00.000Z",
      "updated_at": "2023-12-01T10:00:00.000Z"
    }
  ]
}
```

#### GET `/api/my-sessions/:id`
Get a specific session by ID (must belong to authenticated user).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### POST `/api/my-sessions/save-draft`
Save or update a session as draft.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "title": "My Wellness Session",
  "tags": "meditation, wellness, mindfulness",
  "json_file_url": "https://example.com/session.json",
  "sessionId": "60f7b3b3b3b3b3b3b3b3b3b3" // Optional, for updates
}
```

#### POST `/api/my-sessions/publish`
Publish a session (creates new or updates existing).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "title": "My Wellness Session",
  "tags": "meditation, wellness, mindfulness",
  "json_file_url": "https://example.com/session.json",
  "sessionId": "60f7b3b3b3b3b3b3b3b3b3b3" // Optional, for updates
}
```

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

JWT tokens expire after 24 hours and must be refreshed by logging in again.

## 🧪 Testing with Postman/Insomnia

### 1. Register a User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### 2. Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### 3. Create a Draft Session
```
POST http://localhost:5000/api/my-sessions/save-draft
Authorization: Bearer <token_from_login>
Content-Type: application/json

{
  "title": "My First Session",
  "tags": "meditation, wellness",
  "json_file_url": "https://example.com/session.json"
}
```

### 4. Publish the Session
```
POST http://localhost:5000/api/my-sessions/publish
Authorization: Bearer <token_from_login>
Content-Type: application/json

{
  "title": "My First Session",
  "tags": "meditation, wellness",
  "json_file_url": "https://example.com/session.json",
  "sessionId": "<session_id_from_draft>"
}
```

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mindful-maker
JWT_SECRET=your-very-secure-production-secret
FRONTEND_URL=https://your-frontend-domain.com
```

### Deployment Platforms

- **Heroku**: Connect your GitHub repo and set environment variables
- **Vercel**: Deploy with `vercel` CLI
- **Railway**: Connect GitHub repo and configure environment
- **DigitalOcean App Platform**: Deploy from GitHub

## 🔧 Development

### Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Health Check

Visit `http://localhost:5000/health` to verify the server is running.

## 📝 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License. 