import IMatchRepository from '../repositories/interfaces/match-repository.interface';
import IMatch from '../repositories/interfaces/match.interface';
import IMatchService from './interfaces/match.interface';

class MatchService implements IMatchService {
  constructor(private matchRepository: IMatchRepository) {}
  getAll = async (): Promise<IMatch[]> => {
    const matches = await this.matchRepository.getAll();
    return matches;
  };
}

export default MatchService;
