import { FC } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useMultiStyleConfig,
} from '@chakra-ui/react'
import moment from 'moment-timezone'

import useFetch from '~hooks/useFetch'
import { retrieveApplicationsByFormId } from '~services/DoculensApi'
import { ApplicationMetadata } from '~services/types'
import ConditionalWrapper from '~components/ConditionalWrapper'

import { ResponseBar } from '~pages/responses/components/ResponseTable/ResponseBar'

// TODO: Consider using https://react-table.tanstack.com/docs/quick-start

const tableHeaders = ['#', 'Applicant Name', ' Application Status', 'Date']

interface ResponseTableProps {
  formId: string
}

const ResponseTable: FC<ResponseTableProps> = ({ formId }) => {
  const [applications, isLoading] = useFetch<ApplicationMetadata>({
    serviceFunction: retrieveApplicationsByFormId(formId),
  })

  const styles = useMultiStyleConfig('Table', {})

  // Component helper functions
  const listHeaders = tableHeaders.map((heading) => (
    <Th sx={styles.heading}>{heading}</Th>
  ))

  return (
    <>
      <ResponseBar responseCount={applications.length} isLoading={isLoading} />
      <ConditionalWrapper condition={isLoading} wrapper={() => <Spinner />}>
        <Table mt="10px">
          <Thead backgroundColor="secondary.500" alignItems="center">
            <Tr>{listHeaders} </Tr>
          </Thead>
          <Tbody>
            {applications.map((application) => (
              <SingleRow {...application} />
            ))}
          </Tbody>
        </Table>
      </ConditionalWrapper>
    </>
  )
}

const SingleRow: FC<ApplicationMetadata> = ({
  id,
  status,
  name,
  createdAt,
}) => {
  const navigate = useNavigate()

  const handleRowClick = () => {
    navigate(`/viewer/${id}`)
  }
  return (
    <Tr
      onClick={handleRowClick}
      _hover={{ backgroundColor: 'primary.100' }}
      cursor="pointer"
    >
      <Td>{id}</Td>
      <Td>{name}</Td>
      <Td>{status}</Td>
      <Td>{moment(createdAt).tz('Asia/Singapore').format('DD MMM YYYY')}</Td>
    </Tr>
  )
}

export default ResponseTable
