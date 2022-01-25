import { FC } from 'react'
import { BiPlus } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { Text, useMultiStyleConfig, VStack } from '@chakra-ui/react'

const CreateNewCard: FC = () => {
  const styles = useMultiStyleConfig('Card', { variant: 'create' })
  return (
    <>
      <Link to="/dashboard/create">
        <VStack sx={styles.card} spacing="26px">
          <BiPlus size="50px" style={{ display: 'inline' }} />
          <Text mt="16px" sx={styles.title}>
            Create new
            <br />
            DocuForm
          </Text>
        </VStack>
      </Link>
    </>
  )
}

export default CreateNewCard
