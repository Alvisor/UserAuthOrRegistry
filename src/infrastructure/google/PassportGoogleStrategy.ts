import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { UserRepository } from '../../domain/UserRepository';

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

// Config for Google Strategy
export function configureGoogleStrategy(userRepository: UserRepository) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user exists with Google ID
          let user = await userRepository.findByGoogleId(profile.id);
          if (!user) {
            //Create a new user if it doesn't exist
            user = await userRepository.save({
              id: '',
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails?.[0]?.value || '',
            });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  //Serializate keeps the user in the session
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  // Deserialize the user from the session
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await userRepository.findByGoogleId(id); 
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}
