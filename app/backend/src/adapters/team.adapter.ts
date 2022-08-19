import { Request, Response } from 'express';
import TeamController from '../controllers/team.controller';

const adaptTeam = (controller: TeamController) => async (req: Request, res: Response) => {
  if (req.params.id) {
    const team = await controller.findById(req.params.id);
    res.status(200).json(team);
  } else {
    const teams = await controller.findAll();
    res.status(200).json(teams);
  }
};

export default adaptTeam;
