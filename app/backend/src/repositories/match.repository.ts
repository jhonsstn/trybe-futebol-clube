import Match from '../database/models/match';
import Team from '../database/models/team';
import IMatchRepository from './interfaces/match-repository.interface';
import IMatch from './interfaces/match.interface';
import IScoreboard from './interfaces/scoreboard.interface';

class SequelizeMatchRepository implements IMatchRepository {
  getAll = async (): Promise<IMatch[]> => {
    const matches = await Match.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: ['teamName'],
      }, {
        model: Team,
        as: 'teamAway',
        attributes: ['teamName'] }],
      raw: true,
      nest: true,
    });
    return matches;
  };

  getByProgress = async (inProgress: number): Promise<IMatch[]> => {
    const matches = await Match.findAll({
      where: { inProgress },
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: ['teamName'],
      }, {
        model: Team,
        as: 'teamAway',
        attributes: ['teamName'] }],
      raw: true,
      nest: true,
    });
    return matches;
  };

  addNewMatch = async (match: Omit<IMatch, 'id'>): Promise<IMatch> => {
    const newMatch = await Match.create(match);
    return newMatch;
  };

  finishMatch = async (id: string): Promise<void> => {
    await Match.update({ inProgress: 0 }, { where: { id } });
  };

  updateMatch = async (id: string, match: IScoreboard): Promise<void> => {
    await Match.update(match, { where: { id } });
  };
}

export default SequelizeMatchRepository;
