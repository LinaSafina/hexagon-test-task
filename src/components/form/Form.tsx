import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { useForm } from '../../hooks/useForm'
import {
  FORM_HEADINGS,
  IDS,
  LABELS,
  MAIN_URL,
  NAMES,
  SUBMIT_BUTTON,
  URLS,
} from './constants'
import { FormProps } from './types'
import { FormActions, FormHeading, StyledForm } from './styled'

export const Form: React.FC<FormProps> = ({ mode }) => {
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
  // const dispatch = useDispatch()

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

      if (!response.ok) {
        alert(data.msg)
        return
      }

      // dispatch()
      // loginUser({
      //   token: data.accessToken,
      //   userId: data.user.id,
      // })
      if (isLogin) {
        navigate('/main')
      } else {
        navigate('/login')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <StyledForm onSubmit={submitFormHandler}>
      <FormHeading>
        {isLogin ? FORM_HEADINGS.LOGIN : FORM_HEADINGS.SIGN_UP}
      </FormHeading>
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
      <FormActions>
        <Button
          variant="contained"
          type="submit"
          disabled={!username || !password}
        >
          {isLogin ? SUBMIT_BUTTON.LOGIN : SUBMIT_BUTTON.SIGN_UP}
        </Button>
        <Button variant="text" type="button" onClick={changeModeHandler}>
          {isLogin ? FORM_HEADINGS.SIGN_UP : FORM_HEADINGS.LOGIN}
        </Button>
      </FormActions>
    </StyledForm>
  )
}
