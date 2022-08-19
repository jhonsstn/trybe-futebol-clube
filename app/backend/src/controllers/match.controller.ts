import IMatch from '../repositories/interfaces/match.interface';
import IScoreboard from '../repositories/interfaces/scoreboard.interface';
import IMatchService from '../services/interfaces/match.interface';
import IMatchController from './interfaces/match.interface';

class MatchController implements IMatchController {
  constructor(private matchService: IMatchService) {}
  getAll = async (): Promise<IMatch[]> => {
    const matches = await this.matchService.getAll();
    return matches;
  };

  getByProgress = async (inProgress: string): Promise<IMatch[]> => {
    const matches = await this.matchService.getByProgress(inProgress);
    return matches;
  };

  addNewMatch = async (match: Omit<IMatch, 'id'>, token: string): Promise<IMatch> => {
    const newMatch = await this.matchService.addNewMatch(match, token);
    return newMatch;
  };

  finishMatch = async (id: string): Promise<void> => {
    await this.matchService.finishMatch(id);
  };

  updateMatch = async (id: string, match: IScoreboard): Promise<void> => {
    await this.matchService.updateMatch(id, match);
  };
}

export default MatchController;
