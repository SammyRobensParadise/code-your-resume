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
        <Tooltip label="Double Click to Edit" aria-label="Tooltip Edit">
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
        <Name name={file.name} id={file.id} />
        <Spacer />
        <ButtonGroup>
          <Button size="xs">
            <Tooltip
              label="Delete"
              aria-label="Delete"
              backgroundColor="blackAlpha.700"
            >
              <DeleteIcon color="blackAlpha.700" />
            </Tooltip>
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  )
}
