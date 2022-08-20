import ITeamData from '../../services/interfaces/team-data.interface';

export default interface ILeaderboardController {
  getTeamData(): Promise<ITeamData[]>;
  getHomeTeamData(): Promise<ITeamData[]>
  getAwayTeamData(): Promise<ITeamData[]>
}
