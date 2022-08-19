import IMatch from '../../repositories/interfaces/match.interface';
import IScoreboard from '../../repositories/interfaces/scoreboard.interface';

export default interface IMatchController {
  getAll(): Promise<IMatch[]>;
  getByProgress(inProgress: string): Promise<IMatch[]>;
  addNewMatch(match: Omit<IMatch, 'id'>, token: string): Promise<IMatch>
  finishMatch(id: string): Promise<void>
  updateMatch(id: string, match: IScoreboard): Promise<void>
}
