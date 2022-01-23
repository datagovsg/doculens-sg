import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'

import { CreateNewApplicationModal } from './CreateNewApplicationModal'
import { SelectorModal } from './SelectorModal'

export type CreateNewModalProps = {
  onClose: () => void
}

const CreateNewModal: FC<CreateNewModalProps> = ({ onClose }) => {
  return (
    <Modal isOpen onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent py="16px">
        <Routes>
          <Route
            path="new"
            element={<CreateNewApplicationModal onClose={onClose} />}
          />
          <Route path="*" element={<SelectorModal />} />
        </Routes>
      </ModalContent>
    </Modal>
  )
}

export default CreateNewModal
