import React, { ChangeEvent } from 'react'
import Editor from '@monaco-editor/react'
import { Language, Theme, UUID } from '../../types'

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
import { store } from '../../state/local/store'

export interface CodeEditorInterface {
  id: UUID
  language?: Language
  handleOnChange?: (value: string | undefined, event: ChangeEvent) => void
  openEditors?: number
  defaultWith?: number
  defaultValue?: string
  path: string
  theme?: Theme
  name?: string
}

export const editorColors: { light: string; dark: string; med: string } = {
  light: '#fff',
  dark: '#1e1e1e',
  med: '#080808'
}

function Name({ name, id }: { name: string | undefined; id: UUID }) {
  function handleOnSubmit(nextName: string) {
    store.set({
      operation: 'NAME',
      payload: { id, name: nextName, path: nextName }
    })
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
    store.set({
      operation: 'LANGUAGE',
      payload: { id, language }
    })
  }

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        _hover={{ backgroundColor: editorColors.med }}
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
            _hover={{ backgroundColor: editorColors.med }}
            color={fontColor}
            backgroundColor={backgroundColor}
          >
            HTML
          </MenuItemOption>
          <MenuItemOption
            value="css"
            _hover={{ backgroundColor: editorColors.med }}
            color={fontColor}
            backgroundColor={backgroundColor}
          >
            CSS
          </MenuItemOption>
          <MenuItemOption
            value="javascript"
            _hover={{ backgroundColor: editorColors.med }}
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
  openEditors = 2,
  theme = 'light',
  defaultValue = '',
  path,
  name,
  language
}: CodeEditorInterface): JSX.Element | null {
  const baseColor = theme === 'light' ? editorColors.light : editorColors.dark
  const baseFontColor =
    theme == 'light' ? editorColors.dark : editorColors.light

  function handleClose() {
    store.set({
      operation: 'CLOSE',
      payload: { id }
    })
  }

  return (
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
            onClick={handleClose}
          >
            <CloseIcon w={3} h={3} />
          </Button>
        </Box>
      </Flex>
      <Box
        bg={baseColor}
        padding={4}
        borderRadius={4}
        borderTopRadius={0}
        className="code-editor"
      >
        <Editor
          path={path}
          onChange={handleOnChange}
          height={`${Math.round(window.innerHeight / openEditors) - 100}px`}
          theme={theme}
          defaultValue={defaultValue}
        />
      </Box>
    </Box>
  )
}
