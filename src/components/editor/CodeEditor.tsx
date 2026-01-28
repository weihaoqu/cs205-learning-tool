'use client';

import { useRef, useCallback } from 'react';
import Editor, { OnMount, OnChange } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  height?: string | number;
  readOnly?: boolean;
  highlightedLine?: number | null;
  theme?: 'vs-dark' | 'light';
  onMount?: (editor: editor.IStandaloneCodeEditor) => void;
}

export function CodeEditor({
  value,
  onChange,
  language = 'java',
  height = '400px',
  readOnly = false,
  highlightedLine = null,
  theme = 'vs-dark',
  onMount,
}: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const decorationsRef = useRef<string[]>([]);

  const handleEditorDidMount: OnMount = useCallback((editor, monaco) => {
    editorRef.current = editor;

    // Configure Java language features
    monaco.languages.setLanguageConfiguration('java', {
      comments: {
        lineComment: '//',
        blockComment: ['/*', '*/'],
      },
      brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
      ],
      autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
    });

    // Set editor options
    editor.updateOptions({
      fontSize: 14,
      lineNumbers: 'on',
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 4,
      insertSpaces: true,
      wordWrap: 'on',
      folding: true,
      glyphMargin: true,
    });

    onMount?.(editor);
  }, [onMount]);

  const handleEditorChange: OnChange = useCallback((value) => {
    onChange?.(value ?? '');
  }, [onChange]);

  // Update line highlighting when highlightedLine changes
  const updateHighlight = useCallback(() => {
    if (!editorRef.current) return;

    const editor = editorRef.current;
    const monaco = (window as { monaco?: typeof import('monaco-editor') }).monaco;

    if (!monaco) return;

    // Clear previous decorations
    decorationsRef.current = editor.deltaDecorations(decorationsRef.current, []);

    if (highlightedLine !== null && highlightedLine > 0) {
      // Add new decoration
      decorationsRef.current = editor.deltaDecorations([], [
        {
          range: new monaco.Range(highlightedLine, 1, highlightedLine, 1),
          options: {
            isWholeLine: true,
            className: 'highlighted-line',
            glyphMarginClassName: 'highlighted-line-glyph',
          },
        },
      ]);

      // Scroll to the highlighted line
      editor.revealLineInCenter(highlightedLine);
    }
  }, [highlightedLine]);

  // Effect to update highlighting
  if (editorRef.current && highlightedLine !== null) {
    updateHighlight();
  }

  return (
    <div className="rounded-lg overflow-hidden border">
      <style jsx global>{`
        .highlighted-line {
          background-color: rgba(255, 255, 0, 0.2) !important;
          border-left: 3px solid #fbbf24 !important;
        }
        .highlighted-line-glyph {
          background-color: #fbbf24;
          width: 4px !important;
          margin-left: 3px;
        }
      `}</style>
      <Editor
        height={height}
        language={language}
        value={value}
        theme={theme}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          readOnly,
        }}
        loading={
          <div className="flex items-center justify-center h-full bg-zinc-900 text-zinc-400">
            Loading editor...
          </div>
        }
      />
    </div>
  );
}
