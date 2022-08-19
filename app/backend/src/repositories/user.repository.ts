import User from '../database/models/user';
import IUserRepository from './interfaces/user-repository.interface';
import IUser from './interfaces/user.interface';

class SequelizeUserRepository implements IUserRepository {
  findOne = async (email: string): Promise<IUser | null> => {
    const user = await User.findOne({ where: { email } });
    return user;
  };
}

export default SequelizeUserRepository;
