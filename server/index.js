// // old index

// const express = require('express');
// const mongoose = require('mongoose');
// const passport = require('passport');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// const path = require('path');
// const userRoutes = require('./routes/userRoutes');
// const ticketRoutes = require('./routes/ticketRoutes');
// const chatRoutes = require('./routes/chatRoutes');
// const analyticsRoutes = require('./routes/analyticsRoutes');
// // const oauthRoutes = require('./routes/oauthRoutes');

// dotenv.config();

// const cors = require('cors');

// const app = express();

// const corsOptions = {
//   origin: 'https://e2425-wads-l4bcg2-client.csbihub.id',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization'],
// };

// // 1. CORS middleware first
// app.use(cors(corsOptions));

// // // Enhanced debugging for route registration
// // const originalUse = app.use;
// // app.use = function(path, ...handlers) {
// //   console.log(`Registering route: ${path}`, typeof path, path instanceof RegExp ? 'RegExp' : '');
  
// //   // Check if path contains a URL with protocol
// //   if (typeof path === 'string' && (path.includes('http://') || path.includes('https://'))) {
// //     console.error(`⚠️ WARNING: Route path contains a full URL which may cause path-to-regexp errors: ${path}`);
// //   }
  
// //   return originalUse.call(this, path, ...handlers);
// // };

// // // Import debug middleware
// // const debugRoutes = require('./middleware/routeDebug');

// // // Apply the debug middleware to all requests
// // app.use(debugRoutes);

// // Import Swagger configuration
// // const { specs, swaggerUi, swaggerSetup } = require('./config/swagger');

// // Initialize OAuth configuration
// // require('./config/oauth');


// const CONNECTION_URL = process.env.CONNECTION_URL;
// const PORT = process.env.PORT;

// // Middleware setup
// app.use(session({
//     secret: process.env.JWT_SECRET,
//     resave: false,
//     saveUninitialized: false
// }));

// // app.set('trust proxy', true); 

// // // Serve Swagger documentation
// // app.get('/api-docs/swagger.json', (req, res) => {
// //   res.setHeader('Content-Type', 'application/json');
// //   res.send(specs);
// // });
// // app.use('/api-docs', swaggerUi.serve, swaggerSetup);

// // Routes
// app.use('/api/user', userRoutes);
// app.use('/api/tickets', ticketRoutes);
// app.use('/api/chats', chatRoutes);
// app.use('/api/analytics', analyticsRoutes);
// // app.use('/auth', oauthRoutes);

// mongoose.set('strictQuery', true);

// mongoose.connect(CONNECTION_URL)
//     .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
//     .catch((error) => console.log(error.message));


// new index.js

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const chatRoutes = require('./routes/chatRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
// const oauthRoutes = require('./routes/oauthRoutes');

dotenv.config();

const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'https://e2425-wads-l4bcg2-client.csbihub.id',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// 1. CORS middleware first
app.use(cors(corsOptions));

app.use(express.json());

// const CONNECTION_URL = process.env.CONNECTION_URL;
// const PORT = process.env.PORT;

// // Middleware setup
// app.use(session({
//     secret: process.env.JWT_SECRET,
//     resave: false,
//     saveUninitialized: false
// }));

// Routes
// app.use('/api/user', userRoutes);
// app.use('/api/tickets', ticketRoutes);
// app.use('/api/chats', chatRoutes);
// app.use('/api/analytics', analyticsRoutes);
// app.use('/auth', oauthRoutes);

// mongoose.set('strictQuery', true);

// mongoose.connect(CONNECTION_URL)
//     .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
//     .catch((error) => console.log(error.message));