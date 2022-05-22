import {
  Box,
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Spacer,
  Tooltip
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { File, UUID } from '../../types'
import { DeleteIcon } from '@chakra-ui/icons'
import { FaHtml5, FaCss3Alt } from 'react-icons/fa'

import { store } from '../../state/local/store'

function Name({ name, id }: { name: string | undefined; id: UUID }) {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  function handleOnSubmit(nextName: string) {
    store.set({
      operation: 'NAME',
      payload: {
        id,
        name: nextName,
        path: nextName
      }
    })

    setIsEditing(false)
  }

  function handleOnClick() {
    store.set({
      operation: 'OPEN',
      payload: { id, name }
    })
    setIsEditing(false)
  }

  return (
    <>
      {isEditing ? (
        <Editable
          defaultValue={name}
          onSubmit={handleOnSubmit}
          fontWeight={400}
          marginX={2}
          width="full"
          textAlign="left"
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      ) : (
        <Tooltip label="Double Click to Edit Name" aria-label="Tooltip Edit">
          <Button
            onDoubleClick={() => setIsEditing(true)}
            onClick={handleOnClick}
            variant="link"
            fontWeight={400}
            marginX={2}
            width="full"
            textAlign="left"
          >
            {name}
          </Button>
        </Tooltip>
      )}
    </>
  )
}

export default function SideBarItem({ file }: { file: File }) {
  return (
    <Box>
      <Flex>
        <Box paddingTop={1.5}>
          {file.language === 'html' && <FaHtml5 />}
          {file.language === 'css' && <FaCss3Alt />}
        </Box>
        <Name name={file.name} id={file.id} />
        <Spacer />
        <ButtonGroup>
          <Button size="xs">
            <Tooltip label={`Delete ${file.name}`} aria-label="Delete">
              <DeleteIcon />
            </Tooltip>
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  )
}
