import React, { useRef, useCallback, useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

const ToolbarButton: React.FC<{
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ onClick, title, children }) => (
  <button
    type="button"
    onMouseDown={e => { e.preventDefault(); onClick(); }}
    title={title}
    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors font-bold text-sm"
  >
    {children}
  </button>
);

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'İçerik yazın...',
  minHeight = '200px',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);

  // Sync external value into editor only when it truly changes from outside
  useEffect(() => {
    if (isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const exec = useCallback((command: string, val?: string) => {
    document.execCommand(command, false, val);
    editorRef.current?.focus();
    handleInput();
  }, [handleInput]);

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-white/10 bg-white/[0.02] flex-wrap">
        <ToolbarButton onClick={() => exec('bold')} title="Kalın (Ctrl+B)">
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('italic')} title="İtalik (Ctrl+I)">
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('underline')} title="Altı Çizili (Ctrl+U)">
          <span className="underline">U</span>
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('strikeThrough')} title="Üstü Çizili">
          <span className="line-through">S</span>
        </ToolbarButton>

        <div className="w-px h-5 bg-white/10 mx-1" />

        <ToolbarButton onClick={() => exec('formatBlock', 'h2')} title="Başlık 2">
          H2
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('formatBlock', 'h3')} title="Başlık 3">
          H3
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('formatBlock', 'p')} title="Paragraf">
          P
        </ToolbarButton>

        <div className="w-px h-5 bg-white/10 mx-1" />

        <ToolbarButton onClick={() => exec('insertUnorderedList')} title="Sırasız Liste">
          •
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('insertOrderedList')} title="Sıralı Liste">
          1.
        </ToolbarButton>

        <div className="w-px h-5 bg-white/10 mx-1" />

        <ToolbarButton onClick={() => exec('removeFormat')} title="Biçimlendirmeyi Kaldır">
          ✕
        </ToolbarButton>
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        data-placeholder={placeholder}
        className="px-4 py-3 text-white outline-none prose prose-invert prose-sm max-w-none
          [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-gray-600
          [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-purple-400 [&_h2]:mt-4 [&_h2]:mb-2
          [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-3 [&_h3]:mb-1
          [&_p]:mb-2 [&_p]:leading-relaxed
          [&_ul]:list-disc [&_ul]:ml-4 [&_ul]:mb-2
          [&_ol]:list-decimal [&_ol]:ml-4 [&_ol]:mb-2
          [&_li]:mb-1
          [&_strong]:font-bold [&_strong]:text-white
          [&_em]:italic
          [&_u]:underline
          [&_s]:line-through"
        style={{ minHeight }}
      />
    </div>
  );
};

export default RichTextEditor;
