import React, { ReactText, useEffect, useState } from 'react'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  Button,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  StackDivider,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import axios from 'axios'

import AdminHeader from '~pages/viewer/AdminHeader'
import AdminPDFconsole from '~pages/viewer/AdminPDFconsole'

interface attachmentProps {
  name: string
  attachmentID: string
}
const AttachmentProps: Array<attachmentProps> = [
  {
    name: 'Attachment Form',
    attachmentID: 'a5045f0658628970bc646b5142ae611e',
  },
  {
    name: 'Unemployed',
    attachmentID: 'sample2.pdf',
  },
  {
    name: 'Profit and Loss',
    attachmentID: '286a163021bade5eb765fc119d28c3de',
  },
  {
    name: 'CPF Statement of ...',
    attachmentID: '286a163021bade5eb765fc119d28c3de',
  },
]

export default function SimpleSidebar() {
  const { isOpen, onClose } = useDisclosure()
  const [attachedFile, setFile] = useState<string>()

  const setAttachedfile = (id) => {
    console.log('USE EFFECT activated')
    axios
      .get(`./api/attachment/${id}`, { responseType: 'arraybuffer' })
      .then((r) => setFile(r.data))
  }

  return (
    <AdminHeader>
      <SidebarContent
        setAttachedfile={setAttachedfile}
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
          <SidebarContent setAttachedfile={setAttachedfile} onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <Box ml={{ base: 0, md: 60 }} p="4">
        {attachedFile && <AdminPDFconsole attachedFile={attachedFile} />}
      </Box>
    </AdminHeader>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
  setAttachedfile: (attachment: string) => void
}

const SidebarContent = ({
  setAttachedfile,
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
        <Box pb="15" pt="5">
          <Text fontSize="1.2rem">Submission Details</Text>
          <CloseButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onClose}
          />
        </Box>
      </Flex>
      {AttachmentProps.map((link) => (
        <NavItem
          key={link.attachmentID}
          attachmentID={link.attachmentID}
          setAttachedfile={setAttachedfile}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  attachmentID: string
  setAttachedfile: (attachment: string) => void
  children: ReactText
}
const NavItem = ({ attachmentID, children, setAttachedfile }: NavItemProps) => {
  return (
    <Accordion allowToggle>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {children}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>

          <AccordionPanel pb={4}>
            <Button
              variant="link"
              onClick={() => setAttachedfile(attachmentID)}
            >
              <Flex
                align="right"
                p="1"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
              >
                Item 1
              </Flex>
            </Button>
          </AccordionPanel>
        </AccordionItem>
      </VStack>
    </Accordion>
  )
}
