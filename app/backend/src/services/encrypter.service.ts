import * as bcrypt from 'bcryptjs';
import IEncrypter from './interfaces/encrypter.interface';

class Encrypter implements IEncrypter {
  compare = async (password: string, encryptedPassword: string): Promise<boolean> => {
    const isPasswordCorrect = await bcrypt.compare(password, encryptedPassword);
    return isPasswordCorrect;
  };
}

export default Encrypter;
