export default interface ILoginService {
  login(email: string, password: string): Promise<string>;
  validate(token: string): Promise<string>;
}
