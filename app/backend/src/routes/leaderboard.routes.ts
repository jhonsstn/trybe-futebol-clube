import { Router } from 'express';
import adaptLeaderboard from '../adapters/leaderboard.adapter';
import makeLeaderboard from '../factories/leaderboard.factory';

const route = Router();

route.get('/', adaptLeaderboard(makeLeaderboard()));
route.get('/home', adaptLeaderboard(makeLeaderboard()));
route.get('/away', adaptLeaderboard(makeLeaderboard()));

export default route;
