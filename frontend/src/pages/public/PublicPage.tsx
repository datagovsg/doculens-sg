import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Button,
  Divider,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'

import DoculensLogo from '~assets/doculens-logo.svg'

import { Hero, Instructions, ISection, Section } from './components'
import { body, estmins, title } from './form.json'

export interface FormValues {
  attachments: Array<{
    id: string
    files: Array<string>
  }>
  responses: Array<{
    id: string
    value: string
  }>
}

const PublicPage: FC = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)

  return (
    <>
      <Hero estmins={estmins} title={title} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack py="84px" spacing={6}>
          <Instructions />
          {(body as ISection[]).map((section, index) => {
            return (
              <Section
                key={index}
                heading={section.heading}
                questions={section.questions}
                register={register}
                watch={watch}
              />
            )
          })}
          <Button w={{ base: '90vw', md: '80vw' }} maxW={{ md: '912px' }}>
            Submit now
          </Button>
          <Divider w="240px" borderColor="neutral.400" />
          <Text textStyle="caption1" color="secondary.400">
            Created with
          </Text>
          <Image htmlWidth="144px" src={DoculensLogo} />
          <HStack spacing={6}>
            <Link textStyle="caption1" color="secondary.400">
              Terms of Use
            </Link>
            <Link textStyle="caption1" color="secondary.400">
              Privacy Policy
            </Link>
          </HStack>
        </VStack>
      </form>
    </>
  )
}

export default PublicPage
