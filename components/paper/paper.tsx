import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'

import { Message } from '../../types'
function Paper() {
  const viewerRef = useRef<HTMLDivElement>(null)
  const [css, updateCss] = useState<string>('')
  function handleMessage(message: MessageEvent<Message>) {
    const { payload } = message.data
    if (viewerRef.current && payload?.length) {
      const html = payload?.filter((file) => file.language === 'html')
      const css = payload?.filter((file) => file.language === 'css')
      if (html?.length) {
        let htmlString: string = ''
        html.forEach((htmlFile) => {
          htmlString = htmlString + htmlFile.value
        })
        viewerRef.current.innerHTML = htmlString
      }
      if (css.length) {
        let cssString: string = ''
        css.forEach((cssFile) => {
          cssString = cssString + cssFile.value
        })
        updateCss(cssString)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  })

  console.log(css)
  return (
    <div>
      <style>{css}</style>
      <div className="page" ref={viewerRef} />
    </div>
  )
}

export default Paper
