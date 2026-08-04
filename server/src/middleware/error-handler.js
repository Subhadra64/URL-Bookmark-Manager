import { ZodError } from 'zod';

export function errorHandler(error, _request, response, _next) {
  if (error instanceof ZodError) {
    return response.status(422).json({ message: 'Please correct the highlighted fields.', issues: error.flatten().fieldErrors });
  }
  if (error.code === 'P2002') return response.status(409).json({ message: 'An account with that email already exists.' });
  if (error.code === 'P2025') return response.status(404).json({ message: 'Resource not found.' });

  const status = error.statusCode ?? 500;
  if (status >= 500) console.error(error);
  return response.status(status).json({ message: status >= 500 ? 'Something went wrong. Please try again.' : error.message });
}
