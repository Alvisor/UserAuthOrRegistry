import { RequestHandler } from 'express';
import { AuthService } from '../../application/AuthService';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  /**
   * Opción A: Usar la interfaz RequestHandler
   */
  public register: RequestHandler = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.authService.register(email, password);
  
      // Envías la respuesta, pero sin "return"
      res.status(201).json({ user });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  /**
   * Opción B: Definir la firma manualmente
   * (pero debe coincidir con lo que Express espera)
   */
  public login: RequestHandler = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      // No retornamos el Response, solo lo enviamos
      res.status(201).json({ token });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  public googleCallback: RequestHandler = async (req, res, next) => {
    try {
      // @ts-ignore
      const googleUser = req.user;

    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
  };
}
