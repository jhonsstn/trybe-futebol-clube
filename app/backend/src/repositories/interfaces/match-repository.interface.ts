import IMatch from './match.interface';
import IScoreboard from './scoreboard.interface';

export default interface IMatchRepository {
  getAll(): Promise<IMatch[]>
  getByProgress(inProgress: number): Promise<IMatch[]>
  addNewMatch(match: Omit<IMatch, 'id'>): Promise<IMatch>
  finishMatch(id: string): Promise<void>
  updateMatch(id: string, match: IScoreboard): Promise<void>
}
