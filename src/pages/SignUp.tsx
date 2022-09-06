import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthForm } from '../components/auth-form/AuthForm'
import { Wrapper } from '../components/wrapper/Wrapper'
import { selectIsLoggedIn } from '../store/authSlice'
import { useAppSelector } from '../store/hooks'

export const SignUp: React.FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/main')
    }
  }, [isLoggedIn])

  return (
    <Wrapper>
      <AuthForm mode="sign-up" />
    </Wrapper>
  )
}
