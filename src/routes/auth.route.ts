import { Router } from "express";
import * as authControllers from '../controllers'
import { protect } from "../middlewares";
import * as authValidators from "../validators";

const router = Router();

router.post(
  '/register',
  authControllers.registerUser
);

router.post(
  '/login',
  authControllers.loginUser
);

export default router;