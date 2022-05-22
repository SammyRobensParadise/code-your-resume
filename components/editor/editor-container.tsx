import React, { useEffect, useState } from 'react'
import CodeEditor from './editor'
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import * as files from '../../state/local/files'
import { File, Theme } from '../../types'
import { store } from '../../state/local/store'
import { Flex } from '@chakra-ui/react'
import Sidebar from '../sidebar/sidebar'

export default function EditorContainer() {
  const [localStore, setLocalStore] = useState<File[]>([])
  const [theme, setTheme] = useState<Theme>('light')

  function initializeDefaultFiles() {
    files.defaultFiles.forEach((file) => {
      store.set({
        operation: 'CREATE',
        payload: file
      })
    })
  }
  function handleOnChange(value: string | undefined, id: string) {
    store.set({
      operation: 'VALUE',
      payload: { value, id }
    })
  }

  function update() {
    const latestStorage = store.getAll()
    if (latestStorage) {
      setLocalStore(() => [...latestStorage])
    }
    const newTheme = store.metadata.get()?.editorTheme ?? 'light'
    setTheme(newTheme)
  }

  useEffect(() => {
    const initalStorage = store.getAll()
    if (!initalStorage) {
      initializeDefaultFiles()
    }
    update()
  }, [])

  useEffect(() => {
    window.parent.addEventListener('storage', update)
    return () => window.parent.removeEventListener('storage', update)
  })

  return (
    <Flex>
      <Sidebar />
      <div className="editors h-full flex-grow">
        {localStore.map((file: File) => {
          return (
            <div key={file.name}>
              {file.isOpen && (
                <CodeEditor
                  id={file.id}
                  path={file.name}
                  name={file.name}
                  language={file.language}
                  theme={theme}
                  defaultValue={file.value}
                  handleOnChange={(value) => handleOnChange(value, file.id)}
                />
              )}
            </div>
          )
        })}
      </div>
    </Flex>
  )
}
