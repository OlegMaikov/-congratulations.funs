
import { Book } from '../types';

const STORAGE_KEY = 'bookcraft_books_v1';
const SESSION_KEY = 'bookcraft_session_v1';

export interface AppSession {
  view: 'landing' | 'dashboard' | 'editor';
  selectedBookId: string | null;
}

export const getBooks = (): Book[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load books', error);
    return [];
  }
};

export const saveBooks = (books: Book[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch (error) {
    console.error('Failed to save books', error);
  }
};

export const getSession = (): AppSession => {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : { view: 'landing', selectedBookId: null };
  } catch {
    return { view: 'landing', selectedBookId: null };
  }
};

export const saveSession = (session: AppSession): void => {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (error) {
    console.error('Failed to save session', error);
  }
};

export const createNewBook = (): Book => {
  return {
    id: crypto.randomUUID(),
    title: 'Новая книга',
    author: 'Неизвестный автор',
    description: '',
    coverImage: null,
    chapters: [
      {
        id: crypto.randomUUID(),
        type: 'chapter',
        title: 'Глава 1',
        content: '',
        notes: '',
        lastUpdated: Date.now(),
      },
    ],
    createdAt: Date.now(),
    lastUpdated: Date.now(),
  };
};
