import { FC, ReactNode, useEffect, useState } from 'react'
import ReactMarkdown, { Components } from 'react-markdown'
import { Link, OrderedList, Text, UnorderedList } from '@chakra-ui/react'
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
  const theme: Components = {
    h1: heading,
    h2: heading,
    h3: heading,
    h4: heading,
    h5: heading,
    h6: heading,
    a: (props) => <Link {...props} isExternal />,
    ol: (props) => {
      const { ordered, children, depth } = props
      const Element = ordered ? OrderedList : UnorderedList
      const styleType = {
        0: ordered ? 'decimal' : 'disc',
        1: ordered ? 'lower-roman' : 'circle',
        2: ordered ? 'lower-alpha' : 'square',
      }[depth % 3]
      return (
        <Element
          spacing={2}
          as={ordered ? 'ol' : 'ul'}
          styleType={styleType}
          pl={4}
        >
          {children}
        </Element>
      )
    },
    ul: (props) => {
      const { ordered, children, depth } = props
      const Element = ordered ? OrderedList : UnorderedList
      const styleType = {
        0: ordered ? 'decimal' : 'disc',
        1: ordered ? 'lower-roman' : 'circle',
        2: ordered ? 'lower-alpha' : 'square',
      }[depth % 3]
      return (
        <Element
          spacing={2}
          as={ordered ? 'ol' : 'ul'}
          styleType={styleType}
          pl={4}
        >
          {children}
        </Element>
      )
    },
  }

  useEffect(() => {
    fetch(md)
      .then((res) => res.text())
      .then((text) => setMarkdown(text))
  }, [])

  return (
    <Card heading="Instructions">
      <ReactMarkdown
        components={ChakraUIRenderer(theme)}
        children={markdown}
        skipHtml
      />
    </Card>
  )
}
