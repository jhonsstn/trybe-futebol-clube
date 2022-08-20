import IDbTeamData from '../../repositories/interfaces/db-team-data.interface';
import IMatch from '../../repositories/interfaces/match.interface';

export const getHomeGoals = (homeMatches: IMatch[]): number[] => {
  const homePoints = homeMatches.reduce((acc: number[], match: IMatch) => {
    if (match.inProgress === 1) return acc;
    acc[0] += match.homeTeamGoals;
    acc[1] += match.awayTeamGoals;
    return acc;
  }, [0, 0]);
  const homeGoalsBalance = homePoints[0] - homePoints[1];
  return [...homePoints, homeGoalsBalance];
};

export const getAwayGoals = (awayMatches: IMatch[]): number[] => {
  const awayPoints = awayMatches.reduce((acc: number[], match: IMatch) => {
    if (match.inProgress === 1) return acc;
    acc[0] += match.awayTeamGoals;
    acc[1] += match.homeTeamGoals;
    return acc;
  }, [0, 0]);
  const awayGoalsBalance = awayPoints[0] - awayPoints[1];
  return [...awayPoints, awayGoalsBalance];
};

// Function returns an array with the total number of goals home, away ans the goals balance.
export const getTotalGoals = (teamData:IDbTeamData): number[] => {
  const homeAndAwayGoals = getHomeGoals(teamData.homeMatches).map((goals, index) => {
    const value = goals + getAwayGoals(teamData.awayMatches)[index];
    return value;
  });
  const totalGoalsBalance = homeAndAwayGoals[0] - homeAndAwayGoals[1];
  return [...homeAndAwayGoals, totalGoalsBalance];
};
