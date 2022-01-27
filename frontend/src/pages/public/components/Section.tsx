import { FC } from 'react'
import { UseFormRegister, UseFormWatch } from 'react-hook-form'
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  VStack,
} from '@chakra-ui/react'

import { Card } from './Card'
import { Dropbox } from './Dropbox'

interface SectionProps {
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
          console.log(question.id)
          const getType = {
            file: <Dropbox name={question.id} />,
            'conditional-number': <div />,
            'conditional-boolean': <div />,
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
              <Input id={question.id}>{}</Input>
            </FormControl>
          )
        })}
      </VStack>
    </Card>
  )
}
