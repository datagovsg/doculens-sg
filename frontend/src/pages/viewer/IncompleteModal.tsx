import { useState } from 'react'
import { EmailIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'

export default function IncompleteModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <Button onClick={onOpen} variant="outline">
        Mark as incomplete
      </Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Email notifications</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              minH={'100vh'}
              align={'center'}
              justify={'center'}
              bg={useColorModeValue('gray.50', 'gray.800')}
            >
              <Stack spacing={8} mx={'auto'} minW={'50vw'} py={12} px={6}>
                <Stack align={'center'}>
                  <Heading fontSize={'4xl'} textAlign={'center'}>
                    Sign up
                  </Heading>
                  <Text fontSize={'lg'} color={'gray.600'}>
                    to enjoy all of our cool features ✌️
                  </Text>
                </Stack>
                <Box
                  rounded={'lg'}
                  bg={useColorModeValue('white', 'gray.700')}
                  boxShadow={'lg'}
                  p={8}
                >
                  <Stack spacing={4}>
                    <FormControl id="email" isRequired>
                      <Box paddingBottom={4}>
                        <HStack spacing={2}>
                          <EmailIcon />
                          <FormLabel>Send email Notifications to</FormLabel>
                        </HStack>
                      </Box>

                      <Input type="email" />
                    </FormControl>
                    <FormControl id="password" isRequired>
                      <FormLabel>Subject</FormLabel>
                      <Select placeholder="Select option">
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </Select>
                    </FormControl>
                    <FormControl id="password" isRequired>
                      <FormLabel>Sender name</FormLabel>
                      <Input
                        id="email"
                        type="email"
                        value="Ministry of Education"
                      />
                    </FormControl>
                    <FormControl id="password" isRequired>
                      <FormLabel>Content</FormLabel>
                      <VStack align="stretch" spacing={0}>
                        <Box h="40px" bg="tomato">
                          2
                        </Box>
                        <Box>
                          <Input id="email" type="email" />
                        </Box>
                      </VStack>
                    </FormControl>

                    <Stack spacing={10} pt={2}>
                      <Button
                        loadingText="Submitting"
                        size="lg"
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                          bg: 'blue.500',
                        }}
                      >
                        Sign up
                      </Button>
                    </Stack>
                    <Stack pt={6}>
                      <Text align={'center'}>
                        Already a user? <Link color={'blue.400'}>Login</Link>
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
