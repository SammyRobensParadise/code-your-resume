import { Extension, File, Language, Message, UUID } from '../../types'
import { v4 as uuidv4 } from 'uuid'
import { bind, shareLatest } from '@react-rxjs/core'
import { createSignal } from '@react-rxjs/utils'
import { scan } from 'rxjs'
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

export const [fileList$, updateFileData] = createSignal<UpdateFileDataEvent>()

export const [useFiles] = bind<File[] | null>(
  fileList$.pipe(
    scan((accumulator: File[], current: UpdateFileDataEvent) => {
      switch (current.operation) {
        case 'CREATE': {
          const {
            id,
            name,
            path,
            extension,
            language,
            value,
            source,
            destination,
            isOpen
          } = current.payload
          const fallbackExtension = extension ? extension : 'html'
          const fallbackName = `default${Math.random() * 20}`
          const newId: string = uuidv4()
          const newFile: File = {
            name: name ? name : `${fallbackName}.${fallbackExtension}`,
            path: path ? path : `${fallbackName}.${fallbackExtension}`,
            id: id ? id : newId,
            language: language ? language : 'html',
            value: value,
            extension: fallbackExtension,
            isOpen: isOpen ? isOpen : true
          }
          const payload = [...accumulator, newFile]
          const message: Message = {
            // unnamed messages are assumed to be from the editor
            source: source ? source : 'editor',
            // unnamed destinations are assumed to be for the viewer
            destination: destination ? destination : 'viewer',
            payload
          }
          window.parent.postMessage(message, '/')
          // handle local storage
          const doesExistInLocalSorage = !!(id
            ? window.localStorage.getItem(id)
            : null)

          if (!doesExistInLocalSorage) {
            localStorage.setItem(id ? id : newId, JSON.stringify(newFile))
          }
          console.log('create', payload)
          return payload
        }
        case 'VALUE': {
          const { id, value, source, destination } = current.payload
          let currentFile: File | null = null
          console.log(accumulator)
          accumulator.forEach((file) => {
            if (file.id === id) {
              file.value = value
              currentFile = file
            }
          })
          const payload = [...accumulator]
          const message: Message = {
            // unnamed messages are assumed to be from the editor
            source: source ? source : 'editor',
            // unnamed destinations are assumed to be for the viewer
            destination: destination ? destination : 'viewer',
            payload
          }
          window.parent.postMessage(message, '/')

          if (id && currentFile) {
            window.localStorage.setItem(id, JSON.stringify(currentFile))
          }
          console.log('value', payload)

          return payload
        }

        case 'NAME': {
          const { id, name, path, source, destination } = current.payload
          let currentFile: File | null = null

          accumulator.forEach((file) => {
            if (file.id === id && name && path) {
              file.name = name
              file.path = path
              currentFile = file
            }
          })

          const payload = [...accumulator]
          const message: Message = {
            // unnamed messages are assumed to be from the editor
            source: source ? source : 'editor',
            // unnamed destinations are assumed to be for the viewer
            destination: destination ? destination : 'viewer',
            payload
          }
          window.parent.postMessage(message, '/')

          if (id && currentFile) {
            window.localStorage.setItem(id, JSON.stringify(currentFile))
          }
          console.log('name', payload)

          return payload
        }
        case 'LANGUAGE': {
          const { id, language, source, destination } = current.payload
          let currentFile: File | null = null

          accumulator.forEach((file) => {
            if (file.id === id && language) {
              file.language = language
              currentFile = file
            }
          })
          const payload = [...accumulator]
          const message: Message = {
            // unnamed messages are assumed to be from the editor
            source: source ? source : 'editor',
            // unnamed destinations are assumed to be for the viewer
            destination: destination ? destination : 'viewer',
            payload
          }
          window.parent.postMessage(message, '/')

          if (id && currentFile) {
            window.localStorage.setItem(id, JSON.stringify(currentFile))
          }
          console.log('language', payload)

          return payload
        }
        case 'CLOSE': {
          const { id, source, destination } = current.payload
          let currentFile: File | null = null

          accumulator.forEach((file) => {
            if (file.id === id) {
              file.isOpen = false
              currentFile = file
            }
          })
          const payload = [...accumulator]
          const message: Message = {
            // unnamed messages are assumed to be from the editor
            source: source ? source : 'editor',
            // unnamed destinations are assumed to be for the viewer
            destination: destination ? destination : 'viewer',
            payload
          }
          window.parent.postMessage(message, '/')

          if (id && currentFile) {
            window.localStorage.setItem(id, JSON.stringify(currentFile))
          }
          return payload
        }
        case 'OPEN': {
          const { id, source, destination } = current.payload
          let currentFile: File | null = null

          accumulator.forEach((file) => {
            if (file.id === id) {
              file.isOpen = true
              currentFile = file
            }
          })
          const payload = [...accumulator]
          const message: Message = {
            // unnamed messages are assumed to be from the editor
            source: source ? source : 'editor',
            // unnamed destinations are assumed to be for the viewer
            destination: destination ? destination : 'viewer',
            payload
          }

          window.parent.postMessage(message, '/')

          if (id && currentFile) {
            window.localStorage.setItem(id, JSON.stringify(currentFile))
          }
          return payload
        }
        default: {
          const { source, destination } = current.payload
          const payload = [...accumulator]
          const message: Message = {
            // unnamed messages are assumed to be from the editor
            source: source ? source : 'editor',
            // unnamed destinations are assumed to be for the viewer
            destination: destination ? destination : 'viewer',
            payload
          }
          window.parent.postMessage(message, '/')
          return payload
        }
      }
    }, []),
    shareLatest()
  ),
  null
)
