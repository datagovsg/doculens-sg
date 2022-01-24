import { FC } from 'react'
import { BiRightArrowAlt } from 'react-icons/all'
import { Link as RouterLink } from 'react-router-dom'
import { HStack, Image, Text } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'

import DoculensLogo from '~assets/doculens-logo.svg'
import { NavbarContainer } from '~components/Navbar/NavbarContainer'

export const Navbar: FC = () => {
  // TODO: Replace with user auth
  const mockUserEmail = 'test@open.gov.sg'

  return (
    <NavbarContainer
      leftElement={
        <HStack spacing="94px">
          <RouterLink to="/">
            <Image htmlWidth="144px" src={DoculensLogo} />
          </RouterLink>
        </HStack>
      }
      rightElement={
        <HStack spacing={8}>
          <Text>{mockUserEmail || 'Not signed in'}</Text>
          <Button
            colorScheme="primary"
            rightIcon={<BiRightArrowAlt fontSize="1.5rem" />}
            variant="outline"
          >
            Sign Out
          </Button>
        </HStack>
      }
    />
  )
}

export default Navbar
