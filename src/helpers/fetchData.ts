import { MAIN_URL } from '../pages/constants'

export type Props = {
  url: string
  body?: string
  headers?: { [key: string]: string }
  method?: string
}

export const fetchData = async ({ url, body, headers, method }: Props) => {
  const response = await fetch(`${MAIN_URL}/${url}`, {
    method: method || 'GET',
    headers: {
      ...headers,
    },
    body: body,
  })

  const data = await response.json()

  return { data, error: !response.ok }
}
