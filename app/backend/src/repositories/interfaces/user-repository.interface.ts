import IUser from './user.interface';

export default interface IUserRepository {
  findOne(email: string): Promise<IUser | null>
}
