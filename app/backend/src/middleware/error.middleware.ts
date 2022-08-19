import { NextFunction, Request, Response } from 'express';

interface IError extends Error {
  statusCode: number;
}

const errorMiddleware = (err: IError, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.statusCode || 500).json({ message: err.message });
};

export default errorMiddleware;
