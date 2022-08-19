import NotFoundError from '../errors/not-found.error';
import UnauthorizedError from '../errors/unauthorized.error';
import IMatchRepository from '../repositories/interfaces/match-repository.interface';
import IMatch from '../repositories/interfaces/match.interface';
import IScoreboard from '../repositories/interfaces/scoreboard.interface';
import ITeamRepository from '../repositories/interfaces/team-repository.interface';
import IAuthenticator from './interfaces/authenticator.interface';
import IMatchService from './interfaces/match.interface';

class MatchService implements IMatchService {
  constructor(
    private matchRepository: IMatchRepository,
    private authenticator: IAuthenticator,
    private teamRepo: ITeamRepository,
  ) {}

  getAll = async (): Promise<IMatch[]> => {
    const matches = await this.matchRepository.getAll();
    return matches;
  };

  getByProgress = async (inProgress: string): Promise<IMatch[]> => {
    const inProgressNumber: number = inProgress === 'true' ? 1 : 0;
    const matches = await this.matchRepository.getByProgress(inProgressNumber);

    return matches.map((match) => ({
      ...match,
      inProgress: inProgress === 'true',
    }));
  };

  addNewMatch = async (match: Omit<IMatch, 'id'>, token: string): Promise<IMatch> => {
    this.authenticator.decode(token);
    if (match.homeTeam === match.awayTeam) {
      throw new UnauthorizedError('It is not possible to create a match with two equal teams');
    }
    await Promise.all([match.homeTeam, match.awayTeam].map(async (teamId) => {
      const team = await this.teamRepo.findById(teamId.toString());
      if (!team) throw new NotFoundError('There is no team with such id!');
    }));
    const newMatch = await this.matchRepository.addNewMatch({ ...match, inProgress: 1 });
    const plainNewMatch = newMatch.toJSON() as IMatch;
    return { ...plainNewMatch, inProgress: true };
  };

  finishMatch = async (id: string): Promise<void> => {
    await this.matchRepository.finishMatch(id);
  };

  updateMatch = async (id: string, match: IScoreboard): Promise<void> => {
    await this.matchRepository.updateMatch(id, match);
  };
}

export default MatchService;
