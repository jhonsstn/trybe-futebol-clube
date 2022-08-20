import IDbTeamData from '../../repositories/interfaces/db-team-data.interface';
import IMatch from '../../repositories/interfaces/match.interface';

export const getHomeGameResults = (homeMatches: IMatch[]): number[] => {
  const homeVictories = homeMatches.reduce((acc: number[], match: IMatch) => {
    if (match.inProgress === 1) return acc;
    if (match.homeTeamGoals > match.awayTeamGoals) {
      acc[0] += 1;
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      acc[1] += 1;
    }
    if (match.homeTeamGoals < match.awayTeamGoals) {
      acc[2] += 1;
    }
    return acc;
  }, [0, 0, 0]);
  return homeVictories;
};

export const getAwayGameResults = (awayMatches: IMatch[]): number[] => {
  const awayVictories = awayMatches.reduce((acc:number[], match: IMatch) => {
    if (match.inProgress === 1) return acc;
    if (match.homeTeamGoals < match.awayTeamGoals) {
      acc[0] += 1;
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      acc[1] += 1;
    }
    if (match.homeTeamGoals > match.awayTeamGoals) {
      acc[2] += 1;
    }
    return acc;
  }, [0, 0, 0]);
  return awayVictories;
};

// Function returns an array with the total number of victories, draws and losses for each team.
export const getTotalGameResults = (teamData:IDbTeamData): number[] => {
  const results = getHomeGameResults(teamData.homeMatches).map((num, index) => {
    const value = num + getAwayGameResults(teamData.awayMatches)[index];
    return value;
  });

  return results;
};
