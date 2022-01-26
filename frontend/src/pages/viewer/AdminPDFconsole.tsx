// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

import React, { useEffect, useState } from 'react'
// Import the main component
import { Viewer, Worker } from '@react-pdf-viewer/core' // install this library
// Worker
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout' // install this library

export const AdminPDFconsole = (pdfIdentifier: any) => {
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  const pdfView = () => {
    return (
      <>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          <Viewer
            fileUrl={'./api/attachment/' + pdfIdentifier.pdfIdentifier}
            plugins={[defaultLayoutPluginInstance]}
          />
        </Worker>
      </>
    )
  }

  // for onchange event

  return (
    <div className="container">
      <div className="pdf-container">
        {/* show pdf conditionally (if we have one)  */}
        {pdfIdentifier.pdfIdentifier && pdfView()}
      </div>
    </div>
  )
}

export default AdminPDFconsole
