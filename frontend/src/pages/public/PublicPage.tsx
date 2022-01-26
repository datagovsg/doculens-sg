import React from 'react'
import { VStack } from '@chakra-ui/layout'

//import { GovtMasthead } from '@opengovsg/design-system-react' // Pending design-system-react 0.0.6 release
import { Hero, Instructions } from './components'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PublicPageProps {}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const PublicPage = ({}: PublicPageProps) => {
  return (
    <>
      {/* <GovtMasthead /> */}
      <Hero />
      <VStack py="84px" spacing={2}>
        <Instructions />
      </VStack>
    </>
  )
}

export default PublicPage
