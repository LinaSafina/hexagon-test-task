import { useState } from 'react'

export const useForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const loginChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value)
  }

  const clickShowPasswordHandler = () => {
    setIsPasswordShown((prevState) => !prevState)
  }

  return {
    username,
    password,
    isPasswordShown,
    loginChangeHandler,
    passwordChangeHandler,
    clickShowPasswordHandler,
  }
}
