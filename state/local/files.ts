import { Extension, File, Language, UUID } from '../../types'

import React from 'react'

export const DEFAULT_HTML_FILE_NAME = 'index.html'
export const DEFAULT_CSS_FILE_NAME = 'index.css'

export const defaultFiles: File[] = [
  {
    name: DEFAULT_HTML_FILE_NAME,
    path: DEFAULT_HTML_FILE_NAME,
    language: 'html',
    value: `<h1>Your Name<h1/>`,
    id: 'default-1',
    extension: 'html',
    isOpen: true
  },
  {
    name: DEFAULT_CSS_FILE_NAME,
    path: DEFAULT_CSS_FILE_NAME,
    language: 'css',
    value: 'h1 { color: black; }',
    id: 'default-2',
    extension: 'css',
    isOpen: true
  }
]

export type Operation =
  | 'VALUE'
  | 'NAME'
  | 'LANGUAGE'
  | 'CREATE'
  | 'DELETE'
  | 'CLOSE'
  | 'OPEN'

export interface UpdateFileDataEvent {
  operation: Operation
  payload: {
    id?: UUID
    value?: string
    event?: React.ChangeEvent
    language?: Language
    name?: string
    path?: string
    extension?: Extension
    source?: string
    destination?: 'viewer' | 'editor'
    isOpen?: boolean
  }
}
