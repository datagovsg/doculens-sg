// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

import React, { useState } from 'react'
// Import the main component
import { Viewer, Worker } from '@react-pdf-viewer/core' // install this library
// Worker
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout' // install this library

export const AdminPDFconsole = (pdfIdentifier: any) => {
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  // for onchange event
  const [pdfFile, setPdfFile] = useState(pdfIdentifier)
  const [pdfFileError, setPdfFileError] = useState('')

  // for submit event
  const [viewPdf, setViewPdf] = useState(null)

  // onchange event
  const fileType = ['application/pdf']

  // // form submit
  // const handlePdfFileSubmit = (e: any) => {
  //   e.preventDefault()
  //   if (pdfFile !== null) {
  //     setViewPdf(pdfFile)
  //   } else {
  //     setViewPdf(null)
  //   }
  // }

  return (
    <div className="container">
      {/*<form className="form-group" onSubmit={handlePdfFileSubmit}>*/}
      {/*  <input*/}
      {/*    type="file"*/}
      {/*    className="form-control"*/}
      {/*    required*/}
      {/*    onChange={handlePdfFileChange}*/}
      {/*  />*/}
      {/*  {pdfFileError && <div className="error-msg">{pdfFileError}</div>}*/}
      {/*  <br></br>*/}
      {/*  <button type="submit" className="btn btn-success btn-lg">*/}
      {/*    UPLOAD*/}
      {/*  </button>*/}
      {/*</form>*/}
      {/*<br></br>*/}

      <div className="pdf-container">
        {/* show pdf conditionally (if we have one)  */}
        {pdfFile && (
          <>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
              <Viewer
                fileUrl={'./sample.pdf'}
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminPDFconsole
