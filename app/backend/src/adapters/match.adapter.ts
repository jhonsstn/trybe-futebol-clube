import { Request, Response } from 'express';
import MatchController from '../controllers/match.controller';

const adaptMatch = (controller: MatchController) => async (req: Request, res: Response) => {
  const matches = await controller.getAll();
  res.status(200).json(matches);
};

export default adaptMatch;
