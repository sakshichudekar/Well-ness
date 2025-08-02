const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/session'); // ✅ Don't change
const dashboardRoutes = require('./routes/dashboard');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware: Security headers
app.use(helmet());

// ✅ Middleware: Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
});
app.use(limiter);

// ✅ Middleware: Request logging
app.use(morgan('dev'));

// ✅ Middleware: CORS
const corsOptions = {
  origin: ['http://localhost:8080', process.env.FRONTEND_URL?.trim()].filter(Boolean),
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// ✅ Middleware: Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Mindful Maker Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// ✅ Routes (IMPORTANT: these match frontend API calls)
app.use('/api/auth', authRoutes);
app.use('/api', sessionRoutes);          // ✅ <-- fixed here
app.use('/api', dashboardRoutes);

// ✅ 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// ✅ Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: Object.values(error.errors).map((err) => err.message),
    });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format',
    });
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// ✅ MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// ✅ Start the server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

// ✅ Process crash handling
process.on('unhandledRejection', (err, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

startServer();
