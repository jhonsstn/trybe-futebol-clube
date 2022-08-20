import ITeamRepository from '../repositories/interfaces/team-repository.interface';
import { getAwayEfficiency, getHomeEfficiency, getTotalEfficiency } from './helper/efficiency';
import {
  getAwayGameResults,
  getHomeGameResults,
  getTotalGameResults,
} from './helper/total-game-results';
import { getAwayGames, getHomeGames, getTotalGames } from './helper/total-games';
import { getAwayGoals, getHomeGoals, getTotalGoals } from './helper/total-goals';
import { getAwayPoints, getHomePoints, getTotalPoints } from './helper/total-points';
import ILeaderboardService from './interfaces/leaderboard.interface';
import ITeamData from './interfaces/team-data.interface';

class LeaderboardService implements ILeaderboardService {
  constructor(private teamRepo: ITeamRepository) {}
  getTeamData = async (): Promise<ITeamData[]> => {
    const teamsData = await this.teamRepo.getTeamData();
    const mapTeams = teamsData.map((teamData) => ({
      name: teamData.teamName,
      totalPoints: getTotalPoints(teamData),
      totalGames: getTotalGames(teamData),
      totalVictories: getTotalGameResults(teamData)[0],
      totalDraws: getTotalGameResults(teamData)[1],
      totalLosses: getTotalGameResults(teamData)[2],
      goalsFavor: getTotalGoals(teamData)[0],
      goalsOwn: getTotalGoals(teamData)[1],
      goalsBalance: getTotalGoals(teamData)[2],
      efficiency: getTotalEfficiency(teamData).toFixed(2),
    }))
      .sort((a, b) => b.goalsOwn + a.goalsOwn)
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalPoints - a.totalPoints);
    return mapTeams;
  };

  getHomeTeamData = async (): Promise<ITeamData[]> => {
    const teamsData = await this.teamRepo.getTeamData();
    const mapTeams = teamsData.map((teamData) => ({
      name: teamData.teamName,
      totalPoints: getHomePoints(teamData.homeMatches),
      totalGames: getHomeGames(teamData.homeMatches),
      totalVictories: getHomeGameResults(teamData.homeMatches)[0],
      totalDraws: getHomeGameResults(teamData.homeMatches)[1],
      totalLosses: getHomeGameResults(teamData.homeMatches)[2],
      goalsFavor: getHomeGoals(teamData.homeMatches)[0],
      goalsOwn: getHomeGoals(teamData.homeMatches)[1],
      goalsBalance: getHomeGoals(teamData.homeMatches)[2],
      efficiency: getHomeEfficiency(teamData.homeMatches).toFixed(2),
    }))
      .sort((a, b) => b.goalsOwn + a.goalsOwn)
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => +b.totalPoints - +a.totalPoints);

    return mapTeams;
  };

  getAwayTeamData = async (): Promise<ITeamData[]> => {
    const teamsData = await this.teamRepo.getTeamData();
    const mapTeams = teamsData.map((teamData) => ({
      name: teamData.teamName,
      totalPoints: getAwayPoints(teamData.awayMatches),
      totalGames: getAwayGames(teamData.awayMatches),
      totalVictories: getAwayGameResults(teamData.awayMatches)[0],
      totalDraws: getAwayGameResults(teamData.awayMatches)[1],
      totalLosses: getAwayGameResults(teamData.awayMatches)[2],
      goalsFavor: getAwayGoals(teamData.awayMatches)[0],
      goalsOwn: getAwayGoals(teamData.awayMatches)[1],
      goalsBalance: getAwayGoals(teamData.awayMatches)[2],
      efficiency: getAwayEfficiency(teamData.awayMatches).toFixed(2),
    }))
      .sort((a, b) => b.goalsOwn + a.goalsOwn)
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => +b.totalPoints - +a.totalPoints);
    return mapTeams;
  };
}

export default LeaderboardService;
