import ITeam from './team.interface';

export default interface ITeamRepository {
  getAll(): Promise<ITeam[]>
  findById(id: string): Promise<ITeam | null>
}
