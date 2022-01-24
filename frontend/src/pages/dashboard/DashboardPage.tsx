import React, { FC } from 'react'
import { Container, SimpleGrid, VStack } from '@chakra-ui/react'

import Card from '~pages/dashboard/components/Card'
import CreateNewCard from '~pages/dashboard/components/CreateNewCard'

// eslint-disable-next-line @typescript-eslint/no-empty-interface

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const DashboardPage: FC = () => {
  // TODO: Add actual forms to the layout
  return (
    <>
      <Container maxW="960px" px={0}>
        <VStack align="stretch" py={10} position="relative">
          <SimpleGrid columns={4} spacing="32px">
            <CreateNewCard />
            <Card />
          </SimpleGrid>
        </VStack>
      </Container>
    </>
  )
}
