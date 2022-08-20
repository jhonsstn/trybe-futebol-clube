import IDbTeamData from './db-team-data.interface';
import ITeam from './team.interface';

export default interface ITeamRepository {
  getAll(): Promise<ITeam[]>
  findById(id: string): Promise<ITeam | null>
  getTeamData(): Promise<IDbTeamData[]>
}
