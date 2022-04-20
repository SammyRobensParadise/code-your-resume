import React, { ChangeEvent, useState } from 'react'
import Editor from '@monaco-editor/react'
import { Language, Theme, UUID } from '../../types'
import * as files from '../../state/local/files'

import {
  Box,
  Button,
  Flex,
  Spacer,
  Editable,
  EditablePreview,
  EditableInput,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

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

function Name({ name, id }: { name: string | undefined; id: UUID }) {
  function handleOnSubmit(nextName: string) {
    if (files) {
      files.updateFileData({
        operation: 'NAME',
        payload: {
          id,
          name: nextName,
          path: nextName
        }
      })
    }
  }
  return (
    <Editable
      lineHeight="2"
      fontSize="sm"
      defaultValue={name}
      onSubmit={handleOnSubmit}
    >
      <EditablePreview />
      <EditableInput />
    </Editable>
  )
}

function LanguageMenu({
  backgroundColor,
  fontColor,
  language,
  id
}: {
  backgroundColor: string
  fontColor: string
  language: Language | undefined
  id: UUID
}) {
  function handleOnChange(value: string | string[]) {
    const language = value as Language
    if (files) {
      files.updateFileData({
        operation: 'LANGUAGE',
        payload: { id, language }
      })
    }
  }

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        _hover={{ backgroundColor: '#080808' }}
        color={fontColor}
        backgroundColor={backgroundColor}
      >
        {language}
      </MenuButton>
      <MenuList minWidth="240px" backgroundColor={backgroundColor}>
        <MenuOptionGroup
          defaultValue={language ? language : 'html'}
          title="Supported Languages"
          type="radio"
          onChange={handleOnChange}
        >
          <MenuItemOption
            value="html"
            _hover={{ backgroundColor: '#080808' }}
            color={fontColor}
            backgroundColor={backgroundColor}
          >
            HTML
          </MenuItemOption>
          <MenuItemOption
            value="css"
            _hover={{ backgroundColor: '#080808' }}
            color={fontColor}
            backgroundColor={backgroundColor}
          >
            CSS
          </MenuItemOption>
          <MenuItemOption
            value="javascript"
            _hover={{ backgroundColor: '#080808' }}
            color={fontColor}
            backgroundColor={backgroundColor}
          >
            JavaScript
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}

export default function CodeEditor({
  id,
  handleOnChange,
  defaultHeight = 100,
  theme = 'light',
  defaultValue = '',
  path,
  name,
  language
}: CodeEditorInterface): JSX.Element | null {
  const baseColor = theme === 'light' ? '#fff' : '#1e1e1e'
  const baseFontColor = theme == 'light' ? '#1e1e1e' : '#fff'
  const [visible, setVisible] = useState<boolean>(true)
  return visible ? (
    <Box
      id={id}
      bg={baseColor}
      margin={2}
      borderRadius={4}
      boxShadow="base"
      backgroundColor="white"
    >
      <Flex
        bg={baseColor}
        color={baseFontColor}
        paddingX={4}
        paddingY={2}
        borderTopRadius={4}
      >
        <Name name={name} id={id} />
        <Spacer />
        <LanguageMenu
          backgroundColor={baseColor}
          fontColor={baseFontColor}
          language={language}
          id={id}
        />
        <Box paddingX={2} paddingY={2}>
          <Button
            size="xs"
            backgroundColor="blackAlpha.700"
            onClick={() => setVisible(false)}
          >
            <CloseIcon w={3} h={3} />
          </Button>
        </Box>
      </Flex>
      <Box bg={baseColor} padding={4} borderRadius={4} borderTopRadius={0}>
        <Editor
          path={path}
          onChange={handleOnChange}
          height={`${defaultHeight}vh`}
          theme={theme}
          defaultValue={defaultValue}
        />
      </Box>
    </Box>
  ) : null
}
