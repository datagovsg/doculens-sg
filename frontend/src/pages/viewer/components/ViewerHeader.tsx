import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, HStack, Text } from '@chakra-ui/react'

import { NavbarBack } from '~components/Navbar/NavbarBack'
import { NavbarContainer } from '~components/Navbar/NavbarContainer'

import IncompleteModal from '~pages/viewer/IncompleteModal'

const ViewerHeader: FC = () => {
  const navigate = useNavigate()

  const handleReturnToSubmissions = () => {
    navigate({ pathname: `/dashboard` })
  }

  return (
    <>
      <NavbarContainer
        leftElement={
          <NavbarBack
            label="Back to list"
            handleClick={handleReturnToSubmissions}
          />
        }
        centerElement={
          <Text textStyle="heading2" textColor="secondary.500">
            Tan Tock Seng
          </Text>
        }
        rightElement={
          <HStack>
            <HStack spacing={2} pr={2}>
              <IncompleteModal />
              <Button>Mark as complete</Button>
            </HStack>
          </HStack>
        }
      />
    </>
  )
}

export default ViewerHeader
