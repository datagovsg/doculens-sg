import React, { ReactText, useState } from 'react'
import { AiOutlineFile } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  HStack,
  Spinner,
  StackDivider,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'

import useFetchSingular from '~hooks/useFetchSingular'
import { retrieveApplicationById } from '~services/DoculensApi'
import { ApplicationMetadata, Form } from '~services/types'
import ConditionalWrapper from '~components/ConditionalWrapper'

import AdminPDFconsole from '~pages/viewer/AdminPDFconsole'
import ViewerHeader from '~pages/viewer/components/ViewerHeader'

interface attachmentProps {
  name: string
  attachmentID: string
}
const AttachmentProps: Array<attachmentProps> = [
  {
    name: 'Attachment Form',
    attachmentID: '286a163021bade5eb765fc119d28c3de',
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
  // Retrieve application on render

  const params = useParams<{ id: string }>()
  const navigate = useNavigate()

  if (!params.id) {
    navigate('/dashboard')
  }

  const [application, isLoading] = useFetchSingular<ApplicationMetadata>({
    serviceFunction: retrieveApplicationById(params.id as string),
  })

  const { isOpen, onClose } = useDisclosure()
  const [selectedAttachment, setSelectedAttachment] = useState('')

  return (
    <ConditionalWrapper
      condition={isLoading || application === null}
      wrapper={() => <Spinner />}
    >
      <ViewerHeader application={application as ApplicationMetadata} />
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

      <Box ml={{ base: 0, md: 60 }} p="4" marginTop={'72px'}>
        <AdminPDFconsole pdfIdentifier={selectedAttachment} />
      </Box>
    </ConditionalWrapper>
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
      pt={'73px'}
      {...rest}
    >
      <Flex py="12px" alignItems="center" justifyContent="space-between">
        <Box>
          <Text textStyle="body1">Submission Details</Text>
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
  setSelectedAttachment: (attachment: string) => void
  children: ReactText
}
const NavItem = ({
  attachmentID,
  children,
  setSelectedAttachment,
}: NavItemProps) => {
  return (
    <Accordion allowToggle>
      <VStack
        divider={<StackDivider borderColor="neutral.300" />}
        spacing={4}
        align="stretch"
      >
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" py="2px">
                {children}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>

          <AccordionPanel px={2}>
            <HStack
              py={'3px'}
              onClick={() => setSelectedAttachment(attachmentID)}
              cursor="pointer"
            >
              <AiOutlineFile />
              <Text>Item 1</Text>
            </HStack>
          </AccordionPanel>
        </AccordionItem>
      </VStack>
    </Accordion>
  )
}
