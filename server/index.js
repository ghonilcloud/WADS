const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Import Swagger configuration
const { specs, swaggerUi } = require('./config/swagger');

// Initialize OAuth configuration
require('./config/oauth');

const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const chatRoutes = require('./routes/chatRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const oauthRoutes = require('./routes/oauthRoutes');

const app = express();
dotenv.config();
app.use(express.json());


// Define CORS options
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? 'https://e2425-wads-l4bcg2-client.csbihub.id'
    : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept', 'DNT', 'User-Agent', 'If-Modified-Since', 'Cache-Control', 'Range'],
  exposedHeaders: ['Content-Length', 'X-Content-Type-Options'],
  maxAge: 86400,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS to all routes
app.use(cors(corsOptions));

// Add explicit OPTIONS handler for all routes
app.options('*', cors(corsOptions));

// Handle preflight OPTIONS requests explicitly
app.options('*', (req, res) => {
  // Set CORS headers
  res.header('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production' 
    ? 'https://e2425-wads-l4bcg2-client.csbihub.id' 
    : req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, X-Requested-With, Accept, DNT, User-Agent, If-Modified-Since, Cache-Control, Range');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400');
  
  // Respond with 204 No Content
  res.status(204).end();
});

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} [${req.method}] ${req.path} - Origin: ${req.headers.origin}`);
  next();
});

// Enhanced CORS debug endpoint
app.get('/api/debug-cors', (req, res) => {
  res.json({
    message: 'CORS debug info',
    success: true,
    requestHeaders: req.headers,
    corsConfig: {
      allowedOrigins: process.env.NODE_ENV === 'production'
        ? ['https://e2425-wads-l4bcg2-client.csbihub.id']
        : ['http://localhost:5173', 'http://127.0.0.1:5173'],
      environment: process.env.NODE_ENV || 'development'
    },
    serverInfo: {
      nodeEnv: process.env.NODE_ENV,
      trustProxy: app.get('trust proxy'),
      port: PORT
    }
  });
});

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', "https://e2425-wads-l4bcg2-client.csbihub.id");
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// })

// app.options('*', cors());

// Initialize Passport and CORS
app.use(passport.initialize());
app.use(cookieParser());

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT;

// Middleware setup
// app.use(session({
//     secret: process.env.JWT_SECRET,
//     resave: false,
//     saveUninitialized: false
// }));

app.set('trust proxy', 1); // Trust first proxy

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/auth', oauthRoutes);

mongoose.set('strictQuery', true);

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));