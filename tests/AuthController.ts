
import { AuthController } from '../src/interfaces/controllers/AuthController';
import { AuthService } from '../src/application/AuthService';
import { Request, Response, NextFunction } from 'express';
import { jest } from 'jest'; // Si usas ESM con jest, de lo contrario basta con import 'jest'


// Creamos un objeto con los métodos que nos interesan:
const mockAuthService: Partial<AuthService> = {
    register: jest.fn(),
    login: jest.fn(),
  };
  function createMockRequest(bodyData?: any) {
    return {
      body: bodyData || {},
    } as Partial<Request>;
  }
  
  function createMockResponse() {
    return {
      status: jest.fn().mockReturnThis(), // Permite encadenar .json
      json: jest.fn().mockReturnThis(),
    } as Partial<Response>;
  }
  
  const next: NextFunction = jest.fn(); // Normalmente no se usa mucho en estos métodos, pero lo mockeamos igual
  

  const authController = new AuthController(mockAuthService as AuthService);

  describe('AuthController - register', () => {
    it('should register a user and return status 201', async () => {
      // 1. Preparamos los mocks
      const req = createMockRequest({ email: 'test@example.com', password: '123456' });
      const res = createMockResponse();
  
      // 2. Definimos lo que debe devolver AuthService.register
      (mockAuthService.register as jest.Mock).mockResolvedValue({
        id: 'user-id-123',
        email: 'test@example.com',
      });
  
      // 3. Llamamos al método del controlador
      await authController.register(
        req as Request,
        res as Response,
        next
      );
  
      // 4. Verificamos que AuthService se llamó correctamente
      expect(mockAuthService.register).toHaveBeenCalledWith('test@example.com', '123456');
  
      // 5. Verificamos la respuesta HTTP
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        user: {
          id: 'user-id-123',
          email: 'test@example.com',
        },
      });
    });

    it('should return 400 if register fails', async () => {
        const req = createMockRequest({ email: 'fail@example.com', password: 'failpass' });
        const res = createMockResponse();
      
        // Simulamos un error al registrar
        (mockAuthService.register as jest.Mock).mockRejectedValue(new Error('User already exists'));
      
        await authController.register(
          req as Request,
          res as Response,
          next
        );
      
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          message: 'User already exists',
        });
      });
      
  });

  
  describe('AuthController - googleCallback', () => {
    it('should return 200 and the google user if exists', async () => {
      const req = {
        user: {
          id: 'google-id-123',
          email: 'google@example.com',
        },
      } as Partial<Request>;
      const res = createMockResponse();
  
      // Llamamos googleCallback
      await authController.googleCallback(
        req as Request,
        res as Response,
        next
      );
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        user: { id: 'google-id-123', email: 'google@example.com' },
      });
    });
  
    it('should return 400 if no user from Google is found', async () => {
      const req = {
        user: undefined,
      } as Partial<Request>;
      const res = createMockResponse();
  
      await authController.googleCallback(
        req as Request,
        res as Response,
        next
      );
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'No user found from Google',
      });
    });
  });
  