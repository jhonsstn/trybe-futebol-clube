import ITeamData from './team-data.interface';

export default interface ILeaderboardService {
  getTeamData(): Promise<ITeamData[]>
  getHomeTeamData(): Promise<ITeamData[]>
  getAwayTeamData(): Promise<ITeamData[]>
}
