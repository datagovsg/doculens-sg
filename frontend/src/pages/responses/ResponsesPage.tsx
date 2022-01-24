import React from 'react'
import { Container } from '@chakra-ui/react'

import NestedNavbar from '~pages/responses/components/NestedNavbar'
import ResponseTable from '~pages/responses/components/ResponseTable/ResponseTable'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ResponsesPageProps {}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ResponsesPage = ({}: ResponsesPageProps) => {
  return (
    <>
      <NestedNavbar />
      <Container maxW="960px" px={0} pt={'100px'}>
        <ResponseTable />
      </Container>
    </>
  )
}

export default ResponsesPage
