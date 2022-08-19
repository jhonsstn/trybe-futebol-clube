import IMatch from '../../repositories/interfaces/match.interface';

export default interface IMatchController {
  getAll(): Promise<IMatch[]>;
}
