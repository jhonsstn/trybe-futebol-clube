export default interface IEncrypter {
  compare(password: string, encryptedPassword: string): Promise<boolean>;
}
