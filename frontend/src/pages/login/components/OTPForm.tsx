import { FC } from 'react'
import { useForm } from 'react-hook-form'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'

interface OTPFormProps {
  setEmail: (email: string) => void
}

export const OTPForm: FC<OTPFormProps> = ({ setEmail }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const hasError = () => errors.email

  const getErrorMessage = (): string => {
    if (errors.email) {
      return 'Please provide a valid email address'
    }
    return 'Unknown error has occurred'
  }

  const onSubmit = (data: { email: string }) => {
    const lowerCasedEmail = data.email.toLowerCase()
    setEmail(lowerCasedEmail)
  }
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="32px" align="stretch">
        <FormControl id="email" isInvalid={hasError()}>
          <FormLabel label="neutral.900">Login</FormLabel>
          <Text color="neutral.700" mb="24px">
            Only available for use by public officers with a{' '}
            <strong>gov.sg</strong> email.
          </Text>
          <Input
            h="48px"
            type="email"
            {...register('email', { required: true })}
            placeholder="e.g. jane@open.gov.sg"
          />
          {hasError() && (
            <FormErrorMessage>{getErrorMessage()}</FormErrorMessage>
          )}
        </FormControl>
        <Box>
          <Button
            size="lg"
            isLoading={false}
            colorScheme="primary"
            type="submit"
          >
            Get started
          </Button>
        </Box>
      </VStack>
    </form>
  )
}
