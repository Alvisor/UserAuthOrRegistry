import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';
import { v4 as uuidv4 } from 'uuid';

export class UserRepositoryImpl implements UserRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(u => u.email === email);
    return user || null;
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    const user = this.users.find(u => u.googleId === googleId);
    return user || null;
  }

  async save(user: User): Promise<User> {
    if (!user.id) {
      user.id = uuidv4();
    }
    this.users.push(user);
    return user;
  }
}
