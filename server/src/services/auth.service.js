import bcrypt from 'bcrypt';
import prisma from '../config/prisma.js';
import { AppError } from '../utils/errors.js';

export async function registerUser({ name, email, password }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new AppError('An account with that email already exists.', 409);
  const user = await prisma.user.create({ data: { name, email, password: await bcrypt.hash(password, 12) } });
  return sanitizeUser(user);
}

export async function authenticateUser({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) throw new AppError('Invalid email or password.', 401);
  return sanitizeUser(user);
}

export async function getUser(id) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new AppError('User not found.', 404);
  return sanitizeUser(user);
}

function sanitizeUser({ password: _password, ...user }) { return user; }
