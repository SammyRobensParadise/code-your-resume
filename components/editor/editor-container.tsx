import React, { useEffect } from 'react'
import CodeEditor from './editor'
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import * as files from '../../state/local/files'
import { File } from '../../types'

export default function EditorContainer() {
  useEffect(() => {}, [])

  return (
    <div className="editors h-full">
      {/*?.map((file: File) => {
        const info = file
        return (
          <div key={info.name}>
            {file.isOpen && (
              <CodeEditor
                id={info.id}
                path={info.name}
                name={info.name}
                language={info.language}
                openEditors={}
                theme="vs-dark"
                defaultValue={info.value}
                handleOnChange={(value, event) => {
                  handleOnChange(info.id, value, event)
                }}
              />
              ) }
          </div>
        )
      })*/}
    </div>
  )
}
