import type { NextPage } from 'next'
import { useEffect, useRef } from 'react'

import * as files from '../../state/local/files'
function Paper() {
  const values = files.useFiles()
  const viewerRef = useRef<HTMLDivElement>(null)
  console.log(values)
  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.innerHTML =
        values && values[0].value ? values[0].value : ''
    }
  }, [viewerRef, values])
  return <div className="page" ref={viewerRef}></div>
}

export default Paper
