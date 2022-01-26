import React, { FC, useCallback } from 'react'
import { BiLogOutCircle } from 'react-icons/bi'
import { Button } from '@opengovsg/design-system-react'

import { useAuth } from '~features/auth'
import { LOGGED_IN_KEY, useLocalStorage } from '~features/localStorage'

const Hero: FC = () => {
  const { isAuthenticated, email } = useAuth()

  const [, setIsAuthenticated] = useLocalStorage<boolean>(LOGGED_IN_KEY)

  const logout = useCallback(() => {
    setIsAuthenticated(undefined)
  }, [setIsAuthenticated])

  return (
    <>
      {isAuthenticated && (
        <Button
          colorScheme="primary"
          rightIcon={<BiLogOutCircle fontSize="1.5rem" />}
          variant="outline"
          onClick={logout}
        >
          {email} - Log out
        </Button>
      )}
    </>
  )
}

export default Hero
