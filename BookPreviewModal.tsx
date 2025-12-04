
import React, { useState } from 'react';
import { Book } from '../types';
import { BookIcon, ChevronLeftIcon } from './IconComponents';
import { useAppContext } from '../contexts/AppContext';

interface BookPreviewModalProps {
  book: Book;
  onClose: () => void;
}

export const BookPreviewModal: React.FC<BookPreviewModalProps> = ({ book, onClose }) => {
  const [viewMode, setViewMode] = useState<'3d' | 'read'>('3d');
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const { t } = useAppContext();

  const currentChapter = book.chapters[currentChapterIndex];

  // 3D Book Styles
  const bookWidth = 260;
  const bookHeight = 380;
  const bookDepth = 40; // Thickness

  return (
    <div className="fixed inset-0 bg-gray-900/90 dark:bg-black/90 z-50 flex flex-col animate-fade-in backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-transparent text-white z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold">{book.title}</h2>
        </div>
        
        <div className="flex bg-white/10 rounded-lg p-1 backdrop-blur-sm">
          <button 
            onClick={() => setViewMode('3d')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === '3d' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-300 hover:text-white'}`}
          >
            {t.preview.title3d}
          </button>
          <button 
            onClick={() => setViewMode('read')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'read' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-300 hover:text-white'}`}
          >
            {t.preview.read}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center overflow-hidden p-8 relative">
        
        {viewMode === '3d' ? (
          <div className="perspective-1000 w-full h-full flex items-center justify-center">
            <div className="relative group cursor-pointer" style={{ transformStyle: 'preserve-3d' }}>
              {/* The 3D Book Container */}
              <div 
                className="relative transition-transform duration-700 ease-out transform-style-3d group-hover:rotate-y-[-25deg] rotate-y-[-15deg] rotate-x-[10deg]"
                style={{ width: bookWidth, height: bookHeight }}
              >
                {/* Front Cover */}
                <div 
                  className="absolute inset-0 bg-white shadow-xl rounded-r-md overflow-hidden backface-hidden z-20"
                  style={{ 
                    transform: 'translateZ(20px)',
                    boxShadow: 'inset 4px 0 10px rgba(0,0,0,0.1), 10px 10px 30px rgba(0,0,0,0.4)'
                  }}
                >
                  {book.coverImage ? (
                    <img src={book.coverImage} alt="Cover" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-indigo-900 flex flex-col items-center justify-center p-6 text-center border-l-4 border-indigo-800">
                      <BookIcon className="w-16 h-16 text-indigo-300 mb-4" />
                      <h3 className="text-white font-serif text-2xl font-bold leading-tight mb-2">{book.title}</h3>
                      <p className="text-indigo-200 text-sm">{book.author}</p>
                    </div>
                  )}
                  {/* Gloss Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none" />
                </div>

                {/* Spine */}
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-gray-100"
                  style={{ 
                    width: bookDepth,
                    transform: 'rotateY(-90deg) translateZ(-20px)',
                    background: book.coverImage ? '#222' : '#312e81' // Dark or Indigo
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center rotate-180" style={{ writingMode: 'vertical-rl' }}>
                     <span className="text-gray-200 text-xs font-bold tracking-widest uppercase">{book.title.slice(0, 30)}</span>
                  </div>
                </div>

                {/* Back Cover */}
                <div 
                  className="absolute inset-0 bg-gray-50 rounded-l-md shadow-lg"
                  style={{ 
                    transform: 'rotateY(180deg) translateZ(20px)',
                    background: book.coverImage ? '#f3f4f6' : '#e0e7ff'
                  }}
                >
                  <div className="p-8 flex flex-col justify-center h-full items-center text-center">
                    <p className="text-gray-600 font-serif italic mb-4 line-clamp-6">{book.description || t.preview.noDesc}</p>
                    <div className="w-16 h-1 bg-gray-300 rounded-full mb-4"></div>
                    <p className="text-gray-400 text-xs uppercase tracking-widest">BookCraft AI Edition</p>
                  </div>
                </div>

                {/* Pages (Side View) */}
                <div 
                  className="absolute right-0 top-1 bottom-1 bg-white"
                  style={{ 
                    width: bookDepth - 4,
                    transform: 'rotateY(90deg) translateZ(128px)', // Half width roughly
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
                    backgroundImage: 'repeating-linear-gradient(90deg, #fff, #fff 1px, #f0f0f0 1px, #f0f0f0 2px)'
                  }}
                />
              </div>

              {/* Floor Shadow */}
              <div 
                className="absolute top-full left-0 w-full h-8 bg-black/30 blur-xl rounded-[50%]"
                style={{ transform: 'rotateX(90deg) translateY(-20px) scale(0.9)' }}
              />
            </div>
          </div>
        ) : (
          <div className="max-w-3xl w-full h-full bg-[#fdfbf7] dark:bg-[#1a1a1a] rounded-lg shadow-2xl flex flex-col overflow-hidden animate-fade-in relative transition-colors duration-300">
             {/* Book Texture Overlay (Light mode only) */}
             <div className="absolute inset-0 pointer-events-none opacity-50 mix-blend-multiply dark:opacity-0" 
                style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper.png")' }} 
             />

             {/* Reader Header */}
             <div className="p-6 border-b border-stone-200 dark:border-stone-800 bg-[#f8f5f0] dark:bg-[#111] flex justify-between items-center z-10 transition-colors">
                <span className="text-xs font-bold tracking-widest text-stone-500 dark:text-stone-400 uppercase">{book.author}</span>
                <span className="font-serif text-stone-800 dark:text-stone-200 font-bold">{book.title}</span>
                <span className="text-xs font-bold tracking-widest text-stone-500 dark:text-stone-400 uppercase">{t.preview.chapter} {currentChapterIndex + 1} / {book.chapters.length}</span>
             </div>

             {/* Reader Content */}
             <div className="flex-1 overflow-y-auto p-8 md:p-12 z-10 custom-scrollbar">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">{currentChapter?.title}</h2>
                <div className="prose prose-lg prose-stone dark:prose-invert mx-auto font-serif leading-loose text-gray-800 dark:text-gray-300">
                  {currentChapter?.content ? (
                    <div dangerouslySetInnerHTML={{ __html: currentChapter.content }} />
                  ) : (
                     <p className="text-center italic text-gray-400 dark:text-gray-500 mt-10">{t.preview.noContent}</p>
                  )}
                </div>
                
                {/* Chapter Navigation */}
                <div className="flex justify-between mt-16 pt-8 border-t border-stone-200 dark:border-stone-800">
                  <button 
                    disabled={currentChapterIndex === 0}
                    onClick={() => {
                        const el = document.querySelector('.custom-scrollbar');
                        if(el) el.scrollTop = 0;
                        setCurrentChapterIndex(prev => prev - 1);
                    }}
                    className="flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 disabled:opacity-30 disabled:cursor-not-allowed font-medium transition-colors"
                  >
                    <ChevronLeftIcon className="w-4 h-4" /> {t.preview.prev}
                  </button>
                  <button 
                    disabled={currentChapterIndex === book.chapters.length - 1}
                    onClick={() => {
                        const el = document.querySelector('.custom-scrollbar');
                        if(el) el.scrollTop = 0;
                        setCurrentChapterIndex(prev => prev + 1);
                    }}
                    className="flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 disabled:opacity-30 disabled:cursor-not-allowed font-medium transition-colors"
                  >
                    {t.preview.next} <ChevronLeftIcon className="w-4 h-4 rotate-180" />
                  </button>
                </div>
             </div>
          </div>
        )}
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-[-25deg] { transform: rotateY(-25deg); }
        .rotate-x-\\[10deg\\] { transform: rotateX(10deg); }
      `}</style>
    </div>
  );
};
