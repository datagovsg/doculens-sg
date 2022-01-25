import React, { FC } from 'react'
import { Container, SimpleGrid, Spinner, VStack } from '@chakra-ui/react'

import useFetch from '~hooks/useFetch'
import { retrieveAllForms } from '~services/DoculensApi'
import { Form } from '~services/types'
import ConditionalWrapper from '~components/ConditionalWrapper'

import Card from '~pages/dashboard/components/Card'
import CreateNewCard from '~pages/dashboard/components/CreateNewCard'

// eslint-disable-next-line @typescript-eslint/no-empty-interface

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const DashboardPage: FC = () => {
  // TODO: Add actual forms to the layout
  const [forms, isLoading] = useFetch<Form>({
    serviceFunction: retrieveAllForms(),
  })

  return (
    <>
      <Container maxW="960px" px={0}>
        <VStack align="stretch" py={10} position="relative">
          <ConditionalWrapper condition={isLoading} wrapper={() => <Spinner />}>
            <SimpleGrid columns={4} spacing="32px">
              <CreateNewCard />
              {forms.map((form) => (
                <Card {...form} />
              ))}
            </SimpleGrid>
          </ConditionalWrapper>
        </VStack>
      </Container>
    </>
  )
}
