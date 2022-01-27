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

import { Dropbox } from './Dropbox'

export interface IQuestion {
  type: string
  label: string
  id: string
  required?: boolean
  helpers?: {
    helpertext: string
    helperurl?: string
  }[]
  subquestions?: IQuestion[]
  placeholder?: string
}

interface QuestionProps {
  question: IQuestion
  register: UseFormRegister<any>
  watch: UseFormWatch<any>
}

export const Question: FC<QuestionProps> = ({ question, register, watch }) => {
  const getType = {
    file: <Dropbox name={question.id} />,
    'conditional-number': (
      <NumberInput
        defaultValue={0}
        {...register(question.id)}
        onChange={(k, e) => {
          register(question.id).onChange({
            target: { value: e, name: question.id },
            type: 'change',
          })
        }}
        min={0}
        max={20}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    ),
    'conditional-boolean': <YesNo name={question.id} />,
  }[question.type] || <Input type={question.type} {...register(question.id)} />

  const watchConditional = watch(question.id)

  return (
    <FormControl isRequired={question.required}>
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
      {watchConditional > 0 &&
        question.subquestions?.map((subquestion, index) => (
          <Question
            key={index}
            question={subquestion}
            register={register}
            watch={watch}
          />
        ))}
    </FormControl>
  )
}
