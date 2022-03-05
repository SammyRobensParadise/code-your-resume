import React from 'react';
import { useAtom } from 'jotai';
import { files } from '../../state/local/files';
import CodeEditor from './editor';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
export default function EditorContainer() {
  const [currentFiles, updateFiles] = useAtom(files);
  const mapFiles = Object.entries(currentFiles);
  return (
    <div>
      {mapFiles.map((file) => {
        const info = file[1];
        const name = file[0];
        return (
          <div key={name}>
            <CodeEditor
              id={name}
              path={info.name}
              language={info.language}
              defaultHeight={50}
              theme='vs-dark'
              defaultValue={info.value}
            />
          </div>
        );
      })}
    </div>
  );
}
