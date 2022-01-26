import { FC } from 'react'
import { Box } from '@chakra-ui/react'

export const Card: FC = ({ children }) => (
  <Box
    w={{ base: '90vw', md: '80vw' }}
    maxW={{ md: '912px' }}
    p="40px"
    bg="white"
  >
    {children}
  </Box>
)
