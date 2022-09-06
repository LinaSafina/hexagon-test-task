import { AuthForm } from '../components/auth-form/AuthForm'
import { Wrapper } from '../components/wrapper/Wrapper'

export const SignUp: React.FC = () => {
  return (
    <Wrapper>
      <AuthForm mode="sign-up" />
    </Wrapper>
  )
}
