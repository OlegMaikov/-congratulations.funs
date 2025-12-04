
import React from 'react';
import { Book } from '../types';
import { DownloadIcon } from './IconComponents';
import { useAppContext } from '../contexts/AppContext';
import { exportService } from '../services/exportService';

interface ExportModalProps {
  book: Book;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ book, onClose }) => {
  const { t } = useAppContext();

  const formats = [
    { id: 'fb2', label: 'FB2', desc: 'FictionBook 2.0', action: () => exportService.toFB2(book), type: 'ebook' },
    { id: 'pdf', label: 'PDF', desc: 'Document', action: () => exportService.printPDF(book), type: 'doc' },
    { id: 'doc', label: 'DOC', desc: 'Microsoft Word', action: () => exportService.toDOC(book), type: 'doc' },
    { id: 'rtf', label: 'RTF', desc: 'Rich Text', action: () => exportService.toRTF(book), type: 'doc' },
    { id: 'txt', label: 'TXT', desc: 'Plain Text', action: () => exportService.toTXT(book), type: 'doc' },
    { id: 'html', label: 'HTML', desc: 'Web Page', action: () => exportService.toHTML(book), type: 'web' },
    { id: 'md', label: 'MD', desc: 'Markdown', action: () => exportService.toMarkdown(book), type: 'web' },
    { id: 'json', label: 'JSON', desc: 'Backup', action: () => exportService.toJSON(book), type: 'dev' },
  ];

  const categories = {
    ebook: t.export.catEbook,
    doc: t.export.catDoc,
    web: t.export.catWeb,
    dev: t.export.catDev
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full p-8 transition-colors duration-300">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <DownloadIcon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              {t.export.title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{t.export.desc}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
          {Object.entries(categories).map(([type, title]) => (
             <div key={type}>
               <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">{title}</h3>
               <div className="space-y-3">
                 {formats.filter(f => f.type === type).map(f => (
                   <button 
                     key={f.id}
                     onClick={() => { f.action(); onClose(); }}
                     className="w-full flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-200 dark:hover:border-indigo-500 transition-all group bg-gray-50 dark:bg-gray-800/50"
                   >
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm text-sm font-bold text-indigo-600 dark:text-indigo-400">
                           {f.label}
                        </div>
                        <div className="text-left">
                           <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm group-hover:text-indigo-700 dark:group-hover:text-indigo-300">{f.label}</div>
                           <div className="text-xs text-gray-500 dark:text-gray-400">{f.desc}</div>
                        </div>
                     </div>
                     <DownloadIcon className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                   </button>
                 ))}
               </div>
             </div>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-700 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
             {t.export.note}
          </p>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 font-medium text-sm"
          >
            {t.export.cancel}
          </button>
        </div>
      </div>
    </div>
  );
};
