import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import logger from '../config/logger';
import { verifyJwt } from '../utils';

declare global {
	namespace Express {
		interface Request {
			user_id: string;
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

    if (!decoded) {
      res.status(401);
      throw new Error('Session expired, please login again!');
    }

    req.user_id = decoded.id ;

    next();
  } catch (error:any) {
    logger.error(`protect error: ${error.message} for access token: ${access_token}`);
    res.status(401);
    throw new Error(error.message);
  }
};
