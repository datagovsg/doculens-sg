import { FC, useEffect, useState } from 'react'
import { BiCog, BiShow } from 'react-icons/all'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Button,
  HStack,
  IconButton,
  Link,
  Tooltip,
  useMultiStyleConfig,
} from '@chakra-ui/react'

import { retrieveFormById } from '~services/DoculensApi'
import { NavbarBack } from '~components/Navbar/NavbarBack'
import { NavbarContainer } from '~components/Navbar/NavbarContainer'
import { NavbarTabs } from '~components/Navbar/NavbarTabs'

import { DashboardSection } from '~pages/responses/types'

// Transforms all the dashboard sections into an array
const ROUTES = Object.values(DashboardSection)

const NestedNavbar: FC = () => {
  const navigate = useNavigate()
  const params = useParams<{ id: string; action: DashboardSection }>()
  const navStyles = useMultiStyleConfig('NavbarComponents', {})

  const [formName, setFormName] = useState<string>('...')

  // TODO: Switch to context if the use case grows. This is very hacky
  useEffect(() => {
    retrieveFormName(params.id)
  }, [params.id])

  if (!params || !params.id || !params.action) {
    console.error('invalid route matching detected. Replace with redirect ')
    throw Error('Bad params error')
  }

  // TODO: Use a context hook once there is sufficient use case for it
  const retrieveFormName = async (id: string | undefined) => {
    if (!id) {
      setFormName('...')
    } else {
      setFormName((await retrieveFormById(id as string)).title)
    }
  }

  const index = ROUTES.indexOf(params.action) || 0

  // Handlers

  const handleReturnToDashboard = () => {
    navigate({ pathname: `/dashboard` })
  }

  const handleTabChange = (index: number) => {
    const id = params.id
    if (id) {
      navigate({ pathname: `/dashboard/${id}/${ROUTES[index]}` })
    }
  }

  const handleOnSettings = () => {
    console.log('TODO: Handle settings action')
  }

  const handlePublish = () => {
    // TODO: Deal with the publishing mechanism
    console.log('TODO: Handle publish action')
  }

  return (
    <>
      <NavbarContainer
        leftElement={
          <NavbarBack label={formName} handleClick={handleReturnToDashboard} />
        }
        centerElement={
          <NavbarTabs
            tabTitles={ROUTES}
            defaultIndex={0}
            align={'center'}
            index={index}
            onChange={handleTabChange}
          />
        }
        rightElement={
          <HStack>
            <HStack spacing={0} pr={2}>
              <IconButton
                onClick={handleOnSettings}
                aria-label="Embed or Share"
                variant="ghost"
                color="primary.500"
                icon={<BiCog size="16px" />}
              />
              <Link href={`/form/${params.id}/preview`} isExternal>
                <Tooltip label="Preview">
                  <IconButton
                    aria-label="Preview"
                    variant="ghost"
                    sx={navStyles.button}
                    color="primary.500"
                    icon={<BiShow size="16px" />}
                  />
                </Tooltip>
              </Link>
            </HStack>
            <Button
              variant="solid"
              sx={navStyles.button}
              colorScheme="primary"
              onClick={handlePublish}
            >
              Publish changes
            </Button>
          </HStack>
        }
      />
    </>
  )
}

export default NestedNavbar
