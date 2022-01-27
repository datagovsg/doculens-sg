import { FC, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { AiFillFileAdd } from 'react-icons/ai'
import {
  Center,
  FormHelperText,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'

type DropzoneProps = {
  numFiles?: number
  onFileAccepted: any
}

export const Dropzone: FC<DropzoneProps> = ({ onFileAccepted, numFiles }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onFileAccepted(acceptedFiles)
    },
    [onFileAccepted],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ['.pdf', '.png', '.jpg'],
    maxFiles: numFiles,
    maxSize: 20971520,
  })

  const dropText = isDragActive
    ? 'Drop the files here ...'
    : 'Drag & drop .pdf, .png, .jpg files here'

  const activeBg = useColorModeValue('gray.100', 'gray.600')
  const borderColor = useColorModeValue(
    isDragActive ? 'teal.300' : 'gray.300',
    isDragActive ? 'teal.500' : 'gray.500',
  )

  return (
    <>
      <Center
        p={10}
        mt={3}
        cursor="pointer"
        bg={isDragActive ? activeBg : 'transparent'}
        _hover={{ bg: activeBg }}
        transition="background-color 0.2s ease"
        borderRadius={4}
        border="3px dashed"
        borderColor={borderColor}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Icon as={AiFillFileAdd} mr={2} />
        <p>{dropText}</p>
      </Center>
      <FormHelperText mt={2}>
        {numFiles && (
          <b>
            Please attach {numFiles} file{numFiles > 1 && 's'}.{' '}
          </b>
        )}
        Maximum file size: 20 MB
      </FormHelperText>
    </>
  )
}
