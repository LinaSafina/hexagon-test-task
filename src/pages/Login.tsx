import { AuthForm } from '../components/auth-form/AuthForm'
import { Wrapper } from '../components/wrapper/Wrapper'

export const Login: React.FC = () => {
  return (
    <Wrapper>
      <AuthForm mode="login" />
    </Wrapper>
  )
}
