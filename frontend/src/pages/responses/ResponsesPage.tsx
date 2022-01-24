import React from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '@chakra-ui/react'

import NestedNavbar from '~pages/responses/components/NestedNavbar'
import ResponseTable from '~pages/responses/components/ResponseTable/ResponseTable'
import { LoaderSection } from '~pages/responses/LoaderSection'
import { DashboardSection } from '~pages/responses/types'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ResponsesPageProps {}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ResponsesPage = ({}: ResponsesPageProps) => {
  const params = useParams<{ id: string; action: DashboardSection }>()

  const selectedTab = () => {
    switch (params.action) {
      case 'loader':
        return <LoaderSection />
      case 'responses':
        return <ResponseTable />
      default:
        return <ResponseTable />
    }
  }

  return (
    <>
      <NestedNavbar />
      <Container maxW="960px" px={0} pt={'100px'}>
        {selectedTab()}
      </Container>
    </>
  )
}

export default ResponsesPage
