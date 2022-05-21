import { Box, Container, Heading, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { File } from '../../types'
import SideBarItem from './sidebar-item'
import { store } from '../../state/local/store'

export default function Sidebar() {
  const [localStore, setLocalStore] = useState<File[]>([])

  function update() {
    const latestStorage = store.getAll()
    if (latestStorage) {
      setLocalStore(() => [...latestStorage])
    }
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
    </Box>
  )
}
