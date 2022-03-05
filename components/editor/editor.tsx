import React, { ChangeEvent } from 'react';
import Editor from '@monaco-editor/react';
import { Language, Theme, UUID } from '../../types';

export interface CodeEditorInterface {
  id: UUID;
  language?: Language;
  handleOnChange?: (value: string | undefined, event: ChangeEvent) => void;
  defaultHeight?: number;
  defaultWith?: number;
  defaultValue?: string;
  path: string;
  theme?: Theme;
}

export default function CodeEditor({
  id,
  handleOnChange,
  defaultHeight = 100,
  theme = 'light',
  defaultValue = '',
  path,
}: CodeEditorInterface): JSX.Element {
  return (
    <div id={id}>
      <Editor
        path={path}
        onChange={handleOnChange}
        height={`${defaultHeight}vh`}
        theme={theme}
        defaultValue={defaultValue}
      />
    </div>
  );
}
