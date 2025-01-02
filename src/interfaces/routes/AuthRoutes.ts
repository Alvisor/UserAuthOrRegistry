import { Router } from 'express';
import passport from 'passport';
import { AuthController } from '../controllers/AuthController';
import { AuthService } from '../../application/AuthService';
import { UserRepositoryImpl } from '../../infrastructure/repositories/UserRepositoryImpl';

const router = Router();

const userRepository = new UserRepositoryImpl();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  authController.googleCallback
);

export default router;
