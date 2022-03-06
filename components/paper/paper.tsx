import type { NextPage } from 'next'
import { useEffect, useRef } from 'react'

import * as files from '../../state/local/files'
import { Message } from '../../types'
function Paper() {
  const values = files.useFiles()
  const viewerRef = useRef<HTMLDivElement>(null)
  console.log(values)

  function handleMessage(message: MessageEvent<Message>) {
    if (viewerRef.current) {
      const { payload } = message.data
      const html = payload?.filter((file) => file.language === 'html')
      let htmlString: string = ''
      html.forEach((htmlFile) => {
        htmlString = htmlString + htmlFile.value
      })
      viewerRef.current.innerHTML = htmlString
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  })

  return <div className="page" ref={viewerRef}></div>
}

export default Paper
