// TODO: Consider using react-query instead if hooks get more complicated

import { useEffect, useState } from 'react'

interface useFetchProps {
  serviceFunction: any
}

function useFetch<T>({ serviceFunction }: useFetchProps): [Array<T>, boolean] {
  const [data, setData] = useState<Array<T>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResource()
  }, [])

  async function fetchResource(): Promise<void> {
    const response = await serviceFunction()
    setData(response as Array<T>)
    setLoading(false)
  }

  return [data, loading]
}

export default useFetch
