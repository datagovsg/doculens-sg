import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Text, useMultiStyleConfig, VStack } from '@chakra-ui/react'

const Card: FC = () => {
  // TODO: Retrieve all forms properly, remove mocks
  const id = 1
  const title = 'This is a sample title'
  const date = '16 Feb 2021'

  const styles = useMultiStyleConfig('Card', {})

  return (
    <>
      <Link to={`/responses/${id}`}>
        <VStack sx={styles.card} align="stretch" role="group">
          <VStack align="stretch" spacing="8px" flex={1}>
            <Text sx={styles.title} noOfLines={3}>
              {title}
            </Text>
            <Text flex={1} sx={styles.subtitle} isTruncated>
              {date}
            </Text>
          </VStack>
        </VStack>
      </Link>
    </>
  )
}

export default Card
