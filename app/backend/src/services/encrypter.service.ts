import * as bcrypt from 'bcryptjs';
import IEncrypter from './interfaces/encrypter.interface';

class Encrypter implements IEncrypter {
  constructor(private salt: number) { }

  encrypt = async (password: string): Promise<string> => {
    const encryptedPassword: string = await bcrypt.hash(password, this.salt);
    return encryptedPassword;
  };

  compare = async (password: string, encryptedPassword: string): Promise<boolean> => {
    const isPasswordCorrect = await bcrypt.compare(password, encryptedPassword);
    return isPasswordCorrect;
  };
}

export default Encrypter;
