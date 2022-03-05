import React from 'react';
import { useAtom } from 'jotai';
import { files } from '../../state/local/files';
import CodeEditor from './editor';
export default function EditorSidebar() {
  const [currentFiles, updateFiles] = useAtom(files);
  return <div>{currentFiles}</div>;
}
