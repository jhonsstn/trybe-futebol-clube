import Match from '../database/models/match';
import Team from '../database/models/team';
import IMatchRepository from './interfaces/match-repository.interface';
import IMatch from './interfaces/match.interface';

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
    return matches as IMatch[];
  };
}

export default SequelizeMatchRepository;
