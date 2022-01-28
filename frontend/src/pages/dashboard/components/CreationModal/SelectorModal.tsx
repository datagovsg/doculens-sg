import { FC } from 'react'
import { BiBookHeart, BiPlus } from 'react-icons/bi'
import { IoBusinessOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import {
  Center,
  Divider,
  HStack,
  ModalBody,
  ModalHeader,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'

import ClickableTile from '~components/ClickableTile'

export const SelectorModal: FC = () => {
  return (
    <>
      <ModalHeader>Create new DocuForm</ModalHeader>
      <ModalBody>
        <VStack>
          <Center pt="16px" pb="32px">
            <HStack spacing="32px">
              <Link to="/dashboard/create/new/build">
                <Button leftIcon={<BiPlus />} colorScheme="primary">
                  Create from scratch
                </Button>
              </Link>
              <Text textStyle="body2" color="neutral.600">
                or choose from template below (future)
              </Text>
            </HStack>
          </Center>
          <Divider />
          <SimpleGrid width={{ md: '100%' }} columns={2} spacing="1rem">
            <ClickableTile
              title="MOE Financial Assistance"
              description="Create template form for financial assistance scheme"
              icon={BiBookHeart}
            />
            <ClickableTile
              title="ESG Startup Grant"
              description="Create template form for Enterprise Grants"
              icon={IoBusinessOutline}
            />
          </SimpleGrid>
        </VStack>
      </ModalBody>
    </>
  )
}
