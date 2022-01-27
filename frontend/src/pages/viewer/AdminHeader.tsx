import { ReactNode } from 'react'
import { ArrowBackIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'

import IncompleteModal from '~pages/viewer/components/IncompleteModal'

const Links = ['Back To List']

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
)

export default function AdminHeader({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link) => (
                <>
                  <ArrowBackIcon />
                  <NavLink key={link}>{link}</NavLink>
                </>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <HStack spacing="24px">
              <IncompleteModal />
              <Button>Mark as complete</Button>
            </HStack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>{children}</Box>
    </>
  )
}
