import React, { ReactNode, ReactText, useState } from 'react'
import { IconType } from 'react-icons'
import { BsFillFileEarmarkArrowDownFill } from 'react-icons/bs'
import {
  Box,
  BoxProps,
  Button,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Link,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'

import AdminPDFconsole from '~pages/viewer/AdminPDFconsole'

interface attachmentProps {
  name: string
  icon: IconType
  attachmentID: string
}
const AttachmentProps: Array<attachmentProps> = [
  {
    name: 'File 1',
    icon: BsFillFileEarmarkArrowDownFill,
    attachmentID: '286a163021bade5eb765fc119d28c3de',
  },
  {
    name: 'File 2',
    icon: BsFillFileEarmarkArrowDownFill,
    attachmentID: 'sample2.pdf',
  },
  {
    name: 'File 3',
    icon: BsFillFileEarmarkArrowDownFill,
    attachmentID: '286a163021bade5eb765fc119d28c3de',
  },
  {
    name: 'File 4',
    icon: BsFillFileEarmarkArrowDownFill,
    attachmentID: '286a163021bade5eb765fc119d28c3de',
  },
  {
    name: 'File 5',
    icon: BsFillFileEarmarkArrowDownFill,
    attachmentID: '286a163021bade5eb765fc119d28c3de',
  },
]

export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedAttachment, setSelectedAttachment] = useState('')
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        setSelectedAttachment={setSelectedAttachment}
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            setSelectedAttachment={setSelectedAttachment}
            onClose={onClose}
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <AdminPDFconsole pdfIdentifier={selectedAttachment} />
      </Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
  setSelectedAttachment: (attachment: string) => void
}

const SidebarContent = ({
  setSelectedAttachment,
  onClose,
  ...rest
}: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Admin Console
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {AttachmentProps.map((link) => (
        <NavItem
          key={link.attachmentID}
          attachmentID={link.attachmentID}
          icon={link.icon}
          setSelectedAttachment={setSelectedAttachment}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  attachmentID: string
  icon: IconType
  setSelectedAttachment: (attachment: string) => void
  children: ReactText
}
const NavItem = ({
  attachmentID,
  icon,
  children,
  setSelectedAttachment,
  ...rest
}: NavItemProps) => {
  return (
    <Button
      variant="link"
      onClick={() => setSelectedAttachment(attachmentID)}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Button>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<BsFillFileEarmarkArrowDownFill />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  )
}
