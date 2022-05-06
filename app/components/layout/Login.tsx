import { TitleApp } from '../shared/TitleApp'
import { Card } from './Card'
import { Layout } from './Layout'

export const Login = ({ children }: { children?: JSX.Element }) => {
  return (
    <Layout classMain="login">
      <>
        <TitleApp />
        <Card >
          {children}
        </Card>
      </>
    </Layout>
  )
}
