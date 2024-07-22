const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan')
const passport = require('passport');
const session = require('express-session');
dotenv.config();

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const logger = require('./utils/logger');
require('./config/passportConfig');
const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
  }));
  app.use(passport.initialize());
  app.use(passport.session());



connectDB();

app.use('/api/users', userRoutes);
app.use('/auth', authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
