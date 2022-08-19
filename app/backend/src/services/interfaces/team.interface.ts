import ITeam from '../../repositories/interfaces/team.interface';

export default interface ITeamService {
  findAll(): Promise<ITeam[]>;
  findById(id: string): Promise<ITeam>
}
