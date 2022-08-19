import { Router } from 'express';
import adaptMatch from '../adapters/match.adapter';
import makeMatch from '../factories/match.factory';

const route = Router();

route.patch('/:id/finish', adaptMatch(makeMatch()));
route.patch('/:id', adaptMatch(makeMatch()));
route.get('/', adaptMatch(makeMatch()));
route.post('/', adaptMatch(makeMatch()));

export default route;
