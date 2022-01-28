import { FC } from 'react'
import { UseFormRegister, UseFormWatch } from 'react-hook-form'
import { VStack } from '@chakra-ui/react'

import { Card } from './Card'
import { IQuestion, Question } from './Question'

export interface ISection {
  heading: string
  questions: IQuestion[]
}

interface SectionProps extends ISection {
  register: UseFormRegister<any>
  watch: UseFormWatch<any>
}

export const Section: FC<SectionProps> = ({ heading, questions, ...rest }) => {
  return (
    <Card heading={heading}>
      <VStack spacing={8}>
        {questions.map((question, index) => (
          <Question key={index} question={question} {...rest} />
        ))}
      </VStack>
    </Card>
  )
}
