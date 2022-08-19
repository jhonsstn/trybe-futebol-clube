import ITeam from '../../repositories/interfaces/team.interface';

export default interface ITeamController {
  findAll(): Promise<ITeam[]>;
  findById(id: string): Promise<ITeam>
}
