
import React, { useState, useEffect } from 'react';
import { Book, ViewState } from './types';
import { getBooks, saveBooks, createNewBook, getSession, saveSession } from './services/storageService';
import { BookDashboard } from './components/BookDashboard';
import { Editor } from './components/Editor';
import { LandingPage } from './components/LandingPage';
import { useAppContext } from './contexts/AppContext';
import { SunIcon, MoonIcon, GlobeIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  
  // Initialize state from saved session
  const [currentView, setCurrentView] = useState<ViewState | 'landing'>(() => {
    const session = getSession();
    return session.view;
  });
  
  const [selectedBookId, setSelectedBookId] = useState<string | null>(() => {
    const session = getSession();
    return session.selectedBookId;
  });
  
  const { theme, toggleTheme, language, setLanguage } = useAppContext();

  // Load books on mount
  useEffect(() => {
    const loadedBooks = getBooks();
    setBooks(loadedBooks);
    
    // Validation: If saved session points to a deleted book, revert to dashboard
    const session = getSession();
    if (session.view === 'editor' && session.selectedBookId) {
      const bookExists = loadedBooks.some(b => b.id === session.selectedBookId);
      if (!bookExists) {
        setCurrentView('dashboard');
        setSelectedBookId(null);
        saveSession({ view: 'dashboard', selectedBookId: null });
      }
    }
  }, []);

  // Persist session whenever view or selection changes
  useEffect(() => {
    saveSession({
      view: currentView,
      selectedBookId: selectedBookId
    });
  }, [currentView, selectedBookId]);

  const handleStart = () => {
    setCurrentView('dashboard');
  };

  const handleCreateNewBook = () => {
    const newBook = createNewBook();
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    saveBooks(updatedBooks);
    
    setSelectedBookId(newBook.id);
    setCurrentView('editor');
  };

  const handleSelectBook = (bookId: string) => {
    setSelectedBookId(bookId);
    setCurrentView('editor');
  };

  const handleUpdateBook = (updatedBook: Book) => {
    const updatedBooks = books.map(b => b.id === updatedBook.id ? updatedBook : b);
    setBooks(updatedBooks);
    saveBooks(updatedBooks); // Persist immediately
  };

  const handleDeleteBook = (bookId: string) => {
    const updatedBooks = books.filter(b => b.id !== bookId);
    setBooks(updatedBooks);
    saveBooks(updatedBooks);
    if (selectedBookId === bookId) {
      setSelectedBookId(null);
      setCurrentView('dashboard');
    }
  };

  const handleImportBook = (newBook: Book) => {
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    saveBooks(updatedBooks);
    // Optionally open the imported book immediately
    // setSelectedBookId(newBook.id);
    // setCurrentView('editor');
  };

  const handleBackToDashboard = () => {
    setSelectedBookId(null);
    setCurrentView('dashboard');
  };

  const selectedBook = books.find(b => b.id === selectedBookId);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      
      {/* Global Controls (Theme & Lang) - Bottom Left Position */}
      <div className="fixed bottom-6 left-6 z-[60] flex flex-col items-center gap-3">
         {/* Language Toggle */}
         <button 
           onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
           className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all transform hover:scale-110 text-gray-700 dark:text-gray-200"
           title="Switch Language"
         >
           <span className="flex items-center justify-center text-xs font-bold w-5 h-5">
             {language === 'ru' ? 'RU' : 'EN'}
           </span>
         </button>

         {/* Theme Toggle */}
         <button 
           onClick={toggleTheme}
           className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all transform hover:scale-110 text-gray-700 dark:text-gray-200"
           title="Toggle Theme"
         >
           {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
         </button>
      </div>

      {currentView === 'landing' && (
        <LandingPage onStart={handleStart} />
      )}

      {currentView === 'dashboard' && (
        <BookDashboard 
          books={books} 
          onCreateNew={handleCreateNewBook} 
          onSelectBook={handleSelectBook}
          onDeleteBook={handleDeleteBook}
          onImportBook={handleImportBook}
        />
      )}

      {currentView === 'editor' && selectedBook && (
        <Editor 
          book={selectedBook}
          onUpdateBook={handleUpdateBook}
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
};

export default App;
