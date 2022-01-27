import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { VStack } from '@chakra-ui/react'

//import { GovtMasthead } from '@opengovsg/design-system-react' // Pending design-system-react 0.0.6 release
import { Hero, Instructions, Section, SectionData } from './components'
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
  const watchShowAge = watch('Unemployed', 0) // you can supply default value as second argument

  return (
    <>
      {/* <GovtMasthead /> */}
      <Hero estmins={estmins} title={title} />
      <VStack py="84px" spacing={6}>
        <Instructions />
        <form onSubmit={handleSubmit(onSubmit)}>
          {(body as SectionData[]).map((section, index) => {
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
        </form>
      </VStack>
    </>
  )
}

export default PublicPage
