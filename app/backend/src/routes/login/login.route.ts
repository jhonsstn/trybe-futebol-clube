import { Router } from 'express';
import adaptLogin from '../../adapters/login.adapter';
import makeLogin from './login.factory';

const route = Router();

route.post('/', adaptLogin(makeLogin()));
route.get('/validate', adaptLogin(makeLogin()));

export default route;
