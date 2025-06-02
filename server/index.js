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

app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://e2425-wads-l4bcg2-client.csbihub.id'] 
        : ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Content-Length', 'X-Content-Type-Options'],
    maxAge: 86400,
    optionsSuccessStatus: 204
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "https://e2425-wads-l4bcg2-client.csbihub.id");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.options('*', cors());

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

app.set('trust proxy', true); 

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