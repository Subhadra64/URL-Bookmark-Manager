import prisma from '../config/prisma.js';
import { AppError } from '../utils/errors.js';

const ownedBookmark = (id, userId) => prisma.bookmark.findFirst({ where: { id, userId } });

export async function listBookmarks(userId, { q, category, favorites }) {
  const search = q?.trim();
  return prisma.bookmark.findMany({
    where: {
      userId,
      ...(category ? { category } : {}),
      ...(favorites === 'true' ? { isFavorite: true } : {}),
      ...(search ? { OR: [{ title: { contains: search, mode: 'insensitive' } }, { url: { contains: search, mode: 'insensitive' } }, { category: { contains: search, mode: 'insensitive' } }] } : {}),
    },
    orderBy: [{ isFavorite: 'desc' }, { updatedAt: 'desc' }],
  });
}

export async function getBookmark(id, userId) {
  const bookmark = await ownedBookmark(id, userId);
  if (!bookmark) throw new AppError('Bookmark not found.', 404);
  return bookmark;
}

export function createBookmark(userId, data) { return prisma.bookmark.create({ data: { ...data, userId } }); }

export async function updateBookmark(id, userId, data) {
  await getBookmark(id, userId);
  return prisma.bookmark.update({ where: { id }, data });
}

export async function deleteBookmark(id, userId) {
  await getBookmark(id, userId);
  await prisma.bookmark.delete({ where: { id } });
}

export async function toggleFavorite(id, userId) {
  const bookmark = await getBookmark(id, userId);
  return prisma.bookmark.update({ where: { id }, data: { isFavorite: !bookmark.isFavorite } });
}
