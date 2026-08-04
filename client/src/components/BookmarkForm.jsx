import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const categories = ['Coding', 'Education', 'Shopping', 'Entertainment', 'Social', 'Development', 'Others'];
const blank = { title: '', url: '', category: 'Others', description: '', isFavorite: false };
export default function BookmarkForm({ bookmark, onSave, onCancel, saving }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: blank });
  useEffect(() => reset(bookmark ?? blank), [bookmark, reset]);
  return <form className="bookmark-form" onSubmit={handleSubmit(onSave)} noValidate>
    <label>Title<input autoFocus {...register('title', { required: 'A title is required.', minLength: { value: 2, message: 'Use at least 2 characters.' } })} />{errors.title && <small>{errors.title.message}</small>}</label>
    <label>Website URL<input placeholder="https://example.com" {...register('url', { required: 'A URL is required.', validate: (value) => { try { const parsed = new URL(value); return parsed.protocol === 'https:' && parsed.hostname !== 'localhost' || 'Use a public HTTPS URL.'; } catch { return 'Use a complete HTTPS URL.'; } } })} />{errors.url && <small>{errors.url.message}</small>}</label>
    <label>Category<select {...register('category')}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
    <label>Description<textarea rows="3" placeholder="Why save this link?" {...register('description', { maxLength: { value: 1000, message: 'Keep the description below 1,000 characters.' } })} />{errors.description && <small>{errors.description.message}</small>}</label>
    <label className="favorite-check"><input type="checkbox" {...register('isFavorite')} /> Mark as favorite</label>
    <div className="form-actions"><button type="button" className="button secondary" onClick={onCancel}>Cancel</button><button className="button" disabled={saving}>{saving ? 'Saving…' : bookmark ? 'Save changes' : 'Save bookmark'}</button></div>
  </form>;
}
