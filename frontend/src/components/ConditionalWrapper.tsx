import React, { FC, ReactNode } from 'react'

type Wrapper = (children: React.ReactNode) => React.ReactNode

interface ConditionalWrapperProps {
  condition: boolean
  wrapper: Wrapper
  children: ReactNode
}

const ConditionalWrapper: FC<ConditionalWrapperProps> = ({
  condition,
  wrapper,
  children,
}) => <>{condition ? wrapper(children) : children}</>

export default ConditionalWrapper
