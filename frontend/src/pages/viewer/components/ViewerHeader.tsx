import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, HStack, Text } from '@chakra-ui/react'

import { ApplicationMetadata } from '~services/types'
import { NavbarBack } from '~components/Navbar/NavbarBack'
import { NavbarContainer } from '~components/Navbar/NavbarContainer'

import CompleteModal from '~pages/viewer/components/CompleteModal'
import IncompleteModal from '~pages/viewer/components/IncompleteModal'

interface ViewerHeaderProps {
  application: ApplicationMetadata
}

const ViewerHeader: FC<ViewerHeaderProps> = ({ application }) => {
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
            {application.name}
          </Text>
        }
        rightElement={
          <HStack>
            <HStack spacing={2} pr={2}>
              <IncompleteModal email={application.email} id={application.id} />
              <CompleteModal />
            </HStack>
          </HStack>
        }
      />
    </>
  )
}

export default ViewerHeader
