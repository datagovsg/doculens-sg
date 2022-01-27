import { FC } from 'react'
import { Text } from '@chakra-ui/react'
import { Attachment } from '@opengovsg/design-system-react'

type DropboxProps = {
  numFiles?: number
  name: string
}

export const Dropbox: FC<DropboxProps> = ({ numFiles, name }) => {
  return (
    <>
      <Attachment maxSize={20971520} name={name} />
      <Text>
        {numFiles && (
          <b>
            Please attach {numFiles} file{numFiles > 1 && 's'}.{' '}
          </b>
        )}
        Maximum file size: 20 MB
      </Text>
    </>
  )
}
