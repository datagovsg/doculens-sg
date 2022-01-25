import React from 'react'

//import { GovtMasthead } from '@opengovsg/design-system-react' // Pending design-system-react 0.0.6 release
import Hero from '~pages/public/components/Hero'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PublicPageProps {}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const PublicPage = ({}: PublicPageProps) => {
  return (
    <>
      {/* <GovtMasthead /> */}
      <Hero />
    </>
  )
}

export default PublicPage
