import { Box, Container, Heading, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Message } from '../../types'
import * as files from '../../state/local/files'
import { File } from '../../types'
import SideBarItem from './sidebar-item'

export default function Sidebar() {
  const [localFiles, setFiles] = useState<File[]>([])
  const mapFiles = files.useFiles()

  function handleMessage(message: MessageEvent<Message>) {
    const { payload } = message.data
    if (payload?.length) {
      setFiles(payload)
    }
  }
  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  })
  useEffect(() => {
    console.log(mapFiles)
  }, [mapFiles])

  return (
    <Box
      height="auto"
      border="1px solid"
      borderColor="gray.50"
      className="flex-grow w-max"
    >
      <Container className="p-4">
        <Stack>
          <Heading as="h3" size="sm">
            Files
          </Heading>
          {localFiles &&
            localFiles.length &&
            localFiles?.map((file) => (
              <div key={file.name}>
                <SideBarItem file={file} />
              </div>
            ))}
        </Stack>
      </Container>
    </Box>
  )
}
