import { z } from 'zod';
import * as bookmarks from '../services/bookmark.service.js';
import { CATEGORIES } from '../utils/categories.js';

const url = z.string().trim().url('Enter a complete HTTPS URL.').refine((value) => { try { const parsed = new URL(value); return parsed.protocol === 'https:' && parsed.hostname !== 'localhost' && !/^\d{1,3}(\.\d{1,3}){3}$/.test(parsed.hostname); } catch { return false; } }, 'Use a public HTTPS URL (localhost and IP addresses are not allowed).');
const bookmarkInput = z.object({ title: z.string().trim().min(2).max(120), url, description: z.string().trim().max(1000).optional().or(z.literal('')).transform((value) => value || null), category: z.enum(CATEGORIES), isFavorite: z.boolean().optional().default(false) });

export async function list(request, response, next) { try { response.json({ bookmarks: await bookmarks.listBookmarks(request.auth.userId, request.query) }); } catch (error) { next(error); } }
export async function getOne(request, response, next) { try { response.json({ bookmark: await bookmarks.getBookmark(request.params.id, request.auth.userId) }); } catch (error) { next(error); } }
export async function create(request, response, next) { try { response.status(201).json({ bookmark: await bookmarks.createBookmark(request.auth.userId, bookmarkInput.parse(request.body)) }); } catch (error) { next(error); } }
export async function update(request, response, next) { try { response.json({ bookmark: await bookmarks.updateBookmark(request.params.id, request.auth.userId, bookmarkInput.parse(request.body)) }); } catch (error) { next(error); } }
export async function remove(request, response, next) { try { await bookmarks.deleteBookmark(request.params.id, request.auth.userId); response.status(204).send(); } catch (error) { next(error); } }
export async function favorite(request, response, next) { try { response.json({ bookmark: await bookmarks.toggleFavorite(request.params.id, request.auth.userId) }); } catch (error) { next(error); } }
