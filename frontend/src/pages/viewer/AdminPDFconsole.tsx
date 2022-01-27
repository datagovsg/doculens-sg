// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

import React from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core' // install this library
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import jsPDF from 'jspdf'

export const AdminPDFconsole = (props: any) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  const attachedFile: any = props.attachedFile
  const attachedFileRaw = Buffer.from(attachedFile).toString()
  const blob = new Blob([attachedFile])
  const fileLink = URL.createObjectURL(blob)

  const viewer = () => {
    if (attachedFile && attachedFileRaw.slice(0, 5).toString() === '%PDF-') {
      return pdfViewer(fileLink)
    } else if (
      attachedFile &&
      attachedFileRaw.slice(0, 5).toString() !== '%PDF-'
    ) {
      // change jpg to pdf
      // convertToPDF()
      const doc = new jsPDF()
      doc.setFontSize(40)
      doc.addImage(fileLink, 'PNG', 15, 40, 180, 160)
      const pdfURL = doc.output('bloburl')
      return pdfViewer(pdfURL)
    } else {
      console.log('NO ATTACHED FILE')
    }
  }
  const pdfViewer = (url) => {
    return (
      <>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      </>
    )
  }

  return (
    <div className="container">
      <div className="pdf-container">{viewer()}</div>
    </div>
  )
}

export default AdminPDFconsole
