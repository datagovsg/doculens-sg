import '@opengovsg/design-system-react/build/fonts/inter.css'

import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@opengovsg/design-system-react'

import { theme } from '~/theme'

import { AuthProvider } from '~features/auth'

import { AppRouter } from './AppRouter'

export const App = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
)
