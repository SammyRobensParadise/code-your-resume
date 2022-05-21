import { DownloadIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Button
} from '@chakra-ui/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { store } from '../../state/local/store'
import { File } from '../../types'

interface ToolbarInterface {
  defaultZoom: string
  updateZoom: (zoom: string) => void
  handleDownload: () => void
}

function Toolbar({
  defaultZoom = '70',
  updateZoom,
  handleDownload
}: ToolbarInterface): JSX.Element {
  const format = (val: string) => val + `%`
  const parse = (val: string) => val.replace(/^\$/, '')

  const [zoomValue, setZoomValue] = useState(`${defaultZoom}`)

  useEffect(() => {
    updateZoom(zoomValue)
  }, [updateZoom, zoomValue])

  return (
    <Box
      padding={1}
      borderRadius={4}
      borderWidth="1px"
      borderColor="gray.700"
      margin={1}
      position="fixed"
      zIndex={999}
      backgroundColor="white"
    >
      <Flex>
        <Text fontSize="sm" px={2}>
          Zoom:
        </Text>
        <NumberInput
          step={10}
          defaultValue={defaultZoom}
          min={10}
          max={200}
          size="xs"
          maxWidth={36}
          onChange={(valueString) => setZoomValue(parse(valueString))}
          value={format(zoomValue)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Box paddingX={2}>
          <Button size="xs" onClick={handleDownload}>
            <Text fontSize="sm" px={2}>
              Download PDF
            </Text>
            <DownloadIcon />
          </Button>
        </Box>
      </Flex>
    </Box>
  )
}

function Paper(): JSX.Element {
  const viewerRef = useRef<HTMLDivElement>(null)
  const [css, updateCss] = useState<string>('')
  const [zoom, updateZoom] = useState<string>('70')
  const [localStore, setLocalStore] = useState<File[]>([])

  function update() {
    const latestStorage = store.getAll()
    if (latestStorage) {
      setLocalStore(() => [...latestStorage])
    }
  }

  const write = useCallback(() => {
    let concatHtml = ''
    let concatCss = ''
    localStore.forEach((file) => {
      if (file.extension === 'html') {
        concatHtml += `${file.value}`
      }
      if (file.extension === 'css') {
        concatCss += `${file.value}`
      }
    })
    if (viewerRef.current) {
      viewerRef.current.innerHTML = concatHtml
    }
    updateCss(concatCss)
  }, [localStore])

  useEffect(() => {
    if (localStore.length) {
      if (viewerRef.current) {
        write()
      }
    }
  }, [localStore, write])

  useEffect(() => {
    update()
  }, [])

  useEffect(() => {
    window.parent.addEventListener('storage', update)
    return () => {
      window.parent.removeEventListener('storage', update)
    }
  })

  function handleDownload() {
    if (viewerRef.current) {
      html2canvas(viewerRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF()
        pdf.addImage(imgData, 'PNG', 0, 0, 0, 0)
        pdf.save('download.pdf')
      })
    }
  }

  return (
    <Box>
      <Toolbar
        defaultZoom={zoom}
        updateZoom={updateZoom}
        handleDownload={handleDownload}
      />
      <div>
        <Box paddingTop={4}>
          <style>{css}</style>
          <div
            className="page"
            ref={viewerRef}
            style={{ transform: `scale(${parseInt(zoom) / 100})` }}
          ></div>
        </Box>
      </div>
    </Box>
  )
}

export default Paper
