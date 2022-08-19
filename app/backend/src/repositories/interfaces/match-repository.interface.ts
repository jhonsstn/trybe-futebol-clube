import IMatch from './match.interface';

export default interface IMatchRepository {
  getAll(): Promise<IMatch[]>
}
