import express, { json } from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import ticketRoutes from './routes/ticketRoutes'; // Fixed the backtick error
import chatRoutes from './routes/chatRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
// import oauthRoutes from './routes/oauthRoutes';

// Load environment variables
config();

const app = express();

// // Add debug logging for route registration
// const originalUse = app.use;
// app.use = function(path, ...handlers) {
//   console.log(`Registering route: ${path}`, typeof path, path instanceof RegExp ? 'RegExp' : '');
  
//   // Check if path contains a URL with protocol
//   if (typeof path === 'string' && (path.includes('http://') || path.includes('https://'))) {
//     console.error(`⚠️ WARNING: Route path contains a full URL which may cause path-to-regexp errors: ${path}`);
//   }
  
//   return originalUse.call(this, path, ...handlers);
// };

const corsOptions = {
  origin: 'https://e2425-wads-l4bcg2-client.csbihub.id',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// CORS middleware first
app.use(cors(corsOptions));

// Body parser middleware
app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 3018;

// Middleware setup
app.use(session({
    secret: process.env.JWT_SECRET || 'fallback-secret-for-development',
    resave: false,
    saveUninitialized: false
}));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/analytics', analyticsRoutes);
// app.use('/api/auth', oauthRoutes);

mongoose.set('strictQuery', true);

// Connect to database and start server
mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));