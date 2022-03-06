import React, { useRef, useEffect } from 'react'
import * as files from '../../state/local/files'

export default function Viewer(): JSX.Element {
  const values = files.useFiles()
  const viewerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.innerHTML =
        values && values[0].value ? values[0].value : ''
    }
  }, [viewerRef, values])
  return (
    <div>
      <div ref={viewerRef}></div>
    </div>
  )
}
