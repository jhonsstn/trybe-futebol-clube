import LeaderboardController from '../controllers/leaderboard.controller';
import SequelizeTeamRepository from '../repositories/team.repository';
import LeaderboardService from '../services/leaderboard.service';

const makeLeaderboard = () => {
  const teamRepo = new SequelizeTeamRepository();
  const leaderboardService = new LeaderboardService(teamRepo);
  return new LeaderboardController(leaderboardService);
};

export default makeLeaderboard;
