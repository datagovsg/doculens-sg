import { FC } from 'react'
import { useForm } from 'react-hook-form'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'

interface LoginFormProps {
  email: string
  onLogin: () => void
}

export const LoginForm: FC<LoginFormProps> = ({ email, onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: { token: string }) => {
    if (data.token === '123456') {
      onLogin()
    }
  }

  const hasError = () => errors.token

  const getErrorMessage = (): string => {
    const { token } = errors
    return token && token.type === 'required'
      ? 'Please provide a valid OTP'
      : 'API error is unhandled currently. Token may be invalid or some other thing is happening '
  }

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="32px" align="stretch">
        <FormControl id="token" isInvalid={hasError()}>
          <FormLabel color="neutral.900">One time password</FormLabel>
          <Text color="neutral.700" mb="24px">
            Please enter the OTP sent to {email}.
          </Text>
          <Input
            h="48px"
            type="text"
            inputMode="numeric"
            pattern="\d{6}"
            {...register('token', {
              required: true,
            })}
            autoComplete="one-time-code"
            placeholder="e.g. 111111"
          />
          {hasError() && (
            <FormErrorMessage>{getErrorMessage()}</FormErrorMessage>
          )}
        </FormControl>
        <HStack justifyContent="flex-start" spacing={6}>
          <Button
            size="lg"
            isLoading={false}
            colorScheme="primary"
            type="submit"
          >
            Login
          </Button>
          <Button variant="link" disabled={true}>
            Resend OTP
          </Button>
        </HStack>
      </VStack>
    </form>
  )
}
