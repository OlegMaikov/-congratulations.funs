
import React, { useState, useRef, useEffect } from 'react';
import { Book, Chapter, ChapterType } from '../types';
import { 
  ChevronLeftIcon, 
  PlusIcon, 
  TrashIcon, 
  SparklesIcon, 
  ImageIcon, 
  DownloadIcon,
  WandIcon,
  EyeIcon,
  GripVerticalIcon,
  StickyNoteIcon,
  SettingsIcon,
  FileTextIcon
} from './IconComponents';
import { generateBookOutline, continueWriting, improveStyle, generateCoverImage } from '../services/geminiService';
import { ExportModal } from './ExportModal';
import { BookPreviewModal } from './BookPreviewModal';
import { RichTextEditor } from './RichTextEditor';
import { useAppContext } from '../contexts/AppContext';

interface EditorProps {
  book: Book;
  onUpdateBook: (updatedBook: Book) => void;
  onBack: () => void;
}

export const Editor: React.FC<EditorProps> = ({ book, onUpdateBook, onBack }) => {
  const [activeChapterId, setActiveChapterId] = useState<string>(() => {
    const savedChapterId = localStorage.getItem(`bookcraft_last_chapter_${book.id}`);
    if (savedChapterId && book.chapters.some(c => c.id === savedChapterId)) {
      return savedChapterId;
    }
    return book.chapters[0]?.id || '';
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [isCoverGenerating, setIsCoverGenerating] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  
  // Settings
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('serif');
  const [showSettings, setShowSettings] = useState(false);

  // Drag and Drop State
  const [draggedChapterIndex, setDraggedChapterIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t, language } = useAppContext();

  const activeChapter = book.chapters.find(c => c.id === activeChapterId);

  useEffect(() => {
    if (!activeChapterId && book.chapters.length > 0) {
      setActiveChapterId(book.chapters[0].id);
    }
  }, [book.chapters, activeChapterId]);

  useEffect(() => {
    if (activeChapterId) {
      localStorage.setItem(`bookcraft_last_chapter_${book.id}`, activeChapterId);
    }
  }, [activeChapterId, book.id]);

  const handleUpdateBookMeta = (field: keyof Book, value: string) => {
    onUpdateBook({ ...book, [field]: value, lastUpdated: Date.now() });
  };

  const handleAddChapter = (type: ChapterType = 'chapter') => {
    const newChapter: Chapter = {
      id: crypto.randomUUID(),
      type: type,
      title: type === 'chapter' ? `${t.editor.chapter} ${book.chapters.length + 1}` : 
             type === 'prologue' ? t.editor.types.prologue :
             type === 'epilogue' ? t.editor.types.epilogue : t.editor.types.annotation,
      content: '',
      notes: '',
      lastUpdated: Date.now(),
    };
    onUpdateBook({
      ...book,
      chapters: [...book.chapters, newChapter],
      lastUpdated: Date.now(),
    });
    setActiveChapterId(newChapter.id);
  };

  const handleDeleteChapter = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (book.chapters.length <= 1) {
      alert("At least one chapter required.");
      return;
    }
    if (confirm(t.editor.confirmDeleteChapter)) {
      const newChapters = book.chapters.filter(c => c.id !== id);
      onUpdateBook({ ...book, chapters: newChapters });
      if (activeChapterId === id) {
        setActiveChapterId(newChapters[0].id);
      }
    }
  };

  const handleUpdateChapter = (field: keyof Chapter, value: string) => {
    if (!activeChapter) return;
    const updatedChapters = book.chapters.map(c => 
      c.id === activeChapterId ? { ...c, [field]: value, lastUpdated: Date.now() } : c
    );
    onUpdateBook({ ...book, chapters: updatedChapters });
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdateBookMeta('coverImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAICover = async (e: React.MouseEvent) => {
    e.stopPropagation();
    // Immediate generation without prompt
    setIsCoverGenerating(true);
    try {
      // Pass empty style to let AI decide based on description
      const cover = await generateCoverImage(book);
      if (cover) {
        handleUpdateBookMeta('coverImage', cover);
      } else {
        alert(t.editor.alertError);
      }
    } catch (e) {
      console.error(e);
      alert(t.editor.alertError);
    } finally {
      setIsCoverGenerating(false);
    }
  }

  // Drag and Drop Handlers
  const handleDragStart = (index: number) => {
    setDraggedChapterIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedChapterIndex === null || draggedChapterIndex === index) return;
    
    // Reorder array
    const newChapters = [...book.chapters];
    const draggedItem = newChapters[draggedChapterIndex];
    newChapters.splice(draggedChapterIndex, 1);
    newChapters.splice(index, 0, draggedItem);
    
    onUpdateBook({ ...book, chapters: newChapters });
    setDraggedChapterIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedChapterIndex(null);
  };

  // Stats Calculation
  const getStats = () => {
    const text = activeChapter?.content.replace(/<[^>]*>/g, '') || '';
    const chars = text.length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const pages = Math.ceil(chars / 1800); // approx 1800 chars per page
    return { chars, words, pages };
  };

  const stats = getStats();

  // AI Actions
  const handleGenerateOutline = async () => {
    if (!book.title) {
        alert(t.editor.alertTitle);
        return;
    }
    setIsAIProcessing(true);
    try {
      const titles = await generateBookOutline(book.title, book.description, language);
      const newChapters = titles.map((title, index) => ({
        id: crypto.randomUUID(),
        type: 'chapter' as ChapterType,
        title: title,
        content: '',
        notes: '',
        lastUpdated: Date.now() + index,
      }));
      
      const hasContent = book.chapters.some(c => c.content.length > 10);
      let finalChapters = hasContent ? [...book.chapters, ...newChapters] : newChapters;
      
      onUpdateBook({ ...book, chapters: finalChapters });
      if (newChapters.length > 0 && !hasContent) setActiveChapterId(newChapters[0].id);
    } catch (e) {
      alert(t.editor.alertError);
    } finally {
      setIsAIProcessing(false);
    }
  };

  const handleContinueWriting = async () => {
    if (!activeChapter) return;
    setIsAIProcessing(true);
    try {
      const newText = await continueWriting(book, activeChapter, activeChapter.content, language);
      handleUpdateChapter('content', activeChapter.content + ' ' + newText);
    } catch (e) {
      alert(t.editor.alertError);
    } finally {
      setIsAIProcessing(false);
    }
  };

  const handleImproveStyle = async () => {
    if (!activeChapter || !activeChapter.content) return;
    if (!confirm(t.editor.confirmImprove)) return;
    setIsAIProcessing(true);
    try {
      // Improve style usually returns text, wrap in p if needed or trust editor
      const improved = await improveStyle(activeChapter.content.replace(/<[^>]*>/g, ''), language);
      handleUpdateChapter('content', `<p>${improved.replace(/\n\n/g, '</p><p>')}</p>`);
    } catch (e) {
      alert(t.editor.alertError);
    } finally {
      setIsAIProcessing(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      {/* Left Sidebar (Structure) */}
      <div className={`flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${isSidebarOpen ? 'w-80' : 'w-0'}`}>
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between min-w-[320px]">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400">
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <span className="font-semibold text-gray-700 dark:text-gray-200">{t.editor.structure}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 min-w-[320px] pb-24 custom-scrollbar">
          {/* Cover & Meta */}
          <div className="mb-6 p-2 relative group">
             <div 
               className="aspect-[2/3] bg-gray-100 dark:bg-gray-700 rounded-lg mb-3 relative overflow-hidden border-2 border-dashed border-gray-200 dark:border-gray-600 hover:border-indigo-400 transition-colors flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 shadow-sm"
             >
                {isCoverGenerating ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 z-20">
                        <SparklesIcon className="w-8 h-8 text-indigo-500 animate-spin mb-2" />
                        <span className="text-xs text-indigo-500 font-medium animate-pulse">Generating Art...</span>
                    </div>
                ) : book.coverImage ? (
                  <img src={book.coverImage} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                   <>
                    <ImageIcon className="w-8 h-8 mb-2" />
                    <span className="text-xs text-center px-2">{t.editor.uploadCover}</span>
                   </>
                )}
                
                {/* Cover Actions Overlay */}
                {!isCoverGenerating && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 z-10">
                    <button 
                        onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                        className="text-white text-xs font-medium bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full backdrop-blur-sm"
                    >
                        {t.editor.upload}
                    </button>
                    <button 
                        onClick={handleAICover}
                        className="text-white text-xs font-medium bg-indigo-500/80 hover:bg-indigo-500 px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1"
                    >
                        <SparklesIcon className="w-3 h-3" /> {t.editor.aiGen}
                    </button>
                    </div>
                )}

                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleCoverUpload} 
                  className="hidden" 
                  accept="image/*"
                />
             </div>
             <input 
               type="text" 
               value={book.title} 
               onChange={(e) => handleUpdateBookMeta('title', e.target.value)}
               className="w-full font-bold text-gray-800 dark:text-white border-none focus:ring-0 p-0 text-sm mb-1 bg-transparent placeholder-gray-400 text-center"
               placeholder={t.editor.bookTitlePlaceholder}
             />
             <input 
               type="text" 
               value={book.author} 
               onChange={(e) => handleUpdateBookMeta('author', e.target.value)}
               className="w-full text-gray-500 dark:text-gray-400 text-xs border-none focus:ring-0 p-0 bg-transparent placeholder-gray-500 text-center"
               placeholder={t.editor.authorPlaceholder}
             />
          </div>

          {/* Chapters List */}
          <div className="space-y-1">
            {book.chapters.map((chapter, index) => (
              <div 
                key={chapter.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                onClick={() => setActiveChapterId(chapter.id)}
                className={`group flex items-center gap-2 p-2 rounded-lg cursor-pointer text-sm transition-all border border-transparent
                  ${activeChapterId === chapter.id 
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-100 dark:border-indigo-800' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}
                  ${draggedChapterIndex === index ? 'opacity-50 dashed border-2 border-indigo-400' : ''}
                `}
              >
                <div className="cursor-grab text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400">
                  <GripVerticalIcon className="w-4 h-4" />
                </div>
                <div className="truncate flex-1">
                  <span className={`text-xs uppercase mr-2 font-bold px-1.5 py-0.5 rounded
                     ${chapter.type === 'prologue' || chapter.type === 'epilogue' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300' : 
                       chapter.type === 'annotation' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-300' : 
                       'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}
                  `}>
                    {chapter.type === 'chapter' ? index + 1 : chapter.type.charAt(0).toUpperCase()}
                  </span>
                  {chapter.title}
                </div>
                <button 
                  onClick={(e) => handleDeleteChapter(chapter.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-opacity"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Buttons */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button 
              onClick={() => handleAddChapter('chapter')}
              className="col-span-2 flex items-center justify-center gap-2 py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 hover:border-indigo-300 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all"
            >
              <PlusIcon className="w-4 h-4" /> {t.editor.addChapter}
            </button>
            <button onClick={() => handleAddChapter('prologue')} className="text-xs py-1.5 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">{t.editor.types.prologue}</button>
            <button onClick={() => handleAddChapter('epilogue')} className="text-xs py-1.5 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">{t.editor.types.epilogue}</button>
          </div>
          
          <div className="mt-8 border-t dark:border-gray-700 pt-4">
             <button 
                onClick={handleGenerateOutline}
                disabled={isAIProcessing}
                className="w-full text-left px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-md flex items-center gap-2 font-medium"
             >
                <SparklesIcon className="w-4 h-4" />
                {t.editor.genOutline}
             </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-3 flex justify-between items-center shadow-sm z-20">
           <div className="flex items-center gap-3 flex-1">
             <button 
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
               className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
             >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
             </button>
             {activeChapter && (
                <input 
                  type="text"
                  value={activeChapter.title}
                  onChange={(e) => handleUpdateChapter('title', e.target.value)}
                  className="text-lg font-bold text-gray-800 dark:text-white border-none focus:ring-0 bg-transparent placeholder-gray-400 w-full"
                  placeholder={t.editor.chapterTitlePlaceholder}
                />
             )}
           </div>
           
           <div className="flex items-center gap-2">
             <div className="relative">
                <button onClick={() => setShowSettings(!showSettings)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-gray-500">
                    <SettingsIcon className="w-5 h-5" />
                </button>
                {showSettings && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-3 z-50">
                        <div className="mb-3">
                            <label className="text-xs text-gray-500 uppercase font-bold block mb-1">Font</label>
                            <div className="flex bg-gray-100 dark:bg-gray-700 rounded p-1">
                                <button onClick={() => setFontFamily('serif')} className={`flex-1 text-xs py-1 rounded ${fontFamily === 'serif' ? 'bg-white shadow dark:bg-gray-600' : ''}`}>Serif</button>
                                <button onClick={() => setFontFamily('sans')} className={`flex-1 text-xs py-1 rounded ${fontFamily === 'sans' ? 'bg-white shadow dark:bg-gray-600' : ''}`}>Sans</button>
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 uppercase font-bold block mb-1">Size: {fontSize}px</label>
                            <input type="range" min="14" max="24" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} className="w-full" />
                        </div>
                    </div>
                )}
             </div>

             <button
                onClick={() => setIsNotesOpen(!isNotesOpen)}
                className={`p-2 rounded-md transition-colors ${isNotesOpen ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500'}`}
                title="Notes"
             >
                <StickyNoteIcon className="w-5 h-5" />
             </button>

             <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />

             <button
                onClick={() => setShowPreviewModal(true)}
                className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                title={t.editor.preview}
             >
                <EyeIcon className="w-5 h-5" />
             </button>
             <button
                onClick={() => setShowExportModal(true)}
                className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                title={t.editor.export}
             >
                <DownloadIcon className="w-5 h-5" />
             </button>
           </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 transition-colors duration-300 relative">
            {activeChapter ? (
                <div className="max-w-4xl mx-auto h-full p-4 md:p-8 flex flex-col">
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg flex-1 flex flex-col overflow-hidden relative transition-colors duration-300 border border-gray-200 dark:border-gray-700">
                        <RichTextEditor
                            content={activeChapter.content}
                            onChange={(html) => handleUpdateChapter('content', html)}
                            placeholder={t.editor.contentPlaceholder}
                            style={{ 
                                fontFamily: fontFamily === 'serif' ? 'Merriweather, serif' : 'Inter, sans-serif',
                                fontSize: `${fontSize}px`
                            }}
                        />

                        {/* Floating AI Tools */}
                        <div className="absolute bottom-6 right-6 flex flex-col gap-3">
                            <button 
                                onClick={handleContinueWriting}
                                disabled={isAIProcessing}
                                title={t.editor.toolContinue}
                                className="group relative bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all hover:scale-110 disabled:opacity-50 disabled:scale-100 z-10"
                            >
                                {isAIProcessing ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <SparklesIcon className="w-5 h-5" />}
                                <span className="absolute right-full mr-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {t.editor.toolContinue}
                                </span>
                            </button>
                            <button 
                                onClick={handleImproveStyle}
                                disabled={isAIProcessing || !activeChapter.content}
                                title={t.editor.toolImprove}
                                className="group relative bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-gray-600 p-3 rounded-full shadow-lg hover:bg-indigo-50 dark:hover:bg-gray-600 transition-all hover:scale-110 disabled:opacity-50 disabled:scale-100 z-10"
                            >
                                <WandIcon className="w-5 h-5" />
                                <span className="absolute right-full mr-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {t.editor.toolImprove}
                                </span>
                            </button>
                        </div>
                    </div>
                    
                    {/* Stats Footer */}
                    <div className="mt-2 flex justify-center gap-6 text-xs text-gray-500 dark:text-gray-400 font-medium">
                        <span>{stats.words} {t.editor.stats.words}</span>
                        <span>{stats.chars} {t.editor.stats.chars}</span>
                        <span>~{stats.pages} {t.editor.stats.pages}</span>
                    </div>
                </div>
            ) : (
                <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                    {t.editor.selectChapter}
                </div>
            )}
            </div>

            {/* Notes Sidebar */}
            {isNotesOpen && activeChapter && (
                <div className="w-72 bg-yellow-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4 flex flex-col shadow-xl animate-fade-in relative z-30">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <StickyNoteIcon className="w-4 h-4" /> {t.editor.notes}
                        </h3>
                        <button onClick={() => setIsNotesOpen(false)} className="text-gray-400 hover:text-gray-600">×</button>
                    </div>
                    <textarea 
                        className="flex-1 w-full bg-transparent border-none resize-none focus:ring-0 text-sm text-gray-700 dark:text-gray-300 leading-relaxed custom-scrollbar"
                        placeholder={t.editor.notesPlaceholder}
                        value={activeChapter.notes || ''}
                        onChange={(e) => handleUpdateChapter('notes', e.target.value)}
                    />
                    <div className="mt-2 text-xs text-gray-400 text-center">{t.editor.notesAutoSaved}</div>
                </div>
            )}
        </div>
      </div>
      
      {showExportModal && (
        <ExportModal book={book} onClose={() => setShowExportModal(false)} />
      )}

      {showPreviewModal && (
        <BookPreviewModal book={book} onClose={() => setShowPreviewModal(false)} />
      )}
    </div>
  );
};
