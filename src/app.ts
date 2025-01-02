import express from 'express';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import authRoutes from './interfaces/routes/AuthRoutes';
import { configureGoogleStrategy } from './infrastructure/google/PassportGoogleStrategy';
import { UserRepositoryImpl } from './infrastructure/repositories/UserRepositoryImpl';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Session
app.use(
  session({
    secret: 'session-secret',
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

const userRepository = new UserRepositoryImpl();
configureGoogleStrategy(userRepository);

// Routes
app.use('/api/auth', authRoutes);

export { app };
