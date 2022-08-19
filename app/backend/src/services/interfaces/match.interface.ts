import IMatch from '../../repositories/interfaces/match.interface';

export default interface IMatchService {
  getAll(): Promise<IMatch[]>;
}
