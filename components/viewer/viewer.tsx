import React from 'react'
import * as files from '../../state/local/files'

export default function Viewer(): JSX.Element {
  const values = files.useFiles()
  return (
    <div>
      {values?.map((value) => {
        return <p>{value.value}</p>
      })}
    </div>
  )
}
