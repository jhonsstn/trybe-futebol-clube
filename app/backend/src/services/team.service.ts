import NotFoundError from '../errors/not-found.error';
import ITeamRepository from '../repositories/interfaces/team-repository.interface';
import ITeam from '../repositories/interfaces/team.interface';
import ITeamService from './interfaces/team.interface';

class TeamService implements ITeamService {
  constructor(private teamRepository: ITeamRepository) {}
  getAll = async (): Promise<ITeam[]> => {
    const teams = await this.teamRepository.getAll();
    return teams;
  };

  findById = async (id: string): Promise<ITeam> => {
    const team = await this.teamRepository.findById(id);
    if (!team) {
      throw new NotFoundError('Team not found');
    }
    return team;
  };
}

export default TeamService;
