import MatchController from '../controllers/match.controller';
import SequelizeMatchRepository from '../repositories/match.repository';
import MatchService from '../services/match.service';

const makeMatch = () => {
  const matchRepo = new SequelizeMatchRepository();
  const matchService = new MatchService(matchRepo);
  return new MatchController(matchService);
};

export default makeMatch;
