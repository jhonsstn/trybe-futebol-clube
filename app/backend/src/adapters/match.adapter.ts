import { Request, Response } from 'express';
import MatchController from '../controllers/match.controller';

const adaptMatch = (controller: MatchController) => async (req: Request, res: Response) => {
  if (req.originalUrl.includes('finish')) {
    controller.finishMatch(req.params.id);
    return res.status(200).json({ message: 'Finished' });
  }
  if (req.params.id) {
    controller.updateMatch(req.params.id, req.body);
    return res.status(200).json({ message: 'Updated' });
  }
  if (req.method === 'POST') {
    const match = await controller.addNewMatch(req.body, req.headers.authorization as string);
    return res.status(201).json(match);
  }
  if (req.query.inProgress !== undefined) {
    const matches = await controller.getByProgress(req.query.inProgress as string);
    return res.status(200).send(matches);
  }
  const matches = await controller.getAll();
  res.status(200).json(matches);
};

export default adaptMatch;
