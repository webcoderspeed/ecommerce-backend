import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import logger from '../config/logger';
import { verifyJwt } from '../utils';
import { IUser } from '../types';

declare global {
	namespace Express {
		interface Request {
			user: IUser;
		}
	}
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const { access_token } = req.cookies;

  const schema = joi.object({
    access_token: joi
      .string()
      .required()
      .error(new Error('Session expired, please login again!')),
  });

  const { error } = schema.validate({
    access_token,
  });

  if (error) next(error);

  try {
    const decoded = verifyJwt(access_token);

    req.user = decoded as IUser;

    next();
  } catch (error:any) {
    logger.error(`protect error: ${error.message} for access token: ${access_token}`);
    res.status(401);
    throw new Error(error.message);
  }
};
