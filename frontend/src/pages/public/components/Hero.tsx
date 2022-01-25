import React, { FC } from 'react'
import { BiLogOutCircle } from 'react-icons/bi'
import { Button } from '@opengovsg/design-system-react'

import { useAuth } from '~features/auth'

const Hero: FC = () => {
  const { isAuthenticated, email } = useAuth()

  return (
    <>
      isAuthenticated &&
      <Button
        colorScheme="primary"
        rightIcon={<BiLogOutCircle fontSize="1.5rem" />}
        variant="outline"
      >
        {email} - Log out
      </Button>
    </>
  )
}

export default Hero
