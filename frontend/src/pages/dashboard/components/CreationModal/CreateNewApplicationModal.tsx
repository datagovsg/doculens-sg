import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { randomInt } from 'crypto'

export type CreateNewApplicationModalProps = {
  onClose: () => void
}

export const CreateNewApplicationModal: FC<CreateNewApplicationModalProps> = ({
  onClose,
}) => {
  const navigate = useNavigate()

  const initial = {
    title: '',
    description: '',
    fields: [],
    constants: [],
    operations: [],
    displays: [],
  }
  const { register, formState, handleSubmit } = useForm({
    mode: 'onChange',
  })
  const { isValid, errors } = formState

  const onSubmit = handleSubmit((data) => {
    const generatedFormId = randomInt(1, 1000000)
    console.log(
      `[INFO] Generated form with ID ${generatedFormId}, title: ${data.title}`,
    )

    navigate({ pathname: `/builder/${generatedFormId}/questions` })
  })

  return (
    <>
      <ModalHeader>Create new form application</ModalHeader>
      <ModalCloseButton />
      <form onSubmit={onSubmit}>
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isInvalid={!!errors.title}>
              <FormLabel htmlFor="id">DocuForm Title</FormLabel>
              <Input
                {...register('title', { required: 'Title is required' })}
              />
              <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="description">
                DocuForm description{' '}
                <Text as="span" color="grey">
                  (Optional)
                </Text>
              </FormLabel>
              <Textarea {...register('description')} resize="none" />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button disabled={!isValid} type="submit" colorScheme="primary">
              Create
            </Button>
          </HStack>
        </ModalFooter>
      </form>
    </>
  )
}
