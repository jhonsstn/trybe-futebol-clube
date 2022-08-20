import Match from '../database/models/match';
import Team from '../database/models/team';
import IDbTeamData from './interfaces/db-team-data.interface';
import ITeamRepository from './interfaces/team-repository.interface';
import ITeam from './interfaces/team.interface';

class SequelizeTeamRepository implements ITeamRepository {
  getAll = async (): Promise<ITeam[]> => {
    const teams = await Team.findAll();
    return teams;
  };

  findById = async (id: string): Promise<ITeam | null> => {
    const team = await Team.findByPk(id);
    return team;
  };

  getTeamData = async (): Promise<IDbTeamData[]> => {
    const teams = await Team.findAll({
      include: [{
        model: Match,
        as: 'homeMatches',
      }, {
        model: Match,
        as: 'awayMatches',
      }],
    });
    return teams as IDbTeamData[];
  };
}

export default SequelizeTeamRepository;
