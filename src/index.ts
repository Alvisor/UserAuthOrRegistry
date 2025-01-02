import express from 'express';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import authRoutes from './interfaces/routes/AuthRoutes';
import { configureGoogleStrategy } from './infrastructure/google/PassportGoogleStrategy';
import { UserRepositoryImpl } from './infrastructure/repositories/UserRepositoryImpl';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Middlewares
app.use(express.json());

// Config session (if you'll use Passport with sessions)
app.use(
  session({
    secret: 'session-secret',
    resave: false,
    saveUninitialized: false,
  })
);

//Passport initializer y session
app.use(passport.initialize());
app.use(passport.session());

const userRepository = new UserRepositoryImpl();
configureGoogleStrategy(userRepository);

// Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
