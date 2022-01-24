import { FC } from 'react'
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useMultiStyleConfig,
} from '@chakra-ui/react'

import { ResponseBar } from '~pages/responses/components/ResponseTable/ResponseBar'

// TODO: Consider using https://react-table.tanstack.com/docs/quick-start

const tableHeaders = ['#', 'Applicant Name', ' Application Status', 'Date']
const tableContent = ['1', 'Albert Wong', 'Completed', '11-12-2021']

const ResponseTable: FC = () => {
  const styles = useMultiStyleConfig('Table', {})

  // Component helper functions
  const listHeaders = tableHeaders.map((heading) => (
    <Th sx={styles.heading}>{heading}</Th>
  ))
  const listContent = tableContent.map((content) => <Td>{content}</Td>)

  return (
    <>
      <ResponseBar />
      <Table mt="10px">
        <Thead backgroundColor="secondary.500" alignItems="center">
          <Tr>{listHeaders} </Tr>
        </Thead>
        <Tbody>
          <Tr>{listContent}</Tr>
        </Tbody>
      </Table>
    </>
  )
}

export default ResponseTable
