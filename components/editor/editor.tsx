import React, { ChangeEvent } from 'react'
import Editor from '@monaco-editor/react'
import { Language, Theme, UUID } from '../../types'
import { Container, Box, Text } from '@chakra-ui/react'

export interface CodeEditorInterface {
  id: UUID
  language?: Language
  handleOnChange?: (value: string | undefined, event: ChangeEvent) => void
  defaultHeight?: number
  defaultWith?: number
  defaultValue?: string
  path: string
  theme?: Theme
  name?: string
}

export default function CodeEditor({
  id,
  handleOnChange,
  defaultHeight = 100,
  theme = 'light',
  defaultValue = '',
  path,
  name
}: CodeEditorInterface): JSX.Element {
  const baseColor = theme === 'light' ? '#fff' : '#1e1e1e'
  const baseFontColor = theme == 'light' ? '#1e1e1e' : '#fff'

  return (
    <Container id={id} margin={2}>
      <Text
        fontSize="lg"
        bg={baseColor}
        color={baseFontColor}
        paddingX={4}
        paddingY={4}
      >
        {name}
      </Text>
      <Box bg={baseColor} padding={4} borderRadius={4} borderTopRadius={0}>
        <Editor
          path={path}
          onChange={handleOnChange}
          height={`${defaultHeight}vh`}
          theme={theme}
          defaultValue={defaultValue}
        />
      </Box>
    </Container>
  )
}
