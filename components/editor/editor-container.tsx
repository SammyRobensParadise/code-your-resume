import React, { useEffect } from 'react';
import CodeEditor from './editor';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import * as files from '../../state/local/files';
export default function EditorContainer() {
  const mapFiles = files.useFiles();
  useEffect(() => {
    if (files) {
      files.updateFileData(files.defaultFiles);
    }
  }, []);
  return (
    <div>
      {mapFiles?.map((file) => {
        const info = file;
        return (
          <div key={info.name}>
            <CodeEditor
              id={info.name}
              path={info.name}
              language={info.language}
              defaultHeight={50}
              theme='vs-dark'
              defaultValue={info.value}
              handleOnChange={(value, event) => {
                console.log(value);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
