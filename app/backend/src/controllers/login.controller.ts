import ILoginService from '../services/interfaces/login.interface';
import ILoginController from './interfaces/login.interface';

class LoginController implements ILoginController {
  constructor(private loginService: ILoginService) {}

  login = async (email: string, password: string): Promise<string> => {
    const token = await this.loginService.login(email, password);
    return token;
  };

  validate = async (token: string): Promise<string> => {
    const role = await this.loginService.validate(token);
    return role;
  };
}

export default LoginController;
