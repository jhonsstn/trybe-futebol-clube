import Match from '../../database/models/match';
import ITeam from './team.interface';

export default interface IMatch extends Match {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number;
  teamHome: Pick<ITeam, 'teamName'>;
  teamAway: Pick<ITeam, 'teamName'>;
}
