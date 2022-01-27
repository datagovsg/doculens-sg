import { FC } from 'react'
import { Box, Divider, Text, VStack } from '@chakra-ui/react'

import { ApplicationMetadata } from '~services/types'

interface SubmissionMetadataViewProps {
  application: ApplicationMetadata
}

export const SubmissionMetadataView: FC<SubmissionMetadataViewProps> = ({
  application,
}) => {
  // Hooks and what not

  return (
    <>
      <VStack px={'50px'} pt={'50px'} align="flex-start" spacing={10}>
        <Text textStyle="heading2" textColor="secondary.500">
          Personal Particulars
        </Text>
        <Divider />

        <Box>
          <Text textStyle="heading3" textColor="secondary.500">
            Applicant Name
          </Text>
          <Text paddingTop="8px">{application.name}</Text>
        </Box>

        <Box>
          <Text textStyle="heading3" textColor="secondary.500">
            Applicant Email
          </Text>
          <Text paddingTop="8px">{application.email}</Text>
        </Box>

        <Box>
          <Text textStyle="heading3" textColor="secondary.500">
            Applicant Mobile Number
          </Text>
          <Text paddingTop="8px">(User did not provide number)</Text>
        </Box>
      </VStack>
    </>
  )
}
