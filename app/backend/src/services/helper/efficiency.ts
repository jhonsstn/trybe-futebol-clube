import IDbTeamData from '../../repositories/interfaces/db-team-data.interface';
import IMatch from '../../repositories/interfaces/match.interface';
import { getAwayGames, getHomeGames, getTotalGames } from './total-games';
import { getAwayPoints, getHomePoints, getTotalPoints } from './total-points';

export const getHomeEfficiency = (homeMatches:IMatch[]): number => {
  const games = getHomeGames(homeMatches);
  const points = getHomePoints(homeMatches);
  const efficiency = (points / (games * 3)) * 100;
  return efficiency;
};

export const getAwayEfficiency = (homeMatches:IMatch[]): number => {
  const games = getAwayGames(homeMatches);
  const points = getAwayPoints(homeMatches);
  const efficiency = (points / (games * 3)) * 100;
  return efficiency;
};

export const getTotalEfficiency = (teamData: IDbTeamData) => {
  const games = getTotalGames(teamData);
  const points = getTotalPoints(teamData);
  const efficiency = (points / (games * 3)) * 100;
  return efficiency;
};
