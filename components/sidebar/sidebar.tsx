import {
  Box,
  Container,
  Heading,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Button,
  Text,
  Flex
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { File, Theme } from '../../types'
import SideBarItem from './sidebar-item'
import { store } from '../../state/local/store'
import { ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { defaultMetadata } from '../../state/local/constants'

export default function Sidebar() {
  const [localStore, setLocalStore] = useState<File[]>([])

  function update() {
    const latestStorage = store.getAll()
    if (latestStorage) {
      setLocalStore(() => [...latestStorage])
    }
  }

  function handleOnChange(value: string | string[]) {
    const current = store.metadata.get()
    if (current) {
      current.editorTheme = value as Theme
    }
    store.metadata.set(current ?? defaultMetadata)
  }

  useEffect(() => {
    update()
  }, [])

  useEffect(() => {
    window.parent.addEventListener('storage', update)
    return () => {
      window.parent.removeEventListener('storage', update)
    }
  })

  return (
    <Box border="1px solid" borderRadius="sm" margin={1}>
      <Container className="p-4">
        <Stack>
          <Heading size="sm">Files</Heading>
          {localStore &&
            localStore.length &&
            localStore.map((file) => (
              <div key={file.name}>
                <SideBarItem file={file} />
              </div>
            ))}
        </Stack>
      </Container>
      <Container bottom={8} position="absolute">
        <Menu closeOnSelect={true}>
          <MenuButton as={Button} size="sm">
            Theme
            <ChevronDownIcon />
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuOptionGroup
              defaultValue="light"
              title="Editor Theme"
              type="radio"
              onChange={handleOnChange}
            >
              <MenuItemOption value="light">
                {' '}
                <Flex>
                  <Box paddingTop={0.25}>
                    <SunIcon />
                  </Box>
                  <Text paddingX={2}>light</Text>
                </Flex>
              </MenuItemOption>
              <MenuItemOption value="vs-dark">
                <Flex>
                  <Box paddingTop={0.25}>
                    <MoonIcon />
                  </Box>
                  <Text paddingX={2}>vs-dark</Text>
                </Flex>
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Container>
    </Box>
  )
}
