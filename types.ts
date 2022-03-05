export type UUID = string;

export type Language = 'html' | 'css' | 'javascript';

export type Theme = 'vs-dark' | 'light';

export type File = {
  name: string;
  language: Language;
  value: string;
};
