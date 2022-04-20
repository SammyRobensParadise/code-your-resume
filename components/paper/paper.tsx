import {
  Box,
  Tooltip,
  Button,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { Message } from '../../types'

interface ToolbarInterface {
  defaultZoom: string
  updateZoom: (zoom: string) => void
}

function Toolbar({
  defaultZoom = '70',
  updateZoom
}: ToolbarInterface): JSX.Element {
  const format = (val: string) => val + `%`
  const parse = (val: string) => val.replace(/^\$/, '')

  const [zoomValue, setZoomValue] = useState(`${defaultZoom}`)

  useEffect(() => {
    updateZoom(zoomValue)
  }, [zoomValue])

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
      </Flex>
    </Box>
  )
}

function Paper(): JSX.Element {
  const viewerRef = useRef<HTMLDivElement>(null)
  const [css, updateCss] = useState<string>('')
  const [zoom, updateZoom] = useState<string>('70')
  function handleMessage(message: MessageEvent<Message>) {
    const { payload } = message.data
    if (viewerRef.current && payload?.length) {
      const html = payload?.filter((file) => file.language === 'html')
      const css = payload?.filter((file) => file.language === 'css')
      if (html?.length) {
        let htmlString = ''
        html.forEach((htmlFile) => {
          htmlString = htmlString + htmlFile.value
        })
        viewerRef.current.innerHTML = htmlString
      }
      if (css.length) {
        let cssString = ''
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

  return (
    <Box>
      <Toolbar defaultZoom={zoom} updateZoom={updateZoom} />
      <style>{css}</style>
      <Box paddingTop={4}>
        <div
          className="page"
          ref={viewerRef}
          style={{ transform: `scale(${parseInt(zoom) / 100})` }}
        />
      </Box>
    </Box>
  )
}

export default Paper
