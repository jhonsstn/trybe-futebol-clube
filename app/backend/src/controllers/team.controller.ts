import ITeam from '../repositories/interfaces/team.interface';
import ITeamService from '../services/interfaces/team.interface';
import ITeamController from './interfaces/team.interface';

class TeamController implements ITeamController {
  constructor(private teamService: ITeamService) {}
  findAll = async (): Promise<ITeam[]> => {
    const teams = await this.teamService.findAll();
    return teams;
  };

  findById = async (id: string): Promise<ITeam> => {
    const team = await this.teamService.findById(id);
    return team;
  };
}

export default TeamController;
