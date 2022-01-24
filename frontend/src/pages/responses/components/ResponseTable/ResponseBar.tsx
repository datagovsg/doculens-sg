import { FC } from 'react'
import { Skeleton, Stack, Text } from '@chakra-ui/react'
import { Menu, Searchbar } from '@opengovsg/design-system-react'

export const ResponseBar: FC = () => {
  // TODO: Move to component props
  const isLoading = true
  const totalResponses = 100

  const handleSearch = () => console.log('Search triggered')
  return (
    <>
      <Stack
        justify="space-between"
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'flex-start', md: 'center' }}
        spacing="1rem"
      >
        <Text as="h3" textStyle="h3" display="flex" color="secondary.500">
          <Skeleton isLoaded={!isLoading}>{totalResponses} </Skeleton> responses
          to date
        </Text>
        <Searchbar onSearch={handleSearch} isExpanded={true} />

        <Stack
          w={{ base: '100%', md: 'auto' }}
          spacing="1rem"
          direction={{ base: 'column', md: 'row' }}
          h="fit-content"
        >
          <Menu variant="primary">
            {({ isOpen }) => (
              <>
                <Menu.Button isOpen={isOpen}>EXPORT</Menu.Button>
                <Menu.List>
                  <Menu.Item
                    onClick={() => {
                      alert('Successfully downloaded')
                    }}
                  >
                    CSV only
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      alert('Successfully downloaded')
                    }}
                  >
                    CSV and Attachments
                  </Menu.Item>
                </Menu.List>
              </>
            )}
          </Menu>
        </Stack>
      </Stack>
    </>
  )
}
