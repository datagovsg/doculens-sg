import React, { FC, useState } from 'react'

import { ApplicationMetadata, ApplicationStatus } from '~services/types'

type ViewerContextProps = {
  application: ApplicationMetadata | unknown
  setApplication: (application: ApplicationMetadata) => void
}

interface ViewerContextProviderProps {
  children: JSX.Element | React.ReactNode
}

const INITIAL_STATE = {
  application: {
    id: '',
    name: '',
    email: '',
    status: ApplicationStatus.SUBMITTED,
    createdAt: '',
  },
}

const ViewerContext = React.createContext<ViewerContextProps>(undefined!)

const ViewerContextProvider: FC<ViewerContextProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState({ application: {} })

  const setApplication = React.useCallback(
    (currApplicationState: ApplicationMetadata) => {
      setState((prevState) => ({
        ...prevState,
        application: currApplicationState,
      }))
    },
    [],
  )

  return (
    <ViewerContext.Provider value={{ ...state, setApplication }}>
      {children}
    </ViewerContext.Provider>
  )
}

const useViewerContext = () => {
  const context = React.useContext(ViewerContext)
  if (context === undefined) {
    throw new Error('context must be used within the viewerContextProvider')
  }

  return context
}

export { useViewerContext, ViewerContextProvider }
