import IMatchRepository from '../repositories/interfaces/match-repository.interface';
import IMatch from '../repositories/interfaces/match.interface';
import IMatchController from './interfaces/match.interface';

class MatchController implements IMatchController {
  constructor(private matchRepository: IMatchRepository) {}
  getAll = async (): Promise<IMatch[]> => {
    const matches = await this.matchRepository.getAll();
    return matches;
  };
}

export default MatchController;
