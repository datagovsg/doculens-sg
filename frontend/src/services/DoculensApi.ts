// TODO: Consider restructuring the services based on role and separate off different files (p4)

import baseConfig from '~services/baseConfig'

export const retrieveAllForms = (): Promise<Form[]> => {
  return baseConfig.get<Form[]>('/forms').then((response) => response.data)
}
