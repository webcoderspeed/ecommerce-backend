/** @format */

import { Express, NextFunction, Request, Response } from 'express';
import authRoutes from './auth.route';

const basePath = '/api/v1';

const routes = (app: Express) => {
	app.get(`${basePath}`, (req: Request, res: Response, next: NextFunction) => {
		res.status(200).json({
			message: 'Welcome to the API',
			version: process.env.npm_package_version ,
			status: 'success',
		});
	});

	app.use(`${basePath}/auth`, authRoutes);
};

export default routes;
