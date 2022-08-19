import { Router } from 'express';
import adaptMatch from '../adapters/match.adapter';
import makeMatch from '../factories/match.factory';

const route = Router();

route.get('/', adaptMatch(makeMatch()));

export default route;
