import { FC } from 'react'
import { Container } from '@chakra-ui/react'
import { Attachment, Toast } from '@opengovsg/design-system-react'

export const LoaderSection: FC = () => {
  return (
    <>
      <Toast
        title="This is a BETA feature"
        description="Have a in-person application? Or your application came through via other mediums? Drag and drop here and we'll take care of it "
        status="success"
        onClose={() => null}
      />
      <Container pt="50px">
        <Attachment
          name="Loader-files"
          onChange={() => console.log('Drag drop detected')}
          onError={() => console.error('error detected')}
        />
      </Container>
    </>
  )
}
