import { Request, Response } from 'express';
import LoginController from '../controllers/login.controller';
import Authenticator from '../services/authentication.service';

const adaptLogin = (controller: LoginController) => async (req: Request, res: Response) => {
  if (req.originalUrl.includes('validate')) {
    const reqToken = req.headers.authorization;
    const authenticator = new Authenticator();
    const { role } = authenticator.decode(reqToken as string);
    res.status(200).json({ role });
  } else {
    const { email, password } = req.body;
    const token = await controller.login(email, password);
    res.status(200).json({ token });
  }
};

export default adaptLogin;
