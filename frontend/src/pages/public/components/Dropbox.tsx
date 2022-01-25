import React, { FC } from 'react'
import { Attachment } from '@opengovsg/design-system-react'

type Props = {
  numFiles: number
}

const Dropbox = (props: Props) => {
  return (
    <>
      <Attachment maxSize={20971520} name="Test-input" />
    </>
  )
}

export default Dropbox
