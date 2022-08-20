import ILeaderboardService from '../services/interfaces/leaderboard.interface';
import ITeamData from '../services/interfaces/team-data.interface';
import ILeaderboardController from './interfaces/leaderboard.interface';

class LeaderboardController implements ILeaderboardController {
  constructor(private leaderboardService: ILeaderboardService) {}
  getTeamData = async (): Promise<ITeamData[]> => {
    const teamsData = await this.leaderboardService.getTeamData();
    return teamsData;
  };

  getHomeTeamData = async (): Promise<ITeamData[]> => {
    const teamsData = await this.leaderboardService.getHomeTeamData();
    return teamsData;
  };

  getAwayTeamData = async (): Promise<ITeamData[]> => {
    const teamsData = await this.leaderboardService.getAwayTeamData();
    return teamsData;
  };
}

export default LeaderboardController;
