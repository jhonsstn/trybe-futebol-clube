export default interface ILoginController {
  login(email: string, password: string): Promise<string>;
}
