import Team from '../../database/models/team';
import IMatch from './match.interface';

export default interface IDbTeamData extends Team {
  id: number;
  teamName: string;
  homeMatches: IMatch[];
  awayMatches: IMatch[];
}
