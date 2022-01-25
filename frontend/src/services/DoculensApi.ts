// TODO: Consider restructuring the services based on role and separate off different files (p4)

import baseConfig from '~services/baseConfig'
import { ApplicationMetadata, Form } from '~services/types'

export const retrieveAllForms = (): Promise<Form[]> => {
  return baseConfig.get<Form[]>('/forms').then((response) => response.data)
}

export const retrieveFormById = (formId: string): Promise<Form> => {
  return baseConfig
    .get<Form>(`/forms/${formId}`)
    .then((response) => response.data)
}
export const retrieveApplicationsByFormId = (
  formId: string,
): Promise<ApplicationMetadata[]> => {
  return baseConfig
    .get<ApplicationMetadata[]>(`/applications/find?formId=${formId}`)
    .then((response) => response.data)
}
