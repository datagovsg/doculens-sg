import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { InlineMessage } from '@opengovsg/design-system-react'

import { ApplicationStatus } from '~services/types'

export default function CompleteModal({
  status,
  setStatus,
}: {
  status: ApplicationStatus
  setStatus: (applicationStatus: ApplicationStatus) => void
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onSubmit = () => {
    setStatus(ApplicationStatus.COMPLETED)
    onClose()
  }

  return (
    <>
      <Button
        onClick={onOpen}
        disabled={status === ApplicationStatus.COMPLETED}
      >
        Mark as complete
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
              Mark Submission As complete
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
                Mark as complete
              </Text>
              <InlineMessage>
                Proceeding to next step will mark the submission as complete.
                Applicant will not be able to edit their submission.
              </InlineMessage>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              backgroundColor="secondary.500"
              onClick={onSubmit}
            >
              Mark Complete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
