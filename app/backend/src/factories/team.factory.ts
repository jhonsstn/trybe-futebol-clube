import TeamController from '../controllers/team.controller';
import SequelizeTeamRepository from '../repositories/team.repository';
import TeamService from '../services/team.service';

const makeTeam = () => {
  const teamRepo = new SequelizeTeamRepository();
  const teamService = new TeamService(teamRepo);
  return new TeamController(teamService);
};

export default makeTeam;
