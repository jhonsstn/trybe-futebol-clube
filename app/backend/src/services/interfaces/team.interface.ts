import ITeam from '../../repositories/interfaces/team.interface';

export default interface ITeamService {
  getAll(): Promise<ITeam[]>;
  findById(id: string): Promise<ITeam>
}
