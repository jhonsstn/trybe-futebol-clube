import { Request, Response } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const adaptLeaderboard = (controller: LeaderboardController) => async (
  req: Request,
  res: Response,
) => {
  if (req.originalUrl.includes('home')) {
    const leaderboard = await controller.getHomeTeamData();
    return res.status(200).json(leaderboard);
  }
  if (req.originalUrl.includes('away')) {
    const leaderboard = await controller.getAwayTeamData();
    return res.status(200).json(leaderboard);
  }
  const teamsData = await controller.getTeamData();
  res.status(200).json(teamsData);
};

export default adaptLeaderboard;
