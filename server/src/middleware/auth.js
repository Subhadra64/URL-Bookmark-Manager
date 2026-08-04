import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errors.js';

export function requireAuth(request, _response, next) {
  const token = request.headers.authorization?.startsWith('Bearer ')
    ? request.headers.authorization.slice(7)
    : null;

  if (!token) return next(new AppError('Authentication is required.', 401));

  try {
    request.auth = { userId: jwt.verify(token, process.env.JWT_SECRET).sub };
    return next();
  } catch {
    return next(new AppError('Your session is invalid or has expired.', 401));
  }
}
