import IUser from '../../repositories/interfaces/user.interface';

export type TokenData = Pick<IUser, 'id' | 'role'>;

export default interface IAuthenticator {
  encode(data: TokenData): string
  decode(token: string): Promise<TokenData>
}
