import { FC, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Center, Flex, Image, VStack } from '@chakra-ui/react'

import Logo from '~assets//doculens-logo.svg'
import Illustration from '~assets/doculens-login-illustration.svg'

import { LoginForm } from '~pages/login/components/LoginForm'
import { OTPForm } from '~pages/login/components/OTPForm'
import { LOGGED_IN_KEY, useLocalStorage } from '~features/localStorage'

const LoginPage: FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [, setIsAuthenticated] = useLocalStorage<boolean>(LOGGED_IN_KEY)

  const login = useCallback(() => {
    setIsAuthenticated(true)
  }, [setIsAuthenticated])

  const handleLogin = () => {
    login()
    navigate('/wee')
  }
  return (
    <Flex direction="column" minH="100vh" align="stretch">
      <Flex direction={'row'} flex={1}>
        <Center
          flex={1}
          bg="primary.500"
          display={{ base: 'none', lg: 'flex' }}
        >
          <Image
            src={Illustration}
            htmlWidth="80%"
            minWidth="480px"
            mr="-50%"
          />
        </Center>
        <Flex
          alignItems={{ base: 'flex-start', md: 'center' }}
          justifyContent="center"
          flex={2}
          padding={{ base: '64px 32px', md: '0px' }}
        >
          <VStack
            w={{ base: '100%', md: '460px' }}
            align="stretch"
            spacing="48px"
          >
            <Image src={Logo} w={{ base: '195px', md: '260px' }} />
            {!email ? (
              <OTPForm setEmail={setEmail} />
            ) : (
              <LoginForm email={email} onLogin={handleLogin} />
            )}
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default LoginPage
