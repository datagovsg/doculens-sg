import axios from 'axios'

import { DOCULENS_API_URL } from '~constants/config'

const DoculensService = axios.create({
  baseURL: DOCULENS_API_URL,
})

export default DoculensService
