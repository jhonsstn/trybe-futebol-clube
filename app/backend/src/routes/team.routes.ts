import { Router } from 'express';
import { adaptTeam } from '../adapters';
import makeTeam from '../factories/team.factory';

const route = Router();

route.get('/:id', adaptTeam(makeTeam()));
route.get('/', adaptTeam(makeTeam()));

export default route;
