import User from '../database/models/user';
import IUser from './interfaces/user.interface';

class SequelizeUserRepository {
  findOne = async (email: string): Promise<IUser | null> => {
    const user = await User.findOne({ where: { email } });
    return user;
  };
}

export default SequelizeUserRepository;
