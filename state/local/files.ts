import { File } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { bind, shareLatest } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { scan, map, debounceTime } from 'rxjs';

export const DEFAULT_HTML_FILE_NAME = 'index.html';
export const DEFAULT_CSS_FILE_NAME = 'index.css';

export const defaultFiles: File[] = [
  {
    name: DEFAULT_HTML_FILE_NAME,
    language: 'html',
    value: '<h1>Your Name</h1>',
    id: uuidv4(),
  },
  {
    name: DEFAULT_CSS_FILE_NAME,
    language: 'css',
    value: 'h1 { color: red; }',
    id: uuidv4(),
  },
];

export const [fileList$, updateFileData] = createSignal<File[]>();

export const [useFiles] = bind<File[] | null>(
  fileList$.pipe(
    debounceTime(50),
    scan((accumulator: File[], current: File[]) => {
      return [...current];
    }, []),
    shareLatest(),
  ),
  null,
);
