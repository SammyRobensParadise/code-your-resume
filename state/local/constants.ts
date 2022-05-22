import { Theme } from '../../types'

export interface Metadata {
  editorTheme: Theme
  theme: 'light' | 'dark'
}

export const defaultMetadata: Metadata = {
  editorTheme: 'vs-dark',
  theme: 'light'
}
