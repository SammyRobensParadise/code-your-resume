export type UUID = string

export type Language = 'html' | 'css' | 'javascript'

export type Theme = 'vs-dark' | 'light'

export type Extension = 'html' | 'css' | 'js' | 'jsx'

export type File = {
  name: string
  language: Language
  value: string | undefined
  id: UUID
  path: string
  extension: Extension
  isOpen?: true | false
  type: 'source'
}

export type Message = {
  source: string
  destination: 'viewer' | 'editor'
  payload: File[]
}
