import React from 'react'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control'
import { HStack, Image, InputProps, Text } from '@chakra-ui/react'

import errorCircleSolid from '~assets/error-circle-solid.svg'
import BaseInput from '~components/BaseInput'

type FormInputProps = {
  name: string
  label: string | React.ReactNode
  registerOptions?: RegisterOptions
  inputProps?: InputProps
  inputRightElement?: React.ReactNode
  inputLeftElement?: React.ReactNode
  defaultValue?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  isInputValid?: (input: string) => boolean
  transformInput?: (input: string) => string
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  registerOptions,
  inputProps,
  inputRightElement,
  inputLeftElement,
  onChange,
  defaultValue = '',
  isInputValid = () => true,
  transformInput = (input) => input,
}) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      rules={registerOptions}
      defaultValue={defaultValue}
      render={({
        field: {
          onChange: onFormChange,
          onBlur,
          value,
          name,
          ref: formInputRef,
        },
        fieldState: { error }, // invalid, isTouched, isDirty,
      }) => (
        <FormControl isInvalid={!!error}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <BaseInput
            id={name}
            value={value}
            onChange={(e) => {
              const newVal = transformInput(e.target.value)
              if (value === newVal) {
                return
              }
              e.target.value = isInputValid(newVal) ? newVal : value || '' // Can be undefined before first character input
              onFormChange(e)
              onChange?.(e)
            }}
            ref={formInputRef}
            onBlur={onBlur}
            rightElement={inputRightElement}
            leftElement={inputLeftElement}
            {...inputProps}
          />
          <FormErrorMessage>
            {!!error && (
              <HStack spacing="8px" align="start">
                <Image
                  src={errorCircleSolid}
                  width="1rem"
                  height="1rem"
                  marginTop="2px"
                />
                <Text textStyle="body2">{error.message}</Text>
              </HStack>
            )}
          </FormErrorMessage>
        </FormControl>
      )}
    />
  )
}

export default FormInput
