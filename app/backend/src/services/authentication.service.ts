import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import IAuthenticator, { TokenData } from './interfaces/authenticator.interface';

const secret = process.env.JWT_SECRET;

class Authenticator implements IAuthenticator {
  encode = (data: TokenData): string => {
    const token = jwt.sign(data, secret as string);
    return token;
  };

  decode = (token: string): TokenData => {
    try {
      const data = jwt.verify(token, secret as string);
      return data as TokenData;
    } catch (_error) {
      throw new Error('Invalid token');
    }
  };
}

export default Authenticator;
