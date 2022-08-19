import Team from '../database/models/team';
import ITeamRepository from './interfaces/team-repository.interface';
import ITeam from './interfaces/team.interface';

class SequelizeTeamRepository implements ITeamRepository {
  findAll = async (): Promise<ITeam[]> => {
    const teams = await Team.findAll();
    return teams;
  };

  findById = async (id: string): Promise<ITeam | null> => {
    const team = await Team.findByPk(id);
    return team;
  };
}

export default SequelizeTeamRepository;
