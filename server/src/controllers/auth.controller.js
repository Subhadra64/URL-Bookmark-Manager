import { z } from 'zod';
import { authenticateUser, getUser, registerUser } from '../services/auth.service.js';
import { createAccessToken } from '../utils/tokens.js';

const credentials = z.object({ email: z.string().trim().email('Enter a valid email.').transform((value) => value.toLowerCase()), password: z.string().min(8, 'Password must contain at least 8 characters.') });
const registration = credentials.extend({ name: z.string().trim().min(2, 'Name must contain at least 2 characters.').max(80) });

export async function register(request, response, next) {
  try { const user = await registerUser(registration.parse(request.body)); return response.status(201).json({ user, token: createAccessToken(user.id) }); } catch (error) { return next(error); }
}
export async function login(request, response, next) {
  try { const user = await authenticateUser(credentials.parse(request.body)); return response.json({ user, token: createAccessToken(user.id) }); } catch (error) { return next(error); }
}
export async function me(request, response, next) {
  try { return response.json({ user: await getUser(request.auth.userId) }); } catch (error) { return next(error); }
}
