import ITeam from './team.interface';

export default interface ITeamRepository {
  findAll(): Promise<ITeam[]>
  findById(id: string): Promise<ITeam | null>
}
