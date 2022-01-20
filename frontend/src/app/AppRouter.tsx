import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import {
  BUILDER_ROUTE,
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  PUBLIC_ROUTE,
  VIEWER_ROUTE,
} from '~constants/routes'

import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

const DashboardPage = lazy(() => import('~pages/dashboard/DashboardPage'))
const PublicPage = lazy(() => import('~pages/public/PublicPage'))
const ViewerPage = lazy(() => import('~pages/viewer/ViewerPage'))
const BuilderPage = lazy(() => import('~pages/builder/BuilderPage'))

const LoginPage = lazy(() => import('~features/auth/LoginPage'))

// TODO: Add and implement dashboard route (p0)
// TODO: Add and implement viewer route (p0)
// TODO: Add and implement builder route (p2)

export const AppRouter = (): JSX.Element => {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <Routes>
        <Route
          path={LOGIN_ROUTE}
          element={<PublicRoute strict element={<LoginPage />} />}
        />

        <Route
          path={PUBLIC_ROUTE}
          element={<PublicRoute element={<PublicPage />} />}
        />

        <Route
          path={DASHBOARD_ROUTE}
          element={<PrivateRoute element={<DashboardPage />} />}
        />

        <Route
          path={VIEWER_ROUTE}
          element={<PrivateRoute element={<ViewerPage />} />}
        />

        <Route
          path={BUILDER_ROUTE}
          element={<PrivateRoute element={<BuilderPage />} />}
        />

        <Route
          path={LOGIN_ROUTE}
          element={<PublicRoute strict element={<LoginPage />} />}
        />

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Suspense>
  )
}
