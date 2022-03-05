import { atom } from 'jotai';
import { File } from '../../types';

export const DEFAULT_HTML_FILE_NAME = 'index.html';
export const DEFAULT_CSS_FILE_NAME = 'index.css';

export const files = atom<Record<string, File>>({
  DEFAULT_HTML_FILE_NAME: {
    name: DEFAULT_HTML_FILE_NAME,
    language: 'html',
    value: '<h1>Your Name</h1>',
  },
  DEFAULT_CSS_FILE_NAME: {
    name: DEFAULT_CSS_FILE_NAME,
    language: 'css',
    value: 'h1 { color: red; }',
  },
});
