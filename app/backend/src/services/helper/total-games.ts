import IDbTeamData from '../../repositories/interfaces/db-team-data.interface';
import IMatch from '../../repositories/interfaces/match.interface';

export const getHomeGames = (homeMatches:IMatch[]): number => {
  const games = homeMatches.filter((match) => match.inProgress !== 1).length;
  return games;
};

export const getAwayGames = (awayMatches:IMatch[]): number => {
  const games = awayMatches.filter((match) => match.inProgress !== 1).length;
  return games;
};

export const getTotalGames = (teamData:IDbTeamData): number => {
  const homeAndAwayGames = getHomeGames(teamData.homeMatches) + getAwayGames(teamData.awayMatches);
  return homeAndAwayGames;
};
