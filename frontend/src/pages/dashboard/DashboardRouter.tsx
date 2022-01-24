import React from 'react'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'

import CreateNewModal from '~pages/dashboard/components/CreationModal/CreateNewModal'
import { DashboardPage } from '~pages/dashboard/DashboardPage'

// Defines the routes within the dashboard subroute
const DashboardRouter = (): JSX.Element => {
  const navigate = useNavigate()
  return (
    <>
      <Routes>
        <Route
          path={`create/*`}
          element={<CreateNewModal onClose={() => navigate(-1)} />}
        />
      </Routes>
      <DashboardPage />
    </>
  )
}

export default DashboardRouter
