import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, HStack, Text } from '@chakra-ui/react'

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
  const [cachedStatus, setCachedStatus] = useState(application.status)

  const handleReturnToSubmissions = () => {
    navigate({ pathname: `/dashboard` })
  }

  return (
    <>
      <NavbarContainer
        leftElement={
          <NavbarBack
            label="Back to dashboard"
            handleClick={handleReturnToSubmissions}
          />
        }
        centerElement={
          <>
            <Text textStyle="heading2" textColor="secondary.500">
              {application.name}
            </Text>
            &nbsp;
            <Badge
              colorScheme={
                cachedStatus === 'Incomplete' ? 'warning' : 'primary'
              }
              variant="subtle"
            >
              {cachedStatus.toLowerCase()}
            </Badge>
          </>
        }
        rightElement={
          <HStack>
            <HStack spacing={2} pr={2}>
              <IncompleteModal
                email={application.email}
                id={application.id}
                setStatus={setCachedStatus}
              />
              <CompleteModal setStatus={setCachedStatus} />
            </HStack>
          </HStack>
        }
      />
    </>
  )
}

export default ViewerHeader
