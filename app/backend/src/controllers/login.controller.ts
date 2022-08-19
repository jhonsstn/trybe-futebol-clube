import ILoginService from '../services/interfaces/login.interface';
import ILoginController from './interfaces/login.interface';

class LoginController implements ILoginController {
  constructor(private loginService: ILoginService) {}

  login = async (email: string, password: string): Promise<string> => {
    const token = await this.loginService.login(email, password);
    return token;
  };
}

export default LoginController;
