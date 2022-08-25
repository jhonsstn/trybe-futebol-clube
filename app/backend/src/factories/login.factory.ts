import LoginController from '../controllers/login.controller';
import SequelizeUserRepository from '../repositories/user.repository';
import Authenticator from '../services/authentication.service';
import Encrypter from '../services/encrypter.service';
import LoginService from '../services/login.service';

const makeLogin = () => {
  const userRepo = new SequelizeUserRepository();
  const encrypter = new Encrypter();
  const authenticator = new Authenticator();
  const loginService = new LoginService(userRepo, authenticator, encrypter);
  return new LoginController(loginService);
};

export default makeLogin;
