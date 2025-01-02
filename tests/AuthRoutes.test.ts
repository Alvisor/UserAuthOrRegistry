import request from 'supertest';
import { app } from '../src/app'; 

describe('Auth Routes', () => {
  // Test 1: Registro
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'tester@domain.com', password: 'secret123' });

    // Status esperado cuando se crea un recurso nuevo
    expect(res.status).toBe(201);

    // Comprobamos que la respuesta contenga un "user"
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email', 'tester@domain.com');
  });

  // Test 2: Login
  it('should login an existing user and return a token', async () => {
    // Asumiendo que el usuario ya existe, o quizá antes lo creas con otro test
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'tester@domain.com', password: 'secret123' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  // Test 3: Google callback
  it('should redirect or handle Google callback', async () => {
    // Normalmente, el flujo de Google callback involucra una redirección a Google.
    // Este test es un poco más complejo de simular, porque "passport.authenticate('google')"
    // redirige externamente. Para un test básico, podrías probar la respuesta 302 o 401.
    // O podrías mockear 'passport' y verificar que tu callback se llame correctamente.

    // Ejemplo muy básico:
    const res = await request(app).get('/api/auth/google/callback');
    // Quizá esperes un redirect a '/login' o un status 302:
    expect(res.status).toBe(302); // o la que definas en "failureRedirect"
  });
});
