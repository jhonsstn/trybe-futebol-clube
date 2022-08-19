import MatchController from '../controllers/match.controller';
import SequelizeMatchRepository from '../repositories/match.repository';
import SequelizeTeamRepository from '../repositories/team.repository';
import Authenticator from '../services/authentication.service';
import MatchService from '../services/match.service';

const makeMatch = () => {
  const matchRepo = new SequelizeMatchRepository();
  const authenticator = new Authenticator();
  const teamRepo = new SequelizeTeamRepository();
  const matchService = new MatchService(matchRepo, authenticator, teamRepo);
  return new MatchController(matchService);
};

export default makeMatch;
