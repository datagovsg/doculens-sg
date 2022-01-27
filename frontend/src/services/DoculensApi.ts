// TODO: Consider restructuring the services based on role and separate off different files (p4)

import baseConfig from '~services/baseConfig'
import {
  ApplicationMetadata,
  Form,
  MarkSubmissionRequestDto,
  MarkSubmissionResponse,
} from '~services/types'

export const retrieveAllForms = (): Promise<Form[]> => {
  return baseConfig.get<Form[]>('/forms').then((response) => response.data)
}

export const retrieveFormById = (formId: string): Promise<Form> => {
  return baseConfig
    .get<Form>(`/forms/${formId}`)
    .then((response) => response.data)
}

// ADMIN Retrieveal of forms
export const retrieveApplicationsByFormId = (
  formId: string,
): Promise<ApplicationMetadata[]> => {
  return baseConfig
    .get<ApplicationMetadata[]>(`/applications/find?formId=${formId}`)
    .then((response) => response.data)
}

export const retrieveApplicationById = (
  id: string,
): Promise<ApplicationMetadata> => {
  return baseConfig
    .get<ApplicationMetadata>(`/applications/${id}`)
    .then((response) => response.data)
}

export const updateApplicationStatus = (
  id: string,
  submissionOptions: MarkSubmissionRequestDto,
): Promise<MarkSubmissionResponse> => {
  return baseConfig
    .post(`/applications/${id}/markStatus`, submissionOptions)
    .then((response) => response.data)
}
