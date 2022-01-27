import { FC } from 'react'
import { UseFormRegister, UseFormWatch } from 'react-hook-form'
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
} from '@chakra-ui/react'
import { YesNo } from '@opengovsg/design-system-react'

import { Card } from './Card'
import { Dropbox } from './Dropbox'

export interface SectionData {
  heading: string
  questions: Array<{
    type: string
    label: string
    id: string
    required?: boolean
    helpers?: Array<{
      helpertext: string
      helperurl?: string
    }>
    placeholder?: string
  }>
}

export interface SectionProps extends SectionData {
  register: UseFormRegister<any>
  watch: UseFormWatch<any>
}

export const Section: FC<SectionProps> = ({
  heading,
  questions,
  register,
  watch,
}) => {
  return (
    <Card heading={heading}>
      <VStack>
        {questions.map((question, index) => {
          const getType = {
            file: <Dropbox name={question.id} />,
            'conditional-number': (
              <NumberInput defaultValue={0} min={0}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            ),
            'conditional-boolean': <YesNo name={question.id} />,
          }[question.type] || (
            <Input type={question.type} {...register(question.id)} />
          )
          return (
            <FormControl key={index} isRequired={question.required}>
              <FormLabel>{question.label}</FormLabel>
              {question.helpers?.map((helper, index) => (
                <FormHelperText key={index}>
                  {helper.helpertext}
                  {helper.helperurl && (
                    <Link isExternal href={helper.helperurl}>
                      {' '}
                      here
                    </Link>
                  )}
                </FormHelperText>
              ))}
              {getType}
            </FormControl>
          )
        })}
      </VStack>
    </Card>
  )
}
