import { Router } from 'express';
import { adaptLogin } from '../adapters';
import makeLogin from '../factories/login.factory';

const route = Router();

route.post('/', adaptLogin(makeLogin()));
route.get('/validate', adaptLogin(makeLogin()));

export default route;
