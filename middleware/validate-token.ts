import { Request, Response } from 'express';
import { logger } from '../logger';
import { checkToken } from '../service/authentication';
import { isDev } from '../env';

export default async (req: Request, res: Response, next: any) => {
  if (isDev) {
    return next();
  }

  const authHeader = req.header('Authorization');
  if (!authHeader) {
    logger.error('Authorization header not found', {meta: {req, res}});
    return res.sendStatus(400);
  }
  const token = authHeader.replace('Bearer ', '');

  try {
    await checkToken(token);
    return next();
  } catch (err) {
    logger.error(`Authentication token is invalid. (message=${err.message})`, {
      stack: err.stack,
      meta: {req, res},
    });
  }
  res.sendStatus(401);
};
