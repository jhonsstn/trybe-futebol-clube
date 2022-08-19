import ITeam from '../../repositories/interfaces/team.interface';

export default interface ITeamController {
  getAll(): Promise<ITeam[]>;
  findById(id: string): Promise<ITeam>
}
