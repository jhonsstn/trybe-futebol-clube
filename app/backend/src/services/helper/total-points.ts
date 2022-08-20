import IDbTeamData from '../../repositories/interfaces/db-team-data.interface';
import IMatch from '../../repositories/interfaces/match.interface';

export const getHomePoints = (homeMatches: IMatch[]): number => {
  const homePoints = homeMatches.reduce((acc: number, match: IMatch) => {
    if (match.inProgress === 1) return acc;
    if (match.homeTeamGoals > match.awayTeamGoals) {
      return acc + 3;
    } if (match.homeTeamGoals === match.awayTeamGoals) {
      return acc + 1;
    }
    return acc;
  }, 0);
  return homePoints;
};

export const getAwayPoints = (awayMatches: IMatch[]): number => {
  const awayPoints = awayMatches.reduce((acc: number, match: IMatch) => {
    if (match.inProgress === 1) return acc;
    if (match.homeTeamGoals < match.awayTeamGoals) {
      return acc + 3;
    } if (match.homeTeamGoals === match.awayTeamGoals) {
      return acc + 1;
    }
    return acc;
  }, 0);
  return awayPoints;
};

export const getTotalPoints = (teamData:IDbTeamData): number => {
  const points = getHomePoints(teamData.homeMatches) + getAwayPoints(teamData.awayMatches);
  return points;
};
