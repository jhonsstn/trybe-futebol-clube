import { BadRequestError, UnauthorizedError } from '../errors';
import IUserRepository from '../repositories/interfaces/user-repository.interface';
import IAuthenticator from './interfaces/authenticator.interface';
import IEncrypter from './interfaces/encrypter.interface';
import ILoginService from './interfaces/login.interface';

class LoginService implements ILoginService {
  constructor(
    private userRepository: IUserRepository,
    private authenticator: IAuthenticator,
    private encrypter: IEncrypter,
  ) {}

  login = async (email: string, password: string): Promise<string> => {
    if (!email || !password) {
      throw new BadRequestError('All fields must be filled');
    }
    const user = await this.userRepository.findOne(email);
    if (!user || !(await this.encrypter.compare(password, user.password))) {
      throw new UnauthorizedError('Incorrect email or password');
    }
    const { id, role } = user;
    const token = this.authenticator.encode({ id, role });
    return token;
  };

  validate = async (token: string): Promise<string> => {
    const { role } = await this.authenticator.decode(token);
    return role;
  };
}

export default LoginService;
