import request from 'supertest';
import { app } from '../src/app';

describe('App Initialization', () => {
  it('should respond with a 404 on GET / (root path)', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(404); 
    // 404 because we don't have a route defined for "/"
  });

  it('should respond with a 404 on GET /api/auth (if no GET route is defined)', async () => {
    const response = await request(app).get('/api/auth');
    expect(response.status).toBe(404); 
  });

  it('should respond 201 when posting valid user data on /api/auth/register', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@test.com', password: '123456' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('email', 'test@test.com');
  });
});
