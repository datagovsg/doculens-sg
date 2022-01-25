// TODO: Consider restructuring the services based on role and separate off different files (p4)

import baseConfig from '~services/baseConfig'
import { Form } from '~services/types'

export const retrieveAllForms = (): Promise<Form[]> => {
  return baseConfig.get<Form[]>('/forms').then((response) => response.data)
}
