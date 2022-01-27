import React, { ReactText, useEffect, useState } from 'react'
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
  Divider,
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
import axios from 'axios'

import useFetchSingular from '~hooks/useFetchSingular'
import { retrieveApplicationById } from '~services/DoculensApi'
import { ApplicationMetadata, Attachment } from '~services/types'
import ConditionalWrapper from '~components/ConditionalWrapper'

import AdminPDFconsole from '~pages/viewer/AdminPDFconsole'
import ViewerHeader from '~pages/viewer/components/ViewerHeader'

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

  const [attachedFile, setFile] = useState<string>()

  const setAttachedfile = (id) => {
    axios
      .get(`/api/attachment/${id}`, { responseType: 'arraybuffer' })
      .then((r) => setFile(r.data))
  }

  return (
    <ConditionalWrapper
      condition={isLoading || !application}
      wrapper={() => <Spinner />}
    >
      <ViewerHeader application={application as ApplicationMetadata} />
      <SidebarContent
        attachments={application?.attachments as Attachment[]}
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
          <SidebarContent
            attachments={application?.attachments as Attachment[]}
            setAttachedfile={setAttachedfile}
            onClose={onClose}
          />
        </DrawerContent>
      </Drawer>

      <Box ml={{ base: 0, md: 60 }} p="4" marginTop={'72px'}>
        {attachedFile && <AdminPDFconsole attachedFile={attachedFile} />}
      </Box>
    </ConditionalWrapper>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
  setAttachedfile: (attachment: string) => void
  attachments: Attachment[]
}

const SidebarContent = ({
  attachments,
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
      {attachments.map((attachmentGroup) => (
        <NavItem
          key={attachmentGroup.category}
          attachmentIDs={attachmentGroup.files}
          setAttachedfile={setAttachedfile}
        >
          {attachmentGroup.category}
        </NavItem>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  attachmentIDs: string[]
  setAttachedfile: (attachment: string) => void
  children: ReactText
}
const NavItem = ({
  attachmentIDs,
  children,
  setAttachedfile,
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
              <Box flex="1" textAlign="left">
                {children}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>

          <AccordionPanel px={2} pb={0}>
            {attachmentIDs.map((attachmentID) => (
              <>
                <HStack
                  flex={1}
                  _hover={{ backgroundColor: 'primary.200' }}
                  h={'54px'}
                  onClick={() => setAttachedfile(attachmentID)}
                  cursor="pointer"
                  textOverflow={'ellipsis'}
                  whiteSpace={'nowrap'}
                  overflow="hidden"
                >
                  <Box>
                    <AiOutlineFile />
                  </Box>

                  <Text textOverflow={'ellipsis'} overflow="hidden">
                    {attachmentID}
                  </Text>
                </HStack>
                <Divider />
              </>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </VStack>
    </Accordion>
  )
}
