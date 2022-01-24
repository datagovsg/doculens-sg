import React, { FC, useRef } from 'react'
import {
  BiCog,
  BiDotsHorizontalRounded,
  BiDuplicate,
  BiTrash,
} from 'react-icons/bi'
import { Link } from 'react-router-dom'
import {
  Box,
  CSSObject,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  useMultiStyleConfig,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react'

// Components used only by the card component

interface ActionMenuProps {
  actions: Array<{
    label: string
    onClick: (e: React.MouseEvent) => void
    icon?: JSX.Element
    style?: CSSObject
  }>
}

const ActionMenu: FC<ActionMenuProps> = ({ actions }) => {
  const ref = useRef(null)
  const { isOpen, onClose, onToggle } = useDisclosure()
  useOutsideClick({
    ref,
    handler: () => onClose(),
  })

  return (
    <div ref={ref}>
      <Menu isOpen={isOpen}>
        <MenuButton
          as={IconButton}
          icon={<BiDotsHorizontalRounded />}
          onClick={(e) => {
            e.preventDefault()
            onToggle()
          }}
          variant="ghost"
          border="none"
        >
          Click
        </MenuButton>
        <MenuList>
          {actions.map(({ onClick, label, icon, style }, i) => (
            <MenuItem
              key={i}
              icon={icon}
              sx={style}
              onClick={(e) => {
                e.preventDefault()
                onClose()
                onClick(e)
              }}
            >
              {label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  )
}

type StatusIndicatorProps = {
  status: 'active' | 'inactive' | 'draft'
}

const StatusIndicator: FC<StatusIndicatorProps> = ({ status }) => {
  const styles = useMultiStyleConfig('Card', {})
  let color
  switch (status) {
    case 'active':
      color = 'success.500'
      break
    case 'inactive':
      color = 'red.500'
      break
    default:
      color = 'warning.500'
  }

  return (
    <Flex sx={styles.indicator} direction="row">
      <Box h="8px" w="8px" borderRadius="4px" bg={color} mr="8px" />
      {status}
    </Flex>
  )
}

const Card: FC = () => {
  // TODO: Retrieve all forms properly, remove mocks
  const id = 1
  const title = 'This is a sample title'
  const date = '16 Feb 2021'

  const styles = useMultiStyleConfig('Card', {})

  const formActions = [
    { label: 'Duplicate', icon: <BiDuplicate />, onClick: () => null },
    { label: 'Settings', icon: <BiCog />, onClick: () => null },
    {
      label: 'Delete',
      icon: <BiTrash />,
      onClick: () => null,
      style: { color: 'error.500' },
    },
  ]

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
          <Flex direction="row" sx={styles.actions}>
            <StatusIndicator status={'active'} />
            <ActionMenu actions={formActions} />
          </Flex>
        </VStack>
      </Link>
    </>
  )
}

export default Card
