
import React, { useRef, useEffect, useState } from 'react';
import { BoldIcon, ItalicIcon, ListIcon, H1Icon, H2Icon } from './IconComponents';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  content, 
  onChange, 
  placeholder,
  className,
  style
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [lastHtml, setLastHtml] = useState(content);

  // Sync content updates from parent only if they differ significantly and editor is not focused
  // or if it's the initial load.
  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML && content !== lastHtml) {
       // Only update if the content actually changed from outside (e.g. loading a new chapter)
       // This is a naive check to prevent cursor jumping
       editorRef.current.innerHTML = content;
       setLastHtml(content);
    }
  }, [content]);

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setLastHtml(html);
      onChange(html);
    }
  };

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
    handleInput();
  };

  return (
    <div className={`flex flex-col h-full ${className}`} style={style}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 rounded-t-lg transition-colors">
        <ToolbarButton onClick={() => execCommand('bold')} icon={<BoldIcon className="w-4 h-4" />} title="Bold" />
        <ToolbarButton onClick={() => execCommand('italic')} icon={<ItalicIcon className="w-4 h-4" />} title="Italic" />
        <ToolbarButton onClick={() => execCommand('underline')} icon={<span className="font-bold underline text-sm">U</span>} title="Underline" />
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />
        <ToolbarButton onClick={() => execCommand('formatBlock', 'H2')} icon={<H1Icon className="w-4 h-4" />} title="Heading 1" />
        <ToolbarButton onClick={() => execCommand('formatBlock', 'H3')} icon={<H2Icon className="w-4 h-4" />} title="Heading 2" />
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />
        <ToolbarButton onClick={() => execCommand('insertUnorderedList')} icon={<ListIcon className="w-4 h-4" />} title="Bullet List" />
      </div>

      {/* Editable Area */}
      <div 
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="flex-1 outline-none p-8 overflow-y-auto prose prose-lg prose-indigo dark:prose-invert max-w-none custom-scrollbar"
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
        style={{ minHeight: '100%' }}
      />
      
      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

const ToolbarButton: React.FC<{ onClick: () => void; icon: React.ReactNode; title: string }> = ({ onClick, icon, title }) => (
  <button 
    onClick={(e) => { e.preventDefault(); onClick(); }}
    className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
    title={title}
  >
    {icon}
  </button>
);
