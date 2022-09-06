import { MAIN_URL } from '../pages/constants'

export type Props = {
  url: string
  body?: string
  token: string
  method?: string
}

export type ErrorType = { msg: string; type: string; loc: string[] }

export const fetchData = async ({ url, body, token, method }: Props) => {
  const response = await fetch(`${MAIN_URL}/${url}`, {
    method: method || 'GET',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: body,
  })

  let data = await response.json()
  let error = ''

  if (!response.ok) {
    if (typeof data.detail === 'string') {
      error = data.detail
    } else {
      error = data.detail.map((item: ErrorType) => item.msg).join('. ')
    }
  }

  return { data, error }
}
