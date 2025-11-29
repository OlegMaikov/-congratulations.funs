// Simple persistence helpers moved out of main.js

export const STORAGE_KEY = "lite_book_builder_v1";

export function loadStateFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Не удалось прочитать сохранённое состояние:", err);
    return null;
  }
}

export function saveStateToStorage(stateObj) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateObj));
  } catch (err) {
    console.warn("Ошибка сохранения:", err);
  }
}