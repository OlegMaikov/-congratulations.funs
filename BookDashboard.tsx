
import React, { useRef } from 'react';
import { Book } from '../types';
import { BookIcon, PlusIcon, TrashIcon, UploadIcon, DownloadIcon } from './IconComponents';
import { useAppContext } from '../contexts/AppContext';

interface BookDashboardProps {
  books: Book[];
  onCreateNew: () => void;
  onSelectBook: (bookId: string) => void;
  onDeleteBook: (bookId: string) => void;
  onImportBook: (book: Book) => void;
}

export const BookDashboard: React.FC<BookDashboardProps> = ({ books, onCreateNew, onSelectBook, onDeleteBook, onImportBook }) => {
  const { t } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedBook = JSON.parse(content) as Book;
        
        // Basic validation
        if (parsedBook.id && parsedBook.title && Array.isArray(parsedBook.chapters)) {
          // Regenerate ID to avoid conflicts if importing the same book
          const newBook = {
            ...parsedBook,
            id: crypto.randomUUID(),
            title: `${parsedBook.title} (Imported)`
          };
          onImportBook(newBook);
        } else {
          alert(t.dashboard.importError);
        }
      } catch (err) {
        console.error("Import failed", err);
        alert(t.dashboard.importError);
      }
    };
    reader.readAsText(file);
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleBackup = (e: React.MouseEvent, book: Book) => {
    e.stopPropagation();
    const dataStr = JSON.stringify(book, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${book.title.replace(/\s+/g, '_')}_Backup.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 transition-colors duration-300">
      <header className="flex flex-wrap justify-between items-center mb-10 mt-4 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <BookIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            {t.dashboard.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{t.dashboard.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".json"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 px-5 py-3 rounded-lg shadow-sm flex items-center gap-2 transition-transform transform hover:scale-105 active:scale-95 font-medium"
          >
            <UploadIcon className="w-5 h-5" />
            <span className="hidden sm:inline">{t.dashboard.importBook}</span>
          </button>
          <button
            onClick={onCreateNew}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-transform transform hover:scale-105 active:scale-95 font-medium"
          >
            <PlusIcon className="w-5 h-5" />
            {t.dashboard.newBook}
          </button>
        </div>
      </header>

      {books.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-dashed border-gray-300 dark:border-gray-700 transition-colors">
          <div className="mx-auto w-16 h-16 bg-indigo-50 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mb-4">
            <BookIcon className="w-8 h-8 text-indigo-400 dark:text-indigo-300" />
          </div>
          <h2 className="text-xl font-medium text-gray-800 dark:text-white mb-2">{t.dashboard.emptyTitle}</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">{t.dashboard.emptyDesc}</p>
          <button
            onClick={onCreateNew}
            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline"
          >
            {t.dashboard.createFirst} &rarr;
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <div 
              key={book.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 transition-all overflow-hidden group flex flex-col h-full cursor-pointer"
              onClick={() => onSelectBook(book.id)}
            >
              <div className="h-48 bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                {book.coverImage ? (
                  <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600">
                    <BookIcon className="w-16 h-16 text-indigo-200 dark:text-gray-500" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors" />
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{book.author}</p>
                
                <div className="mt-auto flex justify-between items-center text-xs text-gray-400 dark:text-gray-500 border-t dark:border-gray-700 pt-4">
                  <span>{book.chapters.length} {t.dashboard.chapters}</span>
                  <div className="flex gap-1">
                    <button 
                      onClick={(e) => handleBackup(e, book)}
                      className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors"
                      title={t.dashboard.backup}
                    >
                      <DownloadIcon className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(t.dashboard.deleteConfirm)) {
                          onDeleteBook(book.id);
                        }
                      }}
                      className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-md transition-colors"
                      title={t.dashboard.deleteConfirm}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
