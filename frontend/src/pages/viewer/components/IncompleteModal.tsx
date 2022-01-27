import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { BiMailSend } from 'react-icons/bi'
import {
  Button,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { InlineMessage } from '@opengovsg/design-system-react'

import FormInput from '~components/FormInput'

const placeHolder =
  'Dear Sir or Madam, \n\rWe noted that the following Doucments XXX and XXX are missing'

export default function IncompleteModal() {
  const formMethods = useForm({
    mode: 'onChange',
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [contentValue, setContentValue] = useState('')

  const onSubmit = formMethods.handleSubmit((data) => {
    console.log('Received data')

    // TODO: Take in the state params
  })

  const handleInputChange = (e: { target: { value: string } }) => {
    const inputValue = e.target.value
    setContentValue(inputValue)
  }

  return (
    <>
      <Button onClick={onOpen} variant="outline">
        Mark as incomplete
      </Button>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        colorScheme="secondary"
      >
        <ModalOverlay />
        <ModalContent borderRadius="25px">
          <HStack
            textStyle="dialoghead"
            color="white"
            backgroundColor="secondary.500"
            borderRadius="24px 24px 0 0"
          >
            <ModalHeader
              paddingY={'8px'}
              fontSize="16px"
              paddingLeft="40px"
              minW={'600px'}
            >
              Mark Submission As Incomplete
            </ModalHeader>
            <ModalCloseButton top={2} />
          </HStack>
          <ModalBody paddingX="48px">
            <VStack spacing={4} align="stretch">
              <Text
                textStyle="heading2"
                color="primary.700"
                marginTop="48px"
                marginRight={0}
              >
                Notification Details
              </Text>
              <form onSubmit={onSubmit}>
                <FormProvider {...formMethods}>
                  <VStack spacing="24px" align="stretch">
                    <FormInput
                      name="subject"
                      inputLeftElement={<BiMailSend />}
                      label="Subject"
                      defaultValue="Incomplete Application For MOE Financial Assistance Scheme"
                    />
                    <FormInput
                      name="sender"
                      label="Sender Name"
                      defaultValue="Ministry of Education - Schools"
                      inputProps={{ isDisabled: true, isReadOnly: true }}
                    />
                    {/*<FormInput*/}
                    {/*  name="content"*/}
                    {/*  label="Content"*/}
                    {/*  inputProps={{ placeholder: placeHolder }}*/}
                    {/*/>*/}

                    <FormLabel>Content</FormLabel>
                    <Textarea
                      value={contentValue}
                      onChange={handleInputChange}
                      placeholder={placeHolder}
                      size="md"
                    />
                  </VStack>
                </FormProvider>
              </form>
              <InlineMessage>
                Proceeding to next step will mark the submission as incomplete
                and allow applicants to re-submit application with new
                documents.
              </InlineMessage>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              backgroundColor="secondary.500"
              onClick={onSubmit}
            >
              Send Email
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
