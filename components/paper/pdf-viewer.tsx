import { useState } from 'react'
// import default react-pdf entry
import { Document, Page, pdfjs } from 'react-pdf'
// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
import workerSrc from '../../pdf-worker'

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

export default function PDFViewer() {
  const [file, setFile] = useState('')
  const [numPages, setNumPages] = useState<number>(1)

  function onFileChange(event: unknown) {
    // @ts-expect-error target
    setFile(event.target.files[0])
  }

  function onDocumentLoadSuccess({
    numPages: nextNumPages
  }: {
    numPages: number
  }) {
    setNumPages(nextNumPages)
  }

  return (
    <div>
      <div>
        <label htmlFor="file">Load from file:</label>{' '}
        <input onChange={onFileChange} type="file" />
      </div>
      <div>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from({ length: numPages }, (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          ))}
        </Document>
      </div>
    </div>
  )
}
