/** @format */

import { z } from "zod";

export const registerUserInputValidator = z.object({
	name: z.string(
		{
			invalid_type_error: 'Name must be a string',
			required_error: 'Name is required',
		}
	).min(3, 'Name is required'),
	email: z.string({
		invalid_type_error: 'Email must be a string',
		required_error: 'Email is required',
	}).email('Invalid email address'),
	password: z.string({
		invalid_type_error: 'Password must be a string',
		required_error: 'Password is required',
	}).min(6, 'Password must be at least 6 characters'),
});

export type RegisterUserInput = z.infer<typeof registerUserInputValidator>;

export const loginUserInputValidator = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginUserInput = z.infer<typeof loginUserInputValidator>;