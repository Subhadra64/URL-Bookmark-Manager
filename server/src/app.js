import cors from 'cors';
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import bookmarkRoutes from './routes/bookmark.routes.js';
import { requireAuth } from './middleware/auth.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json({ limit: '100kb' }));

app.get('/health', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/bookmarks', requireAuth, bookmarkRoutes);

app.use((_request, response) => {
  response.status(404).json({ message: 'Route not found.' });
});

app.use(errorHandler);

export default app;
