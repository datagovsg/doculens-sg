import { FC } from 'react'
import { Box, Text } from '@chakra-ui/react'

type CardProps = {
  heading: string
}

export const Card: FC<CardProps> = ({ children, heading }) => (
  <Box
    w={{ base: '90vw', md: '80vw' }}
    maxW={{ md: '912px' }}
    p="40px"
    bg="white"
  >
    <Text as="h2" textStyle="heading2" color="primary.600">
      {heading}
    </Text>
    {children}
  </Box>
)
