import { FC, useCallback } from 'react'
import { BiLogOutCircle } from 'react-icons/bi'
import { Text, VStack } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'

import { useAuth } from '~features/auth'
import { LOGGED_IN_KEY, useLocalStorage } from '~features/localStorage'

type HeroProps = {
  estmins: number
  title: string
}

export const Hero: FC<HeroProps> = ({ estmins, title }) => {
  const { isAuthenticated, email } = useAuth()

  const [, setIsAuthenticated] = useLocalStorage<boolean>(LOGGED_IN_KEY)

  const logout = useCallback(() => {
    setIsAuthenticated(undefined)
  }, [setIsAuthenticated])

  return (
    <>
      <VStack bg="primary.500" py="48px" spacing={4}>
        <Text as="h1" textAlign="center" textStyle="heading1" color="white">
          {title}
        </Text>
        <Text textStyle="body2" color="white">
          {estmins} mins estimated time to complete
        </Text>
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
      </VStack>
    </>
  )
}
