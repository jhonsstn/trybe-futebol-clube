import Match from '../../database/models/match';
import ITeam from './team.interface';

export default interface IMatch extends Omit<Match, 'inProgress'> {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number | boolean;
  teamHome?: Pick<ITeam, 'teamName'>;
  teamAway?: Pick<ITeam, 'teamName'>;
}
