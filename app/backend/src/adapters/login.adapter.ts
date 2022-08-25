import { Request, Response } from 'express';
import LoginController from '../controllers/login.controller';

const adaptLogin = (controller: LoginController) => async (req: Request, res: Response) => {
  if (req.originalUrl.includes('validate')) {
    const reqToken = req.headers.authorization;
    const role = await controller.validate(reqToken as string);
    res.status(200).json({ role });
  } else {
    const { email, password } = req.body;
    const token = await controller.login(email, password);
    res.status(200).json({ token });
  }
};

export default adaptLogin;
