import { FC, ReactNode, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link, Text } from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'

import md from '../instructions.md'

import { Card } from './Card'

export const Instructions: FC = () => {
  const [markdown, setMarkdown] = useState('')

  const heading = (props: { children: ReactNode }) => {
    const { children } = props
    return (
      <Text textStyle="subhead1" mt={4}>
        {children}
      </Text>
    )
  }
  const link: FC = (props) => {
    return <Link {...props} isExternal />
  }
  const theme = {
    h1: heading,
    h2: heading,
    h3: heading,
    h4: heading,
    h5: heading,
    h6: heading,
    a: link,
  }

  useEffect(() => {
    fetch(md)
      .then((res) => res.text())
      .then((text) => setMarkdown(text))
  }, [])

  return (
    <Card>
      <Text as="h2" textStyle="heading2" color="primary.600" mb={4}>
        Instructions
      </Text>
      <ReactMarkdown
        components={ChakraUIRenderer(theme)}
        children={markdown}
        skipHtml
      />
    </Card>
  )
}
