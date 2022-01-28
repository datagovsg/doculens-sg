import React from 'react'
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react'

type BaseInputProps = {
  rightElement?: React.ReactNode
  leftElement?: React.ReactNode
} & InputProps

const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ leftElement, rightElement, ...inputPropsRest }, ref) => {
    return (
      <InputGroup>
        {!!leftElement && <InputLeftElement children={leftElement} />}
        <Input ref={ref} {...inputPropsRest} />
        {!!rightElement && <InputRightElement children={rightElement} />}
      </InputGroup>
    )
  },
)

export default BaseInput
