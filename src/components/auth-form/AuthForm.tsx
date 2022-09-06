import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { useAppDispatch } from '../../store/hooks'
import { useForm } from '../../hooks/useForm'
import {
  AUTH_FORM_HEADINGS,
  IDS,
  LABELS,
  NAMES,
  SUBMIT_BUTTON,
} from './constants'
import { AuthFormProps } from './types'
import { AuthFormActions, AuthFormHeading, StyledForm } from './styled'
import { loginUser } from '../../store/authSlice'
import { loginUserHelper } from '../../helpers/loginUser'
import { useState } from 'react'
import { Notification } from '../notification/Notification'

export const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [errorMsg, setErrorMsg] = useState('')
  const isLogin = mode === 'login'

  const {
    username,
    password,
    isPasswordShown,
    loginChangeHandler,
    passwordChangeHandler,
    clickShowPasswordHandler,
  } = useForm()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const changeModeHandler = () => {
    if (isLogin) {
      navigate('/signup')
    } else {
      navigate('/login')
    }
  }

  const submitFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const { data, error } = await loginUserHelper({
        username,
        password,
        isLogin,
      })

      if (error) {
        setErrorMsg(data)
      } else if (isLogin) {
        dispatch(loginUser({ token: data.access_token, username: username }))
        navigate('/main')
      } else {
        navigate('/login')
      }
    } catch (e) {
      console.log(e)
    }
  }

  const notificationCloseHandler = () => {
    setErrorMsg('')
  }

  return (
    <>
      <Notification
        isOpened={!!errorMsg}
        onNotificationClose={notificationCloseHandler}
        message={errorMsg}
        vertical="top"
        horizontal="center"
      />
      <StyledForm onSubmit={submitFormHandler}>
        <AuthFormHeading>
          {isLogin ? AUTH_FORM_HEADINGS.LOGIN : AUTH_FORM_HEADINGS.SIGN_UP}
        </AuthFormHeading>
        <TextField
          id={IDS.LOGIN}
          name={NAMES.LOGIN}
          type="text"
          value={username}
          onChange={loginChangeHandler}
          label={LABELS.LOGIN}
          variant="outlined"
          fullWidth
        />
        <TextField
          id={IDS.PASSWORD}
          name={NAMES.PASSWORD}
          type={isPasswordShown ? 'text' : 'password'}
          value={password}
          onChange={passwordChangeHandler}
          label={LABELS.PASSWORD}
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={clickShowPasswordHandler}
                  edge="end"
                >
                  {isPasswordShown ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
        <AuthFormActions>
          <Button
            variant="contained"
            type="submit"
            disabled={!username || !password}
          >
            {isLogin ? SUBMIT_BUTTON.LOGIN : SUBMIT_BUTTON.SIGN_UP}
          </Button>
          <Button variant="text" type="button" onClick={changeModeHandler}>
            {isLogin ? AUTH_FORM_HEADINGS.SIGN_UP : AUTH_FORM_HEADINGS.LOGIN}
          </Button>
        </AuthFormActions>
      </StyledForm>
    </>
  )
}
