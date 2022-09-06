import { MAIN_URL, URLS } from '../pages/constants'

export type LoginUserProps = {
  isLogin: boolean
  username: string
  password: string
}

export const loginUserHelper = async ({
  isLogin,
  username,
  password,
}: LoginUserProps) => {
  const response = await fetch(
    `${MAIN_URL}/${
      isLogin ? URLS.LOGIN : URLS.REGISTER
    }?username=${username}&password=${password}`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: isLogin
        ? 'username=' +
          encodeURIComponent(username) +
          '&password=' +
          encodeURIComponent(password)
        : '',
    }
  )
  const data = await response.json()

  return { data, error: !response.ok }
}
