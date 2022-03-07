import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Box, Link, Text, Grid } from '@chakra-ui/react'
import React from 'react'

export default function Footer() {
  return (
    <Box
      backgroundColor="gray.700"
      margin={0}
      width="100vw"
      color="gray.50"
      py={4}
    >
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <Text fontSize="sm" px={2}>
          <Link
            isExternal
            href="https://github.com/SammyRobensParadise/code-your-resume"
          >
            Github <ExternalLinkIcon mx="2px" />
          </Link>
        </Text>
        <Text fontSize="sm" textAlign="center" px={2}>
          Made with ❤️ by Sammy Robens-Paradise{' '}
          <Link isExternal href="https://sammy.world">
            https://sammy.world <ExternalLinkIcon mx="2px" />
          </Link>
        </Text>
        <Text fontSize="sm" textAlign="right" px={2}>
          <Link
            isExternal
            href="https://github.com/SammyRobensParadise/code-your-resume/issues"
          >
            Report a Bug 🐛
            <ExternalLinkIcon mx="2px" />
          </Link>
        </Text>
      </Grid>
    </Box>
  )
}
