import type { NextPage } from 'next'
import { useEffect, useRef } from 'react'

import * as files from '../../state/local/files'
import { Message } from '../../types'
function Paper() {
  const values = files.useFiles()
  const viewerRef = useRef<HTMLDivElement>(null)
  console.log(values)
  function handleMessage(message: MessageEvent<Message>) {
    console.log('in viewer', message)
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  })
  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.innerHTML =
        values && values[0].value ? values[0].value : ''
    }
  }, [viewerRef, values])
  return <div className="page" ref={viewerRef}></div>
}

export default Paper
