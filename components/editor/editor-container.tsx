import React, { useEffect } from 'react'
import CodeEditor from './editor'
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import * as files from '../../state/local/files'
import { File } from '../../types'

export default function EditorContainer() {
  const mapFiles = files.useFiles()

  useEffect(() => {
    if (files) {
      const { defaultFiles } = files
      defaultFiles.forEach((file) => {
        files.updateFileData({
          operation: 'CREATE',
          payload: {
            id: file.id,
            name: file.name,
            path: file.name,
            language: file.language,
            value: file.value,
            extension: file.extension
          }
        })
      })
    }
  }, [])

  function handleOnInputChange(
    id: string,
    value: string | undefined,
    event: React.ChangeEvent
  ) {
    const payload = {
      id,
      value: value ? value : '',
      event
    }
    files.updateFileData({
      operation: 'VALUE',
      payload
    })
  }

  return (
    <div className="editors h-full">
      {mapFiles?.map((file: File) => {
        const info = file
        return (
          <div key={info.name}>
            <CodeEditor
              id={info.id}
              path={info.name}
              name={info.name}
              language={info.language}
              openEditors={mapFiles.length}
              theme="vs-dark"
              defaultValue={info.value}
              handleOnChange={(value, event) => {
                handleOnInputChange(info.id, value, event)
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
