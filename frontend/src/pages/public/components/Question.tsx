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
} from '@chakra-ui/react'
import { YesNo } from '@opengovsg/design-system-react'

import { Dropzone } from './Dropzone'

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
  numFiles?: number
}

export const Question: FC<QuestionProps> = ({
  question,
  register,
  watch,
  numFiles,
}) => {
  const importFile = (files: any) => {
    console.log(files)
  }
  const getInputField = {
    file: <Dropzone numFiles={numFiles} onFileAccepted={importFile} />,
    'conditional-number': (
      <NumberInput
        defaultValue={0}
        {...register(question.id)}
        onChange={(strVal, numVal) => {
          register(question.id).onChange({
            target: { value: numVal, name: question.id },
            type: 'change',
          })
        }}
        min={0}
        max={20}
        mt={4}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    ),
    'conditional-boolean': <YesNo name={question.id} mt={3} />,
  }[question.type] || (
    <Input
      type={question.type}
      {...register(question.id)}
      placeholder={question.placeholder}
      mt={3}
    />
  )

  const watchConditional = watch(question.id)

  return (
    <FormControl mt={8} isRequired={question.required}>
      <FormLabel mb={0}>{question.label}</FormLabel>
      {question.helpers?.map((helper, index) => (
        <FormHelperText mt={0} key={index}>
          {helper.helpertext}{' '}
          {helper.helperurl && (
            <Link isExternal href={helper.helperurl}>
              here
            </Link>
          )}
        </FormHelperText>
      ))}
      {getInputField}
      {watchConditional > 0 &&
        question.subquestions?.map((subquestion, index) => (
          <Question
            key={index}
            question={subquestion}
            register={register}
            watch={watch}
            numFiles={watchConditional}
          />
        ))}
    </FormControl>
  )
}
