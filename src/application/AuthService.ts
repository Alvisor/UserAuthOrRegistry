import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository'; 
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export class AuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async register(email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: '', // Generate a unique ID for the user
      email,
      password: hashedPassword,
    };
    return this.userRepository.save(newUser);
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !user.password) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    //Create a JWT token for the user
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    return token;
  }

  public async generateTokenForGoogleUser(googleId: string): Promise<string> {
    const user = await this.userRepository.findByGoogleId(googleId);
    if (!user) throw new Error('User not found');
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    return token;
  }
}
